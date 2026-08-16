"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProtectedRoutes from "../components/other/ProtectedRoutes";
import Loader from "../components/other/Loader";
import { useQuery } from "@tanstack/react-query";
import QuestionsContainer from "../components/questions/QuestionsContainer";
import QuestionCategories from "../components/questions/QuestionCategories";
import QuestionSearch from "../components/questions/QuestionSearch";
import { questionApi } from "@/api/questionApi";
import { useAppSelector } from "@/store/store";
import { selectCurrentUser } from "@/store/user/userSelectors";

const QuestionsPage = () => {
  const user = useAppSelector(selectCurrentUser);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {data: questions, isLoading } = useQuery({
    queryKey: ["questions", user?.firebaseUid],
    queryFn: () => questionApi.readAll(user!.token),
    staleTime: Infinity
  });

  const filteredQuestions = questions?.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? q.category === selectedCategory.toUpperCase() : true;

    return matchesSearch && matchesCategory;
  });
  
  return (
    
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      
      <Loader isLoadingLocal={isLoading}/>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          
          <h1 className="text-5xl font-bold text-blue-300">Questions</h1>
          
          <p className="mt-2 text-zinc-400 text-sm">
            Start solving.
          </p>
          
        </motion.div>
    
        <QuestionSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      
        <QuestionCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      
        <QuestionsContainer questions={filteredQuestions} searchQuery={searchQuery} />
    
      </div>
      
    </main>

  );
}

export default ProtectedRoutes(QuestionsPage);