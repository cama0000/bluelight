'use client'

import ProtectedRoutes from "@/app/components/ProtectedRoutes";
import { useAuth } from "@/context/AuthContext";
import { getQuestionById } from "@/services/question";
import { Question } from "@/types/question";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    //     <main className="min-h-screen bg-background py-12">
    //     <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
    //       {/* Header */}
    //       <div className="mb-8">
    //         <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
    //           {question.title}
    //         </h1>
    //         <div className="flex items-center gap-3 text-sm text-muted-foreground">
    //           <Badge
    //             variant={
    //               question.difficulty === "Easy"
    //                 ? "outline"
    //                 : question.difficulty === "Medium"
    //                 ? "default"
    //                 : "destructive"
    //             }
    //           >
    //             {question.difficulty}
    //           </Badge>
    //           <span>•</span>
    //           <span>{question.category}</span>
    //         </div>
    //       </div>
  
    //       {/* Problem Description */}
    //       <Card className="mb-6 border border-border/60 shadow-sm rounded-2xl">
    //         <CardHeader>
    //           <CardTitle className="text-lg font-semibold text-foreground">
    //             Problem Description
    //           </CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
    //             {question.prompt}
    //           </p>
    //         </CardContent>
    //       </Card>
  
    //       {/* Answer Choices */}
    //       <Card className="border border-border/60 shadow-sm rounded-2xl">
    //         <CardHeader>
    //           <CardTitle className="text-lg font-semibold text-foreground">
    //             Answer Choices
    //           </CardTitle>
    //         </CardHeader>
  
    //         <Separator />
  
    //         <CardContent className="mt-4 space-y-3">
    //           {question.answerChoices.map((choice, index) => (
    //             <Button
    //               key={index}
    //               variant="outline"
    //               className="w-full justify-start text-left text-base hover:bg-muted transition-all rounded-xl"
    //             >
    //               <span className="font-medium mr-3 text-muted-foreground">
    //                 {String.fromCharCode(65 + index)}.
    //               </span>
    //               {choice}
    //             </Button>
    //           ))}
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </main>

    <div>
        yeah
    </div>
    );

}

export default ProtectedRoutes(question);