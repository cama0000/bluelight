import { commentApi } from "@/api/commentApi";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Comment, CommentRequest } from "@/types/comment";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface CommentFormProps{
  questionId: string;
  user: User | null;
}

export default function CommentForm({ questionId, user }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  async function handleSubmit(){
    try{
      setSubmitting(true);

      const commentRequest : CommentRequest = {
        questionId: Number(questionId),
        content: newComment
      }

      const data : Comment = await commentApi.create(commentRequest, user!.token);

      queryClient.setQueryData(
        ["comments", questionId, user?.firebaseUid],
        (oldComments: Comment[] | undefined) => {
          return oldComments
            ? [data, ...oldComments] : [data];
        }
      );
      
      setNewComment("");
    }
    catch(error){
      console.log("Error saving comment: " + error);
    }
    finally{
      setSubmitting(false);
    }
  }

  return (
    <div>
      
      <div className="flex flex-row gap-2">
        
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 resize-none"
        />
        
        <Button
          onClick={handleSubmit}
          disabled={submitting || !newComment.trim() || newComment.length > 500}
          className="bg-blue-600 hover:bg-blue-500 hover:cursor-pointer"
        >
          Post
        </Button>
        
      </div>
  
      
      <div className="flex justify-between items-center">
        
        <h2 className={newComment.length <= 500 ? 'text-white text-xs mt-1' : 'text-red-600 text-xs mt-1'}>
          {newComment.length}/500
        </h2>
        
      </div>

    </div>
  )
}