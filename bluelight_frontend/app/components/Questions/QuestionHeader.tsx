import { submitFavorite, submitLikeDislike } from "@/services/question"
import { Question, FavoriteRequest, VoteRequest } from "@/types/question"
import { User } from "@/types/user"
import { useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import DifficultyBadge from "./DifficultyBadge"
import CategoryBadge from "./CategoryBadge"
import QuestionLikeDislike from "./QuestionLikeDislike"
import QuestionFavorite from "./QuestionFavorite"

interface QuestionHeaderProps{
  question: Question | undefined,
  setQuestion: React.Dispatch<React.SetStateAction<Question | undefined>>,
  user: User | null
}

export default function QuestionHeader({ question, setQuestion, user }: QuestionHeaderProps) {
  const queryClient = useQueryClient();

  async function handleFavorite() {
    try {
      setQuestion((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          isFavorited: !prev.isFavorited,
        };
        return updated;
      });

      const favoriteRequestBody: FavoriteRequest = {
        userId: user!.firebaseUid,
        questionId: question!.id,
      };

      await submitFavorite(favoriteRequestBody, user!.token);

      queryClient.setQueryData(
        ["question", question?.id.toString(), user?.firebaseUid],
        (prev: Question | undefined) => {
          if (!prev) return prev;

      
          return {
            ...prev,
            isFavorited: !prev.isFavorited,
          };
        }
      );

    } catch (error) {
      console.log("Error favoriting question:", error);
    }
          
  }

  async function handleLikeDislike(didLike: boolean) {
    try {
      const voteRequestBody: VoteRequest = {
        userId: user!.firebaseUid,
        questionId: question!.id,
        isLiked: didLike,
      };
    
      const data: Question = await submitLikeDislike(voteRequestBody, user!.token);
    
      setQuestion((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          likes: data.likes ?? prev.likes,
          dislikes: data.dislikes ?? prev.dislikes,
          isLiked: data.isLiked,
          isDisliked: data.isDisliked,
        };
        return updated;
      });

      queryClient.setQueryData(
        ["question", question?.id.toString(), user?.firebaseUid],
        (prev: Question | undefined) => {
          if (!prev) return prev;

      
          return {
            ...prev,
            likes: data.likes,
            dislikes: data.dislikes,
            isLiked: data.isLiked,
            isDisliked: data.isDisliked,
          };
        }
      );
    } catch (error) {
      console.log("Error voting on question:", error);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10 text-center"
    >
      <h1 className="text-5xl font-bold text-blue-300 mb-2 flex items-center justify-center gap-3">
        {question?.title}
        {question?.isCorrect && (
          <CheckCircle className="text-green-400 w-8 h-8" />
        )}
      </h1>

      <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">

        {question && (
          <>
            <DifficultyBadge difficulty={question.difficulty} />

            <CategoryBadge category={question.category} />
          </>
        )}
      
        <div className="h-4 w-px bg-zinc-700"></div>

        <div className="flex items-center gap-2">
          
          <QuestionLikeDislike didLike={true} count={question?.likes} active={question?.isLiked} handleLikeDislike={handleLikeDislike} />
          <QuestionLikeDislike didLike={false} count={question?.dislikes} active={question?.isDisliked} handleLikeDislike={handleLikeDislike} />
        
          <QuestionFavorite active={question?.isFavorited} handleFavorite={handleFavorite} />

        </div>
      </div>
      
    </motion.div>
  )
}