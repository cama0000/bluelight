
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/types/question';
import { Link } from 'lucide-react';
import React from 'react';

interface CompletedQuestionsProps {
  questions: Question[];
}

const CompletedQuestions = ({ questions }: CompletedQuestionsProps) => {
  return (
    <Card className="bg-zinc-900/80 border border-zinc-800 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl text-blue-300 underline">
          Completed
        </CardTitle>
      </CardHeader>
      <CardContent>
        {questions.length === 0 ? (
          <p className="text-zinc-400">No completed questions.</p>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {questions.map((q) => (
              
              <li
                key={q.id}
                className="py-3 flex justify-between items-center text-zinc-300"
              >
                <Link
                  href={`/questions/${encodeURIComponent(
                    q.id,
                  )}/${encodeURIComponent(q.title)}`}
                >
                  <span className="font-medium hover:cursor-pointer hover:text-blue-400 hover:underline">
                    w
                  </span>
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
  );
};

export default CompletedQuestions;
