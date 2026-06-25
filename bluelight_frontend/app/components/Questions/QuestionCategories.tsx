import { Category, CategoryLabels } from "@/types/question";

interface QuestionCategoriesProps{
  selectedCategory: string | null,
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function QuestionsCategories({ selectedCategory, setSelectedCategory }: QuestionCategoriesProps) {

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none w-full sm:w-auto py-3 px-1">
      
      {Object.values(Category).map((cat) => (
        
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)
          }
          className={`flex-shrink-0 text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200
            ${selectedCategory === cat
              ? "bg-blue-600/20 text-blue-400 border-blue-700/40"
              : "bg-zinc-900/70 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
            }`}
        >
          {CategoryLabels[cat]}
        </button>
        
      ))}
      
    </div>
  
  )
}