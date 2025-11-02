"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, Difficulty, Question, QuestionRequest, QuestionType } from "@/types/question";
import { getAllQuestions, saveQuestion } from "@/services/question";
import { MoonLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuestionsPage() {
    const {user} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [hasAnimated, setHasAnimated] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


    useEffect(() => {
        if(user?.token){
            fetchQuestions();
        }

    }, [user?.firebaseUid])

    async function handleMakeQuestion(){
        if(!user?.token){
            console.error("User not authenticated.");
            return;
        }
        
        try{
            const questionBody: QuestionRequest = {
                    title: "Too Lazy to Load",
                    prompt: "What is the main benefit of lazy loading in web applications?",
                    category: Category.WEB_DEVELOPMENT,
                    difficulty: Difficulty.MEDIUM,
                    type: QuestionType.MULTIPLE_CHOICE,
                    answerChoices: [
                      "Improving SEO ranking",
                      "Loading content only when needed to reduce initial load time",
                      "Increasing server request rate",
                      "Preloading all images for smoother scrolling"
                    ],
                    answerIndex: 1
                    
                    
            }

            await saveQuestion(questionBody, user?.token);
        }
        catch(error){
            console.log("Error making questions: " + error);
        }
    }

    async function fetchQuestions(){
        if(!user?.token){
            console.error("User not authenticated.");
            return;
        }
        
        try{
            const data: Question[] = await getAllQuestions(user.token);

            setQuestions(data);
        }
        catch(error){
            console.log("Error fetching questions: " + error);
        }
        finally{
            setLoading(false);
        }
    }

    const filteredQuestions = questions.filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory ? q.category === selectedCategory.toUpperCase() : true;

      return matchesSearch && matchesCategory;
    });
    

    if(loading){
      return(
        <div className="flex items-center justify-center min-h-screen bg-black">
          <MoonLoader color="#00f7ff" size={60} />
        </div>
      )
    }

  return (
<main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">


  <Button
  onClick={handleMakeQuestion}>
    make question
  </Button>
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-14 text-center"
    >
      <h1 className="text-5xl font-bold text-blue-300">Questions</h1>
      <p className="mt-2 text-zinc-400 text-sm">
        Start solving.
      </p>
    </motion.div>


  <div className="relative flex-shrink-0 w-full sm:w-1/3 md:w-1/2">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
    <Input
      type="text"
      placeholder="Search questions..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 bg-zinc-900/70 border border-zinc-800 text-zinc-200 
                placeholder-zinc-500 rounded-lg focus:border-blue-500 focus:ring-0"
    />
  </div>

<div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto py-3 px-1">
    {Object.values(Category).map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)
                      
        }
        className={`flex-shrink-0 text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200
          ${
            selectedCategory === cat
              ? "bg-blue-600/20 text-blue-400 border-blue-700/40"
              : "bg-zinc-900/70 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
          }`}
      >
        {cat}
      </button>
    ))}
  </div>


    
        <Card className="bg-zinc-900/80 border border-zinc-800 shadow-2xl rounded-2xl p-3">
            {filteredQuestions.length === 0 ? (
              <div className="text-center text-zinc-500 py-12 text-sm">
                No results found.
              </div>
            ) : (
              <motion.div
                initial={hasAnimated ? false : "hidden"}
                key={searchQuery}
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="grid gap-3"
                onAnimationComplete={() => setHasAnimated(true)}
              >
            {filteredQuestions.map((question) => (
              <motion.div
                key={question.id}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={`/questions/${encodeURIComponent(
                    question.id
                  )}/${encodeURIComponent(question.title)}`}
                >
                  <Card
                    className="p-4 bg-zinc-900/70 border border-zinc-800 hover:border-blue-500/40 
                    backdrop-blur-sm rounded-xl cursor-pointer transition-all hover:scale-[1.01] 
                    hover:shadow-[0_0_25px_-10px_rgba(59,130,246,0.5)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-base font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                          {question.title}
                        </h2>
                        <div className="text-xs text-zinc-400 mt-0.5">
                          {QuestionType[
                            question.type as unknown as keyof typeof QuestionType
                          ] ?? question.type}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                      <Badge
    className={`text-[10px] px-2 py-0.5 rounded-full ${
      question.category === "LANGUAGES"
        ? "bg-purple-600/20 text-purple-400 border border-purple-700/40"
        : question.category === "DATABASES"
        ? "bg-blue-600/20 text-blue-400 border border-blue-700/40"
        : question.category === "WEB_DEVELOPMENT"
        ? "bg-green-600/20 text-green-400 border border-green-700/40"
        : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text border border-blue-700/40"
    }`}
  >
    {Category[
      question.category as unknown as keyof typeof Category
    ] ?? question.category}
  </Badge>

  <Badge
    className={`text-[10px] px-2 py-0.5 rounded-full ${
      question.difficulty === "EASY"
        ? "bg-green-600/20 text-green-400 border border-green-700/40"
        : question.difficulty === "MEDIUM"
        ? "bg-yellow-600/20 text-yellow-400 border border-yellow-700/40"
        : question.difficulty === "HARD"
        ? "bg-red-600/20 text-red-400 border border-red-700/40"
        : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text border border-blue-700/40"
    }`}
  >
    {question.difficulty}
  </Badge>
</div>

                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

)}

        </Card>

  </div>
</main>

  );
}
