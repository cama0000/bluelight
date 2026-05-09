'use client'

import { useAuth } from "@/context/AuthContext";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Question } from "@/types/question";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { User, Mail, Trophy, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCompletedQuestions, getFavoritedQuestions } from "@/services/user";
import Link from "next/link";
import Loader from "../components/Loader";


// TODO: put the rank really big #86 on the right side of the user part

const ProfilePage = () => {
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [favoritedQuestions, setFavoritedQuestions] = useState<Question[]>([]);

  useEffect(() => {
      if (user?.token) {
            fetchCompletedQuestions();
            fetchFavoritedQuestions();
        }

    }, [user?.firebaseUid]);

    async function fetchCompletedQuestions(){
        if(!user?.token){
            console.error("User not authenticated.");
            return;
        }

        try{
            const data: Question[] = await getCompletedQuestions(user.token);

            setQuestions(data);
        }
        catch(error){
            console.log("Error fetching completed questions: " + error);
        }
        finally{
            setLoading(false);
        }
    }

    async function fetchFavoritedQuestions(){
        if(!user?.token){
            console.error("User not authenticated.");
            return;
        }
        
        try{
            const data: Question[] = await getFavoritedQuestions(user.token);

            setFavoritedQuestions(data);
        }
        catch(error){
            console.log("Error fetching favorited questions: " + error);
        }
        finally{
            setLoading(false);
        }
    }

    if(loading){
      return(
        <Loader/>
      )
    }

    return(
        <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white py-16 px-6">
        <div className="max-w-12xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
  
          <Card className="bg-zinc-900/80 border border-zinc-800 shadow-lg rounded-2xl">
            <CardContent className="p-8 flex flex-col items-center md:items-start">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 mb-6">
                <Image
                  src="/images/default-user.png"
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              </div>
  
              <div className="space-y-3 w-full">
                <h2 className="text-3xl font-bold text-blue-300 flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-400" />
                  {user?.username || "User not found"}
                </h2>
  
                <p className="flex items-center text-zinc-400 gap-2">
                  <Mail className="w-4 h-4 text-zinc-500" /> {user?.email}
                </p>
  
                <p className="text-zinc-400 italic">
                  {user?.bio || ""}
                </p>
  
                <div className="flex items-center gap-3 mt-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">
                    {user?.points ?? 0} points
                  </span>
                </div>
  
                <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 w-full md:w-auto">
                  <Edit className="w-4 h-4" /> Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
  
          <Card className="bg-zinc-900/80 border border-zinc-800 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-blue-300 underline">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              {questions.length === 0 ? (
                <p className="text-zinc-400">No completed questions yet.</p>
              ) : (
                <ul className="divide-y divide-zinc-800">
                  {questions.map((q) => (
                    <li
                      key={q.id}
                      className="py-3 flex justify-between items-center text-zinc-300"
                    >
                    <Link
                        href={`/questions/${encodeURIComponent(
                            q.id
                        )}/${encodeURIComponent(q.title)}`}
                        >
                      <span className="font-medium hover:cursor-pointer hover:text-blue-400 hover:underline">{q.title}</span>
                      </Link>

                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm font-semibold ${
                            q.isCorrect ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {q.isCorrect ? "✔ Correct" : "✖ Incorrect"}
                        </span>
                        <span
                          className={`text-xs rounded-full px-2 py-0.5 border ${
                            q.difficulty === "EASY"
                              ? "text-green-400 border-green-700/40"
                              : q.difficulty === "MEDIUM"
                              ? "text-yellow-400 border-yellow-700/40"
                              : "text-red-400 border-red-700/40"
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
  
        </div>




        <div className="max-w-12xl mx-auto mt-8">
    <Card className="bg-zinc-900/80 border border-zinc-800 shadow-lg rounded-2xl w-full">
      <CardHeader>
        <CardTitle className="text-xl text-blue-300 underline">
          Favorites
        </CardTitle>
      </CardHeader>
      <CardContent>
      <CardContent>
  {favoritedQuestions.length === 0 ? (
    <p className="text-zinc-400">No favorited questions.</p>
  ) : (
    <ul className="divide-y divide-zinc-800">
      {favoritedQuestions.map((q) => (
        <li
          key={q.id}
          className="py-3 flex justify-between items-center text-zinc-300"
        >
          <Link
            href={`/questions/${encodeURIComponent(q.id)}/${encodeURIComponent(q.title)}`}
          >
            <span className="font-medium hover:cursor-pointer hover:text-blue-400 hover:underline">
              {q.title}
            </span>
          </Link>

          <span
            className={`text-xs rounded-full px-2 py-0.5 border ${
              q.difficulty === "EASY"
                ? "text-green-400 border-green-700/40"
                : q.difficulty === "MEDIUM"
                ? "text-yellow-400 border-yellow-700/40"
                : "text-red-400 border-red-700/40"
            }`}
          >
            {q.difficulty}
          </span>
        </li>
      ))}
    </ul>
  )}
</CardContent>

      </CardContent>
    </Card>
  </div>
      </main>
    );

}

export default ProtectedRoutes(ProfilePage);