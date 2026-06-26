import { Comment, CommentRequest } from "@/types/comment";
import axios from "axios";

export const saveComment = async(commentBody : CommentRequest, token : string): Promise<Comment> => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}comments/save`, commentBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
}

export const getCommentsByQuestionId = async(questionId: number, token : string): Promise<Comment[]> => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_NAME}comments/getCommentsByQuestionId/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
  }