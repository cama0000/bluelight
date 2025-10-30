// 'use client'

// import { useAuth } from "@/context/AuthContext";
// import ProtectedRoutes from "../components/ProtectedRoutes";
// import { useRouter } from "next/navigation";
// import { Badge, Button, Card, Typography } from "@mui/material";
// import { getAllQuestions, saveQuestion } from "@/services/question";
// import { Question, Category, Difficulty, QuestionType, QuestionRequest } from "@/types/question";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// const questions = () => {
//     const {user} = useAuth();
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [questions, setQuestions] = useState<Question[]>([]);

//     useEffect(() => {
//         if(user?.token){
//             fetchQuestions();
//         }
//     }, [user?.firebaseUid])

//     async function handleMakeQuestion(){
//         if(!user?.token){
//             console.error("User not authenticated.");
//             return;
//         }
        
//         try{
//             const questionBody: QuestionRequest = {
//                     title: "TEST QUESTION",
//                     prompt: "TEST PROMPT THIS IS A TEST PROMPT 123",
//                     category: Category.DATA_STRUCTURES,
//                     difficulty: Difficulty.EASY,
//                     type: QuestionType.MULTIPLE_CHOICE,
//                     answerChoices: ["wrong1", "wrong2", "correct", "wrong3"],
//                     answerIndex: 2
//             }

//             await saveQuestion(questionBody, user?.token);
//         }
//         catch(error){
//             console.log("Error making questions: " + error);
//         }
//     }

//     async function fetchQuestions(){
//         if(!user?.token){
//             console.error("User not authenticated.");
//             return;
//         }
        
//         try{
//             setLoading(true);
//             const data: Question[] = await getAllQuestions(user.token);

//             console.log(JSON.stringify(data, null, 2));

//             setQuestions(data);


//         }
//         catch(error){
//             console.log("Error fetching questions: " + error);
//         }
//         finally{
//             setLoading(false);
//         }
//     }

//     if(loading){
//         return <div>FETCHING QUESTIONS</div>
//     }

//     if(questions.length == 0){
//         return <div>NO QUESTIONS</div>
//     }

//     return (
//         // <div>
//         //     <Typography>
//         //         Questions
//         //     </Typography>

//         //     <Button onClick={handleMakeQuestion}>
//         //         Make question
//         //     </Button>

//         //     {questions.map((question) => (
//         //         <Link 
//         //             key={question.id}
//         //             href={`/questions/${encodeURIComponent(question.id)}/${encodeURIComponent(question.title)}`}
//         //             >
//         //                 {question.title}
//         //             </Link>

//         //     ))}

            
//         // </div>

//     //     <main className="min-h-screen bg-background">
//     //   <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
//     //     <div className="mb-12">
//     //       <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Questions</h1>
//     //       <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
//     //         Search, filter, solve, success.
//     //       </p>
//     //     </div>

//     //     <div className="space-y-4">
//     //       {questions.map((question) => (
//     //         <Card key={question.id} className="p-6 transition-all hover:shadow-md">
//     //             <Link 
//     //                 key={question.id}
//     //                 href={`/questions/${encodeURIComponent(question.id)}/${encodeURIComponent(question.title)}`}
//     //             >
//     //           <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//     //             <div className="flex-1 space-y-3">
//     //               <div className="flex items-start gap-3">
//     //                 <div className="flex-1">
//     //                   <h2 className="text-xl font-semibold text-foreground leading-relaxed text-balance ">
//     //                     {question.title}
//     //                   </h2>
//     //                 </div>
//     //               </div>

//     //               <div className="flex flex-wrap items-center gap-2 pl-[88px]">
//     //                 {question.category}
//     //               </div>
//     //             </div>

//     //             <div className="flex items-center gap-4 text-sm text-muted-foreground sm:flex-col sm:items-end sm:gap-1">
//     //               {/* <span className="whitespace-nowrap">{question.views.toLocaleString()} views</span> */}
//     //               <Badge className="text-xs">
//     //                 {question.difficulty}
//     //               </Badge>
//     //             </div>
//     //           </div>
//     //           </Link>
//     //         </Card>
//     //       ))}
//     //     </div>
//     //   </div>
//     // </main>



//     //  <main className="min-h-screen bg-background">
//     //   <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
//     //     {/* Header */}
//     //     <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//     //       <div>
//     //         <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
//     //           Problemset
//     //         </h1>
//     //         <p className="mt-2 text-muted-foreground text-lg">
//     //           Sharpen your skills — one problem at a time.
//     //         </p>
//     //       </div>
//     //       <div className="relative w-full sm:w-64">
//     //         <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//     //         <Input
//     //           placeholder="Search problems..."
//     //           value={search}
//     //           onChange={(e) => setSearch(e.target.value)}
//     //           className="pl-10"
//     //         />
//     //       </div>
//     //     </div>

