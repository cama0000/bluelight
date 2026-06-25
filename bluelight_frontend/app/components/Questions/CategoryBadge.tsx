import { Badge } from "@/components/ui/badge";
import { Category, CategoryLabels } from "@/types/question";

interface CategoryBadgeProps{
  category: Category
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {

  return (
    <Badge className={`${
      category === "LANGUAGES"
        ? "bg-purple-600/20 text-purple-400 border border-purple-700/40"
      : category === "DATABASES"
        ? "bg-blue-600/20 text-blue-400 border border-blue-700/40"
      : category === "WEB_DEVELOPMENT"
        ? "bg-green-600/20 text-green-400 border border-green-700/40"
      : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text border border-blue-700/40"
      }`}
    >
      {CategoryLabels[category]}
    </Badge>
  )
}