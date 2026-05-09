import { AnswerRequest, Question } from "@/types/question";
import { User } from "@/types/user";
import axios from "axios";

export const login = async(userBody : User, token : string) : Promise<User> => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}user/login`, userBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
}

export const getMe = async(token : string) : Promise<User> => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_NAME}user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
}

export const answerQuestion = async(requestBody : AnswerRequest, token : string) => {
  await axios.put(
      `${process.env.NEXT_PUBLIC_HOST_NAME}user/answerQuestion`, requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
}

export const getCompletedQuestions = async(token : string): Promise<Question[]> => {
  const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST_NAME}questions/getCompletedQuestions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
}

export const getFavoritedQuestions = async(token : string): Promise<Question[]> => {
  const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST_NAME}questions/getFavoritedQuestions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
}