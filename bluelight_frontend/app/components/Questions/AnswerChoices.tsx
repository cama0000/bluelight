import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"

interface AnswerChoicesProps {
  answerChoices: string[],
  answerIndex: number | undefined,
  selectedAnswer: number | null,
  isCorrect: boolean | null,
  hasAnsweredCorrect: boolean | undefined,
  handleAnswerSelect: (index: number) => Promise<void>
}

export default function AnswerChoices({
  answerChoices,
  answerIndex,
  selectedAnswer,
  isCorrect,
  hasAnsweredCorrect,
  handleAnswerSelect
}: AnswerChoicesProps) {
  const baseClasses = "w-full justify-start text-left text-base rounded-xl border transition-all duration-200";
  
  const defaultClasses = "bg-transparent border-zinc-800 text-zinc-300 hover:text-blue-400 hover:bg-zinc-800/50";

  const correctClasses = "bg-green-600/20 border-green-700/40 text-green-400";
  
  const wrongClasses = "bg-red-600/20 border-red-700/40 text-red-400";
  
  return (
    <>
      <CardContent className="mt-4 space-y-3">
  
      {answerChoices.map((choice, index) => {
        const isSelected = selectedAnswer === index;
        const isChoiceCorrect = answerIndex === index;
    
        let finalClasses = defaultClasses;
    
        if (selectedAnswer !== null) {
          if ((isSelected && isCorrect) || (hasAnsweredCorrect && isChoiceCorrect)) {
            finalClasses = correctClasses + " pointer-events-none";
          } else if (isSelected && !isCorrect) {
            finalClasses = wrongClasses + " pointer-events-none";
          } else if (!isSelected && !isCorrect && isChoiceCorrect) {
            finalClasses = correctClasses + " pointer-events-none";
          } else {
            finalClasses = "opacity-60 pointer-events-none";
          }
        }
    
        return (
          <Button
            key={index}
            onClick={() => {
              if (selectedAnswer === null) {
                handleAnswerSelect(index);
              }
            }}
            variant="outline"
            className={`${baseClasses} ${finalClasses}`}
          >
            
            <span
              className={`font-medium mr-3 ${
              selectedAnswer !== null
                ? isChoiceCorrect
                ? "text-green-400"
                  : isSelected
                ? "text-red-400"
                  : "text-zinc-500"
                  : "text-zinc-500"
              }`}
            >
              {String.fromCharCode(65 + index)}.
            </span>
            
              {choice}
          </Button>
            
        );
      })}
  
      </CardContent>
    </>
  )
}