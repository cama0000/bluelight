import { Question, QuestionRequest, QuestionResponse, VoteRequest } from "@/types/question";
import axios from "axios";

export const saveQuestion = async(questionBody : QuestionRequest, token : string) => {
    await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}questions/save`, questionBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
}

export const getAllQuestions = async(token : string): Promise<Question[]> => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_NAME}questions/getAllQuestions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
}

export const getQuestionById = async(questionId: string, token : string): Promise<Question> => {
    const qId: number = Number(questionId);

    console.log("QUESTION ID:" + qId)

    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_NAME}questions/getQuestionById/${qId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
}

export const submitLikeDislike = async(voteRequestBody : VoteRequest, token : string): Promise<Question> => {
  const response = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST_NAME}questions/submitLikeDislike`, voteRequestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
}