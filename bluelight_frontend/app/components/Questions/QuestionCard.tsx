import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CategoryLabels, Difficulty, DifficultyLabels, Question, QuestionTypeLabels } from "@/types/question";
import { motion } from "framer-motion";
import Link from "next/link";
import DifficultyBadge from "./DifficultyBadge";
import CategoryBadge from "./CategoryBadge";

interface QuestionProps{
    question: Question
};

const QuestionCard = ({question}: QuestionProps) => {
    return(
        <motion.div
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
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                {question.title}
              </h2>

              {question.isCorrect && (
                <span className="text-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>

            <div className="text-xs text-zinc-400 mt-0.5">
              {QuestionTypeLabels[question.type]}
            </div>
</div>


            <div className="flex items-center gap-2">
              <CategoryBadge category={question.category} />

              <DifficultyBadge difficulty={question.difficulty} />

        </div>

        </div>
      </Card>
      </Link>
      </motion.div>
    );
}

export default QuestionCard;