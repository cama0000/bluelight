import { AnswerRequest, FavoriteRequest, Question, QuestionRequest, VoteRequest } from "@/types/question";
import { api, HttpMethod } from "@/api/api";

export const questionRoutes = {
  create: () => `questions/save`,
  read: (questionId: string) => `questions/getQuestionById/${questionId}`,
  readAll: () => `questions/getAllQuestions`,
  submitAnswer: () => `user/answerQuestion`,
  submitVote: () => `questions/submitLikeDislike`,
  submitFavorite: () => `questions/submitFavorite`,
  getCompletedQuestions: () => `questions/getCompletedQuestions`,
  getFavoritedQuestions: () => `questions/getFavoritedQuestions`
}

export const createQuestion = async(questionRequest : QuestionRequest, token : string) => {
  return await api({
    route: questionRoutes.create(),
    method: HttpMethod.POST,
    body: questionRequest,
    token: token
  })
}

export const read = async(questionId: string, token : string): Promise<Question> => {
  return await api({
    route: questionRoutes.read(questionId),
    method: HttpMethod.GET,
    token: token
  })
}

export const readAll = async (token: string): Promise<Question[]> => {
  return await api({
    route: questionRoutes.readAll(),
    method: HttpMethod.GET,
    token: token
  })
}

export const submitAnswer = async(answerRequest : AnswerRequest, token : string) => {
  return await api({
    route: questionRoutes.submitAnswer(),
    method: HttpMethod.GET,
    body: answerRequest,
    token: token
  })
}

export const submitVote = async(voteRequest : VoteRequest, token : string): Promise<Question> => {
  return await api({
    route: questionRoutes.submitVote(),
    method: HttpMethod.POST,
    body: voteRequest,
    token: token
  })
}

export const submitFavorite = async(favoriteRequest : FavoriteRequest, token : string): Promise<Question> => {
  return await api({
    route: questionRoutes.submitFavorite(),
    method: HttpMethod.POST,
    body: favoriteRequest,
    token: token
  })
}

export const getCompletedQuestions = async(token : string): Promise<Question[]> => {
  return await api({
    route: questionRoutes.getCompletedQuestions(),
    method: HttpMethod.GET,
    token: token
  })
}

export const getFavoritedQuestions = async(token : string): Promise<Question[]> => {
  return await api({
    route: questionRoutes.getFavoritedQuestions(),
    method: HttpMethod.GET,
    token: token
  })
}

export const questionApi = {
  createQuestion,
  read,
  readAll,
  submitAnswer,
  submitVote,
  submitFavorite,
  getCompletedQuestions,
  getFavoritedQuestions
}