import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Definiamo il tipo delle props
interface CodeBlockProps {
  matrix: number[][];
  language?: string;
}

const handleCopy = async (text: string) => {
  await navigator.clipboard.writeText(text).then(() => {
    toast("Successfully copied to clipboard!");
  });
};

const MatrixLatexCode: React.FC<CodeBlockProps> = ({
  language = "latex",
  matrix,
}) => {
  const latexCode = `M = \\begin{pmatrix}
\t${matrix.map((row) => row.join(" & ")).join(" \\\\ \n\t")}
\\end{pmatrix}`;

  return matrix.length === 0 ? null : (
    <Accordion type="single" collapsible className="m-5">
      <AccordionItem value="item-1">
        <AccordionTrigger>Matrix LaTex Code</AccordionTrigger>
        <AccordionContent>
          <div
            className="border border-gray-100 rounded-md py-0 px-3 relative"
            style={{ backgroundColor: "#fafafa" }}
          >
            <SyntaxHighlighter language={language} style={oneLight}>
              {latexCode}
            </SyntaxHighlighter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 bottom-2"
                    onClick={() => handleCopy(latexCode)}
                  >
                    <Copy />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy LaTeX code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MatrixLatexCode;
