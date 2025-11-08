'use client'

import ProtectedRoutes from "@/app/components/ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import { getQuestionById } from "@/services/question";
import type { AnswerRequest, Question } from "@/types/question";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MoonLoader } from "react-spinners";
import { Badge } from "@/components/ui/badge";
import { answerQuestion } from "@/services/user";
import { CheckCircle } from "lucide-react";

const Question = () => {
    const {user} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const [response, setResponse] = useState<string>("");
    const params = useParams<{id: string, title: string}>();

    useEffect(() => {
        if(user?.token){
            fetchQuestion(params);
        }
    }, [user?.firebaseUid, params?.id]);

    async function fetchQuestion(params: {id: string, title: string}){
        if(!user?.token){
            console.error("User not authenticated.");
            return;
        }

        try{
            setLoading(true);
            const data: Question = await getQuestionById(params.id, user.token);
            setQuestion(data);
        }
        catch(error){
            console.log("Error fetching question: " + error);
        }
        finally{
            setLoading(false);
        }
    }

    async function handleAnswerSelect(index: number) {
        if(selectedAnswer !== null){
            return;
        }

        const correct = index === question?.answerIndex;
        setSelectedAnswer(index);
        setIsCorrect(correct);

        if(correct){
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#00f7ff", "#4ade80", "#3b82f6", "#a855f7"],
            });
        }

        if(user && question){
            const answerRequestBody : AnswerRequest = {
                userId: user.firebaseUid,
                questionId: question.id,
                isCorrect: correct
            }

            try{
                await answerQuestion(answerRequestBody, user.token);
            }
            catch(error){
                console.log("Error answering question: " + error)
            }
        }
    }

    async function handleFreeResponseSubmit() {
        if(response === "" || !response){
            return;
        }


        const correct = response.toLowerCase() === question?.freeResponseAnswer?.toLowerCase();
        setIsCorrect(correct);

        if(correct){
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#00f7ff", "#4ade80", "#3b82f6", "#a855f7"],
            });
        }

        if(user && question){
            const answerRequestBody : AnswerRequest = {
                userId: user.firebaseUid,
                questionId: question.id,
                isCorrect: correct
            }

            try{
                await answerQuestion(answerRequestBody, user.token);
            }
            catch(error){
                console.log("Error answering question: " + error)
            }
        }
    }

    if(loading){
        return(
          <div className="flex items-center justify-center min-h-screen bg-black">
            <MoonLoader color="#00f7ff" size={60} />
          </div>
        )
      }

    return(
<main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="text-5xl font-bold text-blue-300 mb-2 flex items-center justify-center gap-3">
            {question?.title}
            {question?.correct && (
                <CheckCircle className="text-green-400 w-8 h-8" />
            )}
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
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
              {question?.difficulty}
            </Badge>

            <Badge
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                question.category === "LANGUAGES"
                  ? "bg-purple-600/20 text-purple-400 border border-purple-700/40"
                  : question.category === "DATABASES"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-700/40"
                  : "bg-zinc-800/50 text-zinc-300 border border-zinc-700/40"
              }`}
            >
              {question?.category}
            </Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-zinc-900/80 border border-zinc-800 shadow-lg rounded-2xl mb-8">

            <CardContent>
              <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                {question?.prompt}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm rounded-2xl bg-zinc-900/80 border border-zinc-800">
                {question?.type === "MULTIPLE_CHOICE" && (
                    <CardContent className="mt-4 space-y-3">
                    {question?.answerChoices?.map((choice, index) => {
                    const isSelected = selectedAnswer === index;
                    const isChoiceCorrect = question.answerIndex === index;
                
                    const baseClasses =
                        "w-full justify-start text-left text-base rounded-xl border transition-all duration-200";
                
                    const defaultClasses =
                        "bg-transparent border-zinc-800 text-zinc-300 hover:text-blue-400 hover:bg-zinc-800/50";
                
                    const correctClasses =
                        "bg-green-600/20 border-green-700/40 text-green-400";
                    const wrongClasses =
                        "bg-red-600/20 border-red-700/40 text-red-400";
                
                    let finalClasses = defaultClasses;
                
                    if (selectedAnswer !== null || question.isCorrect) {
                        if ((isSelected && isCorrect) || (question.isCorrect && isChoiceCorrect)) {
                        finalClasses = correctClasses + " pointer-events-none";
                        } else if (isSelected && !isCorrect) {
                        finalClasses = wrongClasses + " pointer-events-none";
                        } else if (!isSelected && !isCorrect && isChoiceCorrect) {
                        finalClasses = correctClasses + " pointer-events-none";
                        } else {
                        finalClasses = "opacity-60 pointer-events-none";
                        }
                    }
                
                    return (
                        <Button
                        key={index}
                        onClick={() => {
                            if (!question.isCorrect && selectedAnswer === null) {
                            handleAnswerSelect(index);
                            }
                        }}
                        variant="outline"
                        className={`${baseClasses} ${finalClasses}`}
                        >
                        <span
                            className={`font-medium mr-3 ${
                            selectedAnswer !== null || question.isCorrect
                                ? isChoiceCorrect
                                ? "text-green-400"
                                : isSelected
                                ? "text-red-400"
                                : "text-zinc-500"
                                : "text-zinc-500"
                            }`}
                        >
                            {String.fromCharCode(65 + index)}.
                        </span>
                        {choice}
                        </Button>
                        
                    );
                    })}

                  </CardContent>
                )}

                    {question?.type === "FREE_RESPONSE" && (
                    <CardContent className="mt-1 space-y-3">

                        <div className="space-y-4">
                            <Input
                                id="response"
                                type="text"
                                placeholder="Enter your response..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500"
                            />
                            <Button
                                onClick={handleFreeResponseSubmit}
                                className="bg-blue-600 hover:bg-blue-500 transition-all"
                            >
                                Submit
                            </Button>
                        </div>

                    </CardContent>
                    )}
            
            </Card>

        </motion.div>
      </div>
    </main>
    );

}

export default ProtectedRoutes(Question);