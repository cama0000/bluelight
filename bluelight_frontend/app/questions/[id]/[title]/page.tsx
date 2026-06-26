'use client'

import ProtectedRoutes from "@/app/components/other/ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import { QuestionType, type AnswerRequest, type Question } from "@/types/question";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Card,
  CardContent
} from "@/components/ui/card"
import CodeSnippet from "@/app/components/questions/CodeSnippet";
import Loader from "@/app/components/other/Loader";
import { shuffleChoices } from "@/app/utils/misc";
import CommentSection from "@/app/components/comments/CommentSection";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QuestionHeader from "@/app/components/questions/QuestionHeader";
import FreeResponseForm from "@/app/components/questions/FreeResponseForm";
import AnswerChoices from "@/app/components/questions/AnswerChoices";
import AnswerExplanation from "@/app/components/questions/AnswerExplanation";
import { questionApi } from "@/api/questionApi";

const Question = () => {
  const { user } = useAuth();
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shuffledChoices, setShuffledChoices] = useState<string[]>([]);
  const [response, setResponse] = useState<string>("");
  const params = useParams<{ id: string, title: string }>();
  const queryClient = useQueryClient();

  const {data: questionData, isLoading } = useQuery({
    queryKey: ["question", params.id, user?.firebaseUid],
    queryFn: () => questionApi.read(params.id, user!.token),
    staleTime: Infinity,
  });

  useEffect(() => {
    if(questionData?.type === QuestionType.MULTIPLE_CHOICE){
      const { array, newCorrectIndex } = shuffleChoices(questionData.answerChoices ?? [], questionData.answerIndex ?? 0);

      setQuestion({
        ...questionData,
        answerIndex: newCorrectIndex
      })
      
      setShuffledChoices(array);
    }
    else {
      setQuestion(questionData);
    }
  }, [questionData])

  async function handleFreeResponseSubmit() {
      if(response === "" || !response){
          return;
      }

      const correct = response.toLowerCase() === question?.freeResponseAnswer?.toLowerCase();
      setIsCorrect(correct);

      if(correct){
        handleCorrectAnswer();
      }

      if(user && question){
          const answerRequest : AnswerRequest = {
              userId: user.firebaseUid,
              questionId: question.id,
              isCorrect: correct
          }

          try{
              await questionApi.submitAnswer(answerRequest, user.token);
          }
          catch(error){
              console.log("Error answering question: " + error);
          }
      }
  }

  async function handleAnswerSelect(index: number) {
      const correct = index === question?.answerIndex;
      setSelectedAnswer(index);
      setIsCorrect(correct);

      const answerRequest : AnswerRequest = {
          userId: user!.firebaseUid,
          questionId: question!.id,
          isCorrect: correct
      }

      try{
        await questionApi.submitAnswer(answerRequest, user!.token);

        if(correct){
          handleCorrectAnswer();
        }
      }
      catch(error){
          console.log("Error answering question: " + error);
      }
  }

  const handleCorrectAnswer = () => {
    if(!question?.isCorrect) {
      queryClient.invalidateQueries({
        queryKey: ["questions", user?.firebaseUid],
      });

      queryClient.invalidateQueries({
        queryKey: ["question", params.id, user?.firebaseUid],
        refetchType: "none"
      });
    }
  
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00f7ff", "#4ade80", "#3b82f6", "#a855f7"],
    });
  }

  if(isLoading){
      return(
        <Loader/>
      )
  }

  return(
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <QuestionHeader question={question} setQuestion={setQuestion} user={user}/>
  
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
  
          {question?.codeSnippet && (
            <CodeSnippet
              codeSnippet={question?.codeSnippet}
              language={question?.language?.toLowerCase()}
            />
          )}
  
          <Card className="border-border/60 shadow-sm rounded-2xl bg-zinc-900/80 border border-zinc-800">
            
            {question?.type === QuestionType.MULTIPLE_CHOICE && (
              <AnswerChoices
                answerChoices={shuffledChoices}
                answerIndex={question?.answerIndex}
                selectedAnswer={selectedAnswer}
                isCorrect={isCorrect}
                hasAnsweredCorrect={question?.isCorrect}
                handleAnswerSelect={handleAnswerSelect}
              />
            )}

            {question?.type === QuestionType.FREE_RESPONSE && (
              <FreeResponseForm
                response={response}
                isCorrect={isCorrect}
                setResponse={setResponse}
                handleFreeResponseSubmit={handleFreeResponseSubmit} />
              )}
            
            </Card>
  
            {(isCorrect !== null) && (
              <AnswerExplanation
                isCorrect={isCorrect}
                explanation={question?.explanation}
                freeResponseAnswer={question?.freeResponseAnswer}
              />
            )}
  
            <CommentSection questionId={params.id}/>
  
        </motion.div>
      </div>
  </main>
  );

}

export default ProtectedRoutes(Question);