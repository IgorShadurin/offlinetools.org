import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, Link2Icon } from "lucide-react";
import { encodeUrl, decodeUrl } from "shared/url-encoder";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

/**
 * Props for the UrlEncoder component
 * @interface UrlEncoderProps
 */
interface UrlEncoderProps {
  className?: string;
}

/**
 * URL Encoder/Decoder component
 * @param props - Component props
 * @returns UrlEncoder component
 */
export function UrlEncoder({ className = "" }: UrlEncoderProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [useEscapeUnescape, setUseEscapeUnescape] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Check for clipboard content when component mounts
  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      setInput(clipboardContent);
      // Clear the stored content after using it
      localStorage.removeItem('clipboard-content-for-tool');
      
      // Auto process if there's content
      try {
        let result = "";
        if (mode === "encode") {
          result = encodeUrl(clipboardContent, { useEscapeUnescape });
          setOutput(result);
        } else {
          // Check if it looks like a URL-encoded string before auto-decoding
          if (clipboardContent.includes('%') || /^https?:\/\//.test(clipboardContent)) {
            result = decodeUrl(clipboardContent, { useEscapeUnescape });
            setOutput(result);
          }
        }
        setError(null);
      } catch (error) {
        // Don't set error on auto-process, just don't auto-process
      }
    }
  }, []);

  const handleProcess = () => {
    try {
      let result = "";

      if (mode === "encode") {
        result = encodeUrl(input, { useEscapeUnescape });
      } else {
        result = decodeUrl(input, { useEscapeUnescape });
      }

      setOutput(result);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabChange = (value: string) => {
    setMode(value as "encode" | "decode");
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className={`p-6 h-full flex flex-col space-y-6 ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-2">
        <Link2Icon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">URL Encoder/Decoder</h1>
      </div>
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Top Section: Mode Selector and Encoding Method */}
            <div className="flex flex-row justify-between items-center">
              {/* Mode Selector */}
              <Tabs
                value={mode}
                onValueChange={handleTabChange}
                className="w-auto"
              >
                <TabsList className="grid grid-cols-2 w-[200px]">
                  <TabsTrigger value="encode">Encode</TabsTrigger>
                  <TabsTrigger value="decode">Decode</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Encoding Method Option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="escape-unescape"
                  checked={useEscapeUnescape}
                  onChange={(e) => setUseEscapeUnescape(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="escape-unescape" className="text-sm">
                  Use legacy method (escape/unescape)
                </label>
              </div>
            </div>

            {/* Input Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-1 flex justify-between">
                <label htmlFor="input-text" className="text-sm font-medium">
                  {mode === "encode"
                    ? "Text to encode"
                    : "URL encoded text to decode"}
                </label>
              </div>
              <Textarea
                id="input-text"
                className="flex-1 min-h-[150px] font-mono"
                placeholder={
                  mode === "encode"
                    ? "Enter text to encode..."
                    : "Enter URL encoded text to decode..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Process Button */}
            <div className="flex justify-end my-2">
              <Button onClick={handleProcess} size="default">
                {mode === "encode" ? "Encode URL" : "Decode URL"}
              </Button>
            </div>

            {/* Output Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-1 flex justify-between">
                <label htmlFor="output-text" className="text-sm font-medium">
                  {mode === "encode" ? "URL encoded" : "Decoded text"}
                </label>
                {output && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 h-7 px-2 text-xs"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                )}
              </div>

              {error ? (
                <div className="rounded-md bg-destructive/15 p-3 text-destructive">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <div className="font-medium">Error</div>
                  </div>
                  <div className="mt-2 text-sm">{error}</div>
                </div>
              ) : (
                <Textarea
                  id="output-text"
                  className="flex-1 min-h-[150px] font-mono"
                  placeholder={
                    mode === "encode"
                      ? "Encoded URL will appear here..."
                      : "Decoded text will appear here..."
                  }
                  value={output}
                  readOnly
                />
              )}
            </div>
          </div>
    </div>
  );
}
