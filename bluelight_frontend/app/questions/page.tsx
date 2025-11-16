"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, CategoryLabels, Difficulty, Question, QuestionRequest, QuestionType } from "@/types/question";
import { getAllQuestions, saveQuestion } from "@/services/question";
import { MoonLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionCard from "../components/QuestionCard";
import ProtectedRoutes from "../components/ProtectedRoutes";

const QuestionsPage = () => {
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

    // async function handleMakeQuestion(){
    //     if(!user?.token){
    //         console.error("User not authenticated.");
    //         return;
    //     }
        
    //     try{
    //         const questionBody: QuestionRequest = {
    //                 title: "Too Lazy to Load",
    //                 prompt: "What is the main benefit of lazy loading in web applications?",
    //                 category: Category.WEB_DEVELOPMENT,
    //                 difficulty: Difficulty.MEDIUM,
    //                 type: QuestionType.MULTIPLE_CHOICE,
    //                 answerChoices: [
    //                   "Improving SEO ranking",
    //                   "Loading content only when needed to reduce initial load time",
    //                   "Increasing server request rate",
    //                   "Preloading all images for smoother scrolling"
    //                 ],
    //                 answerIndex: 1
                    
                    
    //         }

    //         await saveQuestion(questionBody, user?.token);
    //     }
    //     catch(error){
    //         console.log("Error making questions: " + error);
    //     }
    // }

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


  {/* <Button
  onClick={handleMakeQuestion}>
    make question
  </Button> */}
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
        {CategoryLabels[cat]}
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
              <QuestionCard key={question.id} question={question}/>
            ))}

          </motion.div>
        )}

        </Card>

  </div>
</main>

  );
}

export default ProtectedRoutes(QuestionsPage);