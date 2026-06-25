import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface FreeResponseFormProps {
  response: string,
  isCorrect: boolean | null,
  setResponse: React.Dispatch<React.SetStateAction<string>>,
  handleFreeResponseSubmit: () => Promise<void>
}

export default function FreeResponseForm({ response, isCorrect, setResponse, handleFreeResponseSubmit }: FreeResponseFormProps) {
  return (
    <>
    <CardContent className="mt-1 space-y-6">
        <div className="space-y-4">
            <Input
            id="response"
            type="text"
            placeholder="Enter your response..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus-visible:ring-blue-500"
            />
        </div>

        {isCorrect === null && (
            <div className="flex justify-center">
                <Button
                onClick={handleFreeResponseSubmit}
                className="w-1/8 bg-blue-600 hover:bg-blue-500 transition-all hover:cursor-pointer"
                >
                    Submit
                </Button>
            </div>
        )}
      </CardContent>
    </>

  )
}