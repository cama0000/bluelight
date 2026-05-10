import { Card, CardContent } from "@/components/ui/card"
import { Question } from "@/types/question"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface QuestionProps{
    question: Question
};

const CodeSnippet = ({question}: QuestionProps) => {
    return(
        <Card className="bg-zinc-900/80 border border-zinc-800 shadow-lg rounded-2xl mb-8">
            <CardContent>
                <SyntaxHighlighter 
                language={question.language?.toLowerCase()}
                style={oneDark} 
                showLineNumbers
                customStyle={{
                    backgroundColor: "transparent",
                    padding: "0.75rem",
                    fontSize: "0.9rem",
                }}
                codeTagProps={{
                    style: { fontFamily: "monospace" },
                }}
                className="rounded-xl mt-4">
                    {question.codeSnippet || ""}
                </SyntaxHighlighter>
            </CardContent>
        </Card>
    )
};

export default CodeSnippet;