//     //     {/* Table Header */}
//     //     <Card className="overflow-hidden border border-border/60 rounded-2xl shadow-sm">
//     //       <div className="grid grid-cols-3 sm:grid-cols-4 bg-muted/40 text-sm font-semibold text-muted-foreground px-6 py-3 border-b">
//     //         <button
//     //           onClick={() => toggleSort("title")}
//     //           className="flex items-center gap-1 hover:text-foreground transition"
//     //         >
//     //           Title
//     //           {sortBy === "title" &&
//     //             (sortOrder === "asc" ? (
//     //               <ChevronUp className="h-4 w-4" />
//     //             ) : (
//     //               <ChevronDown className="h-4 w-4" />
//     //             ))}
//     //         </button>
//     //         <span className="hidden sm:block">Category</span>
//     //         <button
//     //           onClick={() => toggleSort("difficulty")}
//     //           className="flex items-center gap-1 hover:text-foreground transition"
//     //         >
//     //           Difficulty
//     //           {sortBy === "difficulty" &&
//     //             (sortOrder === "asc" ? (
//     //               <ChevronUp className="h-4 w-4" />
//     //             ) : (
//     //               <ChevronDown className="h-4 w-4" />
//     //             ))}
//     //         </button>
//     //         <span className="hidden sm:block text-right">Action</span>
//     //       </div>

//     //       {/* Question Rows */}
//     //       <div className="divide-y divide-border">
//     //         {filteredQuestions.length > 0 ? (
//     //           filteredQuestions.map((question) => (
//     //             <Link
//     //               key={question.id}
//     //               href={`/questions/${question.id}/${encodeURIComponent(
//     //                 question.title
//     //               )}`}
//     //               className="grid grid-cols-3 sm:grid-cols-4 items-center px-6 py-4 hover:bg-muted/30 transition"
//     //             >
//     //               <span className="font-medium text-foreground truncate">
//     //                 {question.title}
//     //               </span>
//     //               <span className="hidden sm:block text-muted-foreground">
//     //                 {question.category}
//     //               </span>
//     //               <Badge
//     //                 variant={
//     //                   question.difficulty === "Easy"
//     //                     ? "outline"
//     //                     : question.difficulty === "Medium"
//     //                     ? "default"
//     //                     : "destructive"
//     //                 }
//     //                 className="w-fit"
//     //               >
//     //                 {question.difficulty}
//     //               </Badge>
//     //               <div className="hidden sm:flex justify-end">
//     //                 <Button size="sm" variant="secondary">
//     //                   Solve
//     //                 </Button>
//     //               </div>
//     //             </Link>
//     //           ))
//     //         ) : (
//     //           <div className="py-12 text-center text-muted-foreground">
//     //             No questions found.
//     //           </div>
//     //         )}
//     //       </div>
//     //     </Card>
//     //   </div>
//     // </main>

//     <main className="min-h-screen bg-background">
//       <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-10">
//           <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
//             Problemset
//           </h1>
//           <p className="mt-2 text-lg text-muted-foreground">
//             Practice questions to sharpen your coding skills.
//           </p>
//         </div>

//         {/* Questions Table */}
//         <Card className="overflow-hidden border border-border/60 rounded-2xl shadow-sm">
//           {/* Table Header */}
//           <div className="grid grid-cols-3 sm:grid-cols-4 bg-muted/40 text-sm font-semibold text-muted-foreground px-6 py-3 border-b">
//             <span>Title</span>
//             <span className="hidden sm:block">Category</span>
//             <span>Difficulty</span>
//             <span className="hidden sm:block text-right">Action</span>
//           </div>

//           {/* Table Body */}
//           <div className="divide-y divide-border">
//             {questions.length > 0 ? (
//               questions.map((question) => (
//                 <Link
//                   key={question.id}
//                   href={`/questions/${question.id}/${encodeURIComponent(
//                     question.title
//                   )}`}
//                   className="grid grid-cols-3 sm:grid-cols-4 items-center px-6 py-4 hover:bg-muted/30 transition"
//                 >
//                   <span className="font-medium text-foreground truncate">
//                     {question.title}
//                   </span>

//                   <span className="hidden sm:block text-muted-foreground">
//                     {question.category}
//                   </span>

//                   <Badge
//                     // variant={
//                     //   question.difficulty === "Easy"
//                     //     ? "outline"
//                     //     : question.difficulty === "Medium"
//                     //     ? "default"
//                     //     : "destructive"
//                     // }
//                     className="w-fit"
//                   >
//                     {question.difficulty}
//                   </Badge>

//                   <div className="hidden sm:flex justify-end">
//                     <Button>
//                       Solve
//                     </Button>
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <div className="py-12 text-center text-muted-foreground">
//                 No questions available.
//               </div>
//             )}
//           </div>
//         </Card>
//       </div>
//     </main>
//     );
// }

// export default ProtectedRoutes(questions);




"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Question {
  id: number;
  title: string;
  category: string;
  difficulty: string;
}

interface QuestionsPageProps {
  questions: Question[];
}

export default function QuestionsPage({ questions }: QuestionsPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            Coding Challenges
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Practice algorithmic problems, improve your skills, climb the leaderboard.
          </p>
        </motion.div>

        {/* Questions List */}
        <div className="grid gap-4">
          {questions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                href={`/questions/${encodeURIComponent(question.id)}/${encodeURIComponent(
                  question.title
                )}`}
              >
                <Card className="p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.01] group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {question.title}
                      </h2>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {question.category}
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0">
                      <Badge
                        className={`text-xs ${
                          question.difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : question.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
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
        </div>
      </div>
    </main>
  );
}
