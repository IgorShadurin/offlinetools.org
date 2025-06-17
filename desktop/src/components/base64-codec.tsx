import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, Type } from "lucide-react";
import { encodeBase64, decodeBase64 } from "shared/base64-codec";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

/**
 * Props for the Base64Codec component
 * @interface Base64CodecProps
 */
interface Base64CodecProps {
  className?: string;
}

/**
 * Base64 Encoder/Decoder component
 * @param props - Component props
 * @returns Base64Codec component
 */
export function Base64Codec({ className = "" }: Base64CodecProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);
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
        if (mode === "encode") {
          const result = encodeBase64(clipboardContent, { urlSafe });
          setOutput(result);
        } else {
          // Check if it looks like base64 before auto-decoding
          if (/^[A-Za-z0-9+/=_-]+$/.test(clipboardContent)) {
            const result = decodeBase64(clipboardContent, { urlSafe });
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
        result = encodeBase64(input, { urlSafe });
      } else {
        result = decodeBase64(input, { urlSafe });
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
        <Type className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Base64 String</h1>
      </div>
          {/* Mode Tabs */}
          <Tabs value={mode} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* URL-safe option */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="url-safe"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="url-safe" className="text-sm cursor-pointer">
              URL-safe mode (replace + with - and / with _)
            </label>
          </div>

          {/* Main Content - Horizontal Layout */}
          <div className="flex gap-4 flex-1">
            {/* Input Section */}
            <div className="flex-1 flex flex-col space-y-4">
              <div className="space-y-2 flex-1 flex flex-col">
                <label htmlFor="input-text" className="text-sm font-medium">
                  {mode === "encode" ? "Text to encode" : "Base64 to decode"}
                </label>
                <Textarea
                  id="input-text"
                  className="flex-1 min-h-[320px] font-mono text-sm resize-none"
                  placeholder={
                    mode === "encode"
                      ? "Enter text to encode..."
                      : "Enter Base64 to decode..."
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleProcess} 
                className="w-full h-12 text-base"
                disabled={!input}
              >
                {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
              </Button>
            </div>

            {/* Output Section */}
            <div className="flex-1 flex flex-col space-y-4">
              <div className="space-y-2 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <label htmlFor="output-text" className="text-sm font-medium">
                    Output
                  </label>
                  {output && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={handleCopy}
                      disabled={!output}
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  )}
                </div>
                
                {error ? (
                  <div className="flex items-center justify-center flex-1 min-h-[320px] border rounded-lg border-red-200 bg-red-50 dark:bg-red-950/50 dark:border-red-800">
                    <div className="text-center text-red-700 dark:text-red-300">
                      <div className="flex items-center gap-2 justify-center mb-2">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-medium">Error</span>
                      </div>
                      <div className="text-sm">{error}</div>
                    </div>
                  </div>
                ) : (
                  <Textarea
                    id="output-text"
                    className="flex-1 min-h-[320px] font-mono text-sm resize-none"
                    placeholder={
                      mode === "encode"
                        ? "Encoded Base64 will appear here..."
                        : "Decoded text will appear here..."
                    }
                    value={output}
                    readOnly
                  />
                )}
              </div>
                         </div>
           </div>
    </div>
  );
}
