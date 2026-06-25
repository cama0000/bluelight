import { Comment } from "@/types/comment";


interface CommentCardProps{
  comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div key={comment.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      
      <div className="flex justify-between items-center mb-1">
        
        <span className="text-sm font-medium text-blue-400">
          {comment.username}
        </span>
        
        <span className="text-xs text-zinc-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
        
      </div>

      <p className="text-zinc-300 text-sm">{comment.content}</p>
      
    </div>
  )
}