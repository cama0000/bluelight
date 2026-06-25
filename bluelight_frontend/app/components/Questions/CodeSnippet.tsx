import { Card, CardContent } from "@/components/ui/card"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface QuestionProps{
  codeSnippet: string | undefined,
  language: string | undefined,
};

const CodeSnippet = ({codeSnippet, language}: QuestionProps) => {
  return(
    <Card className="bg-zinc-900/80 border border-zinc-800 shadow-lg rounded-2xl mb-8">
      <CardContent>
          <SyntaxHighlighter 
            language={language}
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
                {codeSnippet || ""}
          </SyntaxHighlighter>
      </CardContent>
    </Card>
  )
};

export default CodeSnippet;