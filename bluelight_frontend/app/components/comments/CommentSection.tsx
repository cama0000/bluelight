import { useAuth } from "@/context/AuthContext";
import { getCommentsByQuestionId } from "@/services/comment";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";

interface CommentSectionProps {
  questionId: string;
}

export default function CommentSection({ questionId }: CommentSectionProps) {
  const { user } = useAuth();

  const {data: comments, isLoading } = useQuery({
    queryKey: ["comments", questionId, user?.firebaseUid],
    queryFn: () => getCommentsByQuestionId(Number(questionId), user!.token),
    staleTime: Infinity,
  });

  if(isLoading){
    return(
      <Loader/>
    )
  }

  return(
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>

      <div className="flex flex-col gap-2 mb-6">
        <CommentForm questionId={questionId} user={user}/>
  
        {!isLoading && comments?.length === 0 && (
          <div className="text-zinc-500 text-sm mt-5">
            No comments on this question yet.
          </div>
        )}
  
        <div className="space-y-4 mt-5">
          {comments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment}/>
          ))}
        </div>
        
      </div>
    </div>
  );
};
