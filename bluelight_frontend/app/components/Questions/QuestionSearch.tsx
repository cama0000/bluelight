import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface QuestionSearchProps{
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function QuestionSearch({ searchQuery, setSearchQuery }: QuestionSearchProps) {

  return (
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
  )
}