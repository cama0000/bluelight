import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Category, Question, QuestionType } from "@/types/question";
import { motion } from "framer-motion";
import Link from "next/link";

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
    );
}

export default QuestionCard;