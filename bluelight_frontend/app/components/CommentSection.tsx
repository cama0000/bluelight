import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { saveComment } from "@/services/comment";
import { getCommentsByQuestionId } from "@/services/comment";
import { Comment, CommentRequest } from "@/types/comment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";

interface CommentSectionProps {
  questionId: string;
}

  export default function CommentSection({ questionId }: CommentSectionProps) {
    const { user } = useAuth();
    const [newComment, setNewComment] = useState("");
    const [commentError, setCommentError] = useState("");    
    const [submitting, setSubmitting] = useState(false);
    const queryClient = useQueryClient();
  
    const {data: comments, isLoading } = useQuery({
      queryKey: ["comments", questionId, user?.firebaseUid],
      queryFn: () => getCommentsByQuestionId(Number(questionId), user!.token),
      staleTime: Infinity,
    });

    async function handleSubmit(){
      if (!newComment.trim() || !user?.token) return;

      if (newComment.length > 500) {
        setCommentError("Comment must be 500 characters or less");
        return;
      }

      setCommentError("");

      try{
        setSubmitting(true);

        const commentRequest : CommentRequest = {
          questionId: Number(questionId),
          content: newComment
        }

        const data : Comment = await saveComment(commentRequest, user.token);

        queryClient.setQueryData(
          ["comments", questionId, user?.firebaseUid],
          (oldComments: Comment[] | undefined) => {
            return oldComments
              ? [data, ...oldComments]
              : [data];
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


    return(
      <div className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>

      <div className="flex flex-col gap-2 mb-6">
        <div className="flex flex-row gap-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 resize-none"
            />
            <Button
              onClick={handleSubmit}
              disabled={submitting || !newComment.trim()}
              className="bg-blue-600 hover:bg-blue-500 hover:cursor-pointer"
            >
              Post
            </Button>
        </div>

        <div className="flex justify-between items-center">
          <h2 className={newComment.length <= 500 ? 'text-white text-xs mt-1' : 'text-red-600 text-xs mt-1'}>
            {newComment.length}/500
          </h2>
            {commentError && <p className="text-red-600 text-xs mt-1">{commentError}</p>}
          </div>
        </div>

      {isLoading && (
        <Loader/>
      )}

      {!isLoading && comments?.length === 0 && (
        <div className="text-zinc-500 text-sm">
          No comments on this question yet.
        </div>
      )}

      <div className="space-y-4">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
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
        ))}
      </div>
    </div>
    );
};
