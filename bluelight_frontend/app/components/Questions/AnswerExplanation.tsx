import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator"

interface AnswerExplanationProps {
  isCorrect: boolean | null,
  explanation: string | undefined,
  freeResponseAnswer: string | undefined,
}

export default function AnswerChoices({
  isCorrect,
  explanation,
  freeResponseAnswer
}: AnswerExplanationProps) {
  
  return (
    <>
      <Card
          className={`mt-8 border ${
          isCorrect
              ? "bg-green-600/20 border-green-700/40 text-green-400"
              : "bg-red-600/20 border-red-700/40 text-red-400"
          }`}
      >
        <CardContent>
          
          <div className="text-base font-medium space-y-4">
      
            <div>{freeResponseAnswer}</div>
            <Separator className="bg-white/20 h-[1px] my-2 rounded-full" />
            <div className="text-zinc-200">{explanation}</div>
            
          </div>
          
        </CardContent>
      </Card>
    </>
  )
}