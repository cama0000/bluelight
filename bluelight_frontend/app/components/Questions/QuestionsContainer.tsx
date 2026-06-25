import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import QuestionCard from "./QuestionCard";
import { Question } from "@/types/question";
import { useState } from "react";

interface QuestionsContainerProps{
  questions: Question[] | undefined,
  searchQuery: string
}

export default function QuestionsContainer({ questions, searchQuery }: QuestionsContainerProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  
  return (
    <div>
      
      <Card className="bg-zinc-900/80 border border-zinc-800 shadow-2xl rounded-2xl p-3">
        {questions?.length === 0 ? (
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

            {questions?.map((question) => (
              <QuestionCard key={question.id} question={question}/>
            ))}

          </motion.div>
        )}

      </Card>

    </div>
  )
}