import { Button } from "@/components/ui/button"
import { ThumbsDown, ThumbsUp } from "lucide-react"

interface QuestionLikeDislikeProps {
  didLike: boolean,
  count: number | undefined,
  active: boolean | undefined,
  handleLikeDislike: (didLike: boolean) => Promise<void>;
}

export default function QuestionLikeDislike({ didLike, count, active, handleLikeDislike }: QuestionLikeDislikeProps) {
  return (
    <>
      <Button
        onClick={() => { handleLikeDislike(didLike) }}
          className={`p-1 bg-transparent hover:bg-transparent hover:cursor-pointer 
            ${didLike ? 'text-green-500' : 'text-red-500' } hover:scale-125`}
      >
        
        {didLike ? (
          active ? (
            <ThumbsUp size={18} className="fill-green-500 text-green-500" />
          ) : (
            <ThumbsUp size={18} />
          )
        ) : active ? (
          <ThumbsDown size={18} className="fill-red-500 text-red-500" />
        ) : (
          <ThumbsDown size={18} />
        )}
          
      </Button>
      
      <span className={`${didLike ? 'text-green-500' : 'text-red-500'} text-s`} >{count}</span>
      
      </>
  )
}