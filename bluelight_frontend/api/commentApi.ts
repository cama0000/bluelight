import { Comment, CommentRequest } from "@/types/comment";
import { api, HttpMethod } from "./api";

export const commentRoutes = {
  create: () => `comments/save`,
  readByQuestionId: (questionId: string) => `comments/getCommentsByQuestionId/${questionId}`
}

export const create = async(commentRequest : CommentRequest, token : string): Promise<Comment> => {
  return await api({
    route: commentRoutes.create(),
    method: HttpMethod.POST,
    body: commentRequest,
    token: token
  })
}

export const readByQuestionId = async(questionId: string, token : string): Promise<Comment[]> => {
  return await api({
    route: commentRoutes.readByQuestionId(questionId),
    method: HttpMethod.GET,
    token: token
  })
}

export const commentApi = {
  create,
  readByQuestionId
}