import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface QuestionFavoriteProps{
  active: boolean | undefined,
  handleFavorite: () => Promise<void>
}

export default function QuestionFavorite({ active, handleFavorite }: QuestionFavoriteProps) {

  return (
    <>
      <Button
        onClick={handleFavorite}
        className={`p-1 bg-transparent hover:bg-transparent hover:cursor-pointer hover:scale-125 
                  ${active ? "text-yellow-400" : "text-zinc-400"
          }`}
      >
        <Star
          size={18}
          className={active ? "fill-yellow-400 text-yellow-400" : ""}
        />
      </Button>
    </>
  )
}