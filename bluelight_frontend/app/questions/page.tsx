'use client'

import { useAuth } from "@/context/AuthContext";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import { getAllQuestions, saveQuestion } from "@/services/question";
import { Question, Category, Difficulty, QuestionType, QuestionRequest } from "@/types/question";
import { useEffect, useState } from "react";
import Link from "next/link";

const questions = () => {
    const {user} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        if(user?.token){
            fetchQuestions();
        }
    }, [user?.firebaseUid])

    async function handleMakeQuestion(){
        if(!user?.token){
            console.error("User not authenticated.");
            return;
        }
        
        try{
            const questionBody: QuestionRequest = {
                    title: "TEST QUESTION",
                    prompt: "TEST PROMPT THIS IS A TEST PROMPT 123",
                    category: Category.DATA_STRUCTURES,
                    difficulty: Difficulty.EASY,
                    type: QuestionType.MULTIPLE_CHOICE,
                    answerChoices: ["wrong1", "wrong2", "correct", "wrong3"],
                    answerIndex: 2
            }

            await saveQuestion(questionBody, user?.token);
        }
        catch(error){
            console.log("Error making questions: " + error);
        }
    }

    async function fetchQuestions(){
        if(!user?.token){
            console.error("User not authenticated.");
            return;
        }
        
        try{
            setLoading(true);
            const data: Question[] = await getAllQuestions(user.token);

            console.log(JSON.stringify(data, null, 2));

            setQuestions(data);


        }
        catch(error){
            console.log("Error fetching questions: " + error);
        }
        finally{
            setLoading(false);
        }
    }

    if(loading){
        return <div>FETCHING QUESTIONS</div>
    }

    if(questions.length == 0){
        return <div>NO QUESTIONS</div>
    }

    return (
        <div>
            <Typography>
                Questions
            </Typography>

            <Button onClick={handleMakeQuestion}>
                Make question
            </Button>

            {questions.map((question) => (
                <Link 
                    key={question.id}
                    href={`/questions/${encodeURIComponent(question.id)}/${encodeURIComponent(question.title)}`}
                    >
                        {question.title}
                    </Link>

            ))}

            
        </div>
    );
}

export default ProtectedRoutes(questions);