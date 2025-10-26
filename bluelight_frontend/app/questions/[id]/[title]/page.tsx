'use client'

import ProtectedRoutes from "@/app/components/ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import { getQuestionById } from "@/services/question";
import { Question } from "@/types/question";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const question = () => {
    const {user} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState<Question | null>(null);
    const params = useParams<{id: string, title: string}>();

    useEffect(() => {
        if(user?.token){
            fetchQuestion(params);
        }
    }, [user?.firebaseUid, params?.id]);

    async function fetchQuestion(params: {id: string, title: string}){
        if(!user?.token){
            console.error("User not authenticated.");
            return;
        }

        try{
            setLoading(true);
            const data: Question = await getQuestionById(params.id, user.token);
            setQuestion(data);
        }
        catch(error){
            console.log("Error fetching question: " + error);
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div>
            <div>
                        {question?.prompt}
                        {question?.category}
                        {question?.difficulty}
                        {question?.answerChoices?.map((choice, index) => (
                            <div
                                key={index}
                                >
                                    {choice}
                                    </div>
                        ))}
            </div>
        </div>
    );

}

export default ProtectedRoutes(question);