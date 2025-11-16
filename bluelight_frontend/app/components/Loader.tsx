import { Card, CardContent } from "@/components/ui/card"
import { Question } from "@/types/question"
import { MoonLoader } from "react-spinners";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Loader = () => {
    return(
        <div className="flex items-center justify-center min-h-screen bg-black">
            <MoonLoader color="#00f7ff" size={60} />
        </div>
    )
};

export default Loader;