import { useState, useEffect } from "react";
import { Check, Copy, Hash } from "lucide-react";
import { textToSlug, SeparatorType, TextToSlugOptions } from "shared/text-to-slug";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

/**
 * Props for the TextToSlug component
 * @interface TextToSlugProps
 */
interface TextToSlugProps {
  className?: string;
}

/**
 * Text to Slug converter component
 * @param props - Component props
 * @returns TextToSlug component
 */
export function TextToSlug({ className = "" }: TextToSlugProps) {
  const [inputText, setInputText] = useState("");
  const [outputSlug, setOutputSlug] = useState("");
  const [separator, setSeparator] = useState<SeparatorType>(SeparatorType.DASH);
  const [lowercase, setLowercase] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [strict, setStrict] = useState(true);
  const [copied, setCopied] = useState(false);

  // Check for clipboard content when component mounts
  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      setInputText(clipboardContent);
      // Clear the stored content after using it
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, []);

  /**
   * Generate slug from input text
   */
  const handleGenerate = () => {
    const options: TextToSlugOptions = {
      separator,
      lowercase,
      removeNumbers,
      removeStopWords,
      strict,
    };

    const result = textToSlug(inputText, options);
    setOutputSlug(result);
  };

  /**
   * Copy output to clipboard
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(outputSlug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 h-full flex flex-col space-y-4 ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-2">
        <Hash className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Text to Slug</h1>
      </div>

      {/* Text Areas - Horizontal Layout */}
      <div className="flex gap-4 flex-1">
        {/* Input Section */}
        <div className="flex-1 flex flex-col min-h-0">
          <label htmlFor="input-text" className="text-sm font-medium mb-2">
            Input Text
          </label>
          <Textarea
            id="input-text"
            className="flex-1 resize-none"
            placeholder="Enter your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="output-slug" className="text-sm font-medium">
              Generated Slug
            </label>
            {outputSlug && (
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <Textarea
            id="output-slug"
            className="flex-1 font-mono resize-none"
            placeholder="Generated slug will appear here..."
            value={outputSlug}
            readOnly
          />
        </div>
      </div>

      {/* Generate Button - Full Width */}
      <Button 
        onClick={handleGenerate} 
        className="w-full h-12 text-base"
        disabled={!inputText}
      >
        Generate Slug
      </Button>

      {/* Options - All on one line */}
      <div className="flex flex-wrap items-center gap-6 text-sm">
        {/* Separator Options */}
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700 dark:text-gray-300">Separator:</span>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="dash"
              name="separator"
              value={SeparatorType.DASH}
              checked={separator === SeparatorType.DASH}
              onChange={(e) => setSeparator(e.target.value as SeparatorType)}
              className="h-4 w-4"
            />
            <label htmlFor="dash" className="cursor-pointer">
              Dash (-)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="underscore"
              name="separator"
              value={SeparatorType.UNDERSCORE}
              checked={separator === SeparatorType.UNDERSCORE}
              onChange={(e) => setSeparator(e.target.value as SeparatorType)}
              className="h-4 w-4"
            />
            <label htmlFor="underscore" className="cursor-pointer">
              Underscore (_)
            </label>
          </div>
        </div>

        {/* Processing Options */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="lowercase"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="lowercase" className="cursor-pointer">
            Lowercase
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remove-numbers"
            checked={removeNumbers}
            onChange={(e) => setRemoveNumbers(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="remove-numbers" className="cursor-pointer">
            Remove numbers
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remove-stop-words"
            checked={removeStopWords}
            onChange={(e) => setRemoveStopWords(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="remove-stop-words" className="cursor-pointer">
            Remove stop words
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="strict"
            checked={strict}
            onChange={(e) => setStrict(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="strict" className="cursor-pointer">
            Strict mode
          </label>
        </div>
      </div>
    </div>
  );
} 