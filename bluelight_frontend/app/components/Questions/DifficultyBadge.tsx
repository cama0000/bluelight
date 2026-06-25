import { Badge } from "@/components/ui/badge";
import { Difficulty, DifficultyLabels } from "@/types/question";

interface DifficultyBadgeProps{
  difficulty: Difficulty
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {

  return (
    <>
      <Badge
        className={`${difficulty === Difficulty.EASY
          ? "bg-green-600/20 text-green-400 border border-green-700/40"
          : difficulty === Difficulty.MEDIUM
            ? "bg-yellow-600/20 text-yellow-400 border border-yellow-700/40"
            : difficulty === Difficulty.HARD
              ? "bg-red-600/20 text-red-400 border border-red-700/40"
              : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text border border-blue-700/40"
          }`}
      >
        {DifficultyLabels[difficulty]}
      </Badge>
    </>
  )
}