import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { encodeBase64, decodeBase64 } from "shared/base64-codec";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Base64 Encoder/Decoder</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Top Section: Mode Selector and URL-safe option */}
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

              {/* URL-safe option */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="url-safe"
                  checked={urlSafe}
                  onChange={(e) => setUrlSafe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="url-safe" className="text-sm">
                  URL-safe mode (replace + with - and / with _)
                </label>
              </div>
            </div>

            {/* Input Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-1 flex justify-between">
                <label htmlFor="input-text" className="text-sm font-medium">
                  {mode === "encode" ? "Text to encode" : "Base64 to decode"}
                </label>
              </div>
              <Textarea
                id="input-text"
                className="flex-1 min-h-[150px] font-mono"
                placeholder={
                  mode === "encode"
                    ? "Enter text to encode..."
                    : "Enter Base64 to decode..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Process Button */}
            <div className="flex justify-end my-2">
              <Button onClick={handleProcess} size="default">
                {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
              </Button>
            </div>

            {/* Output Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-1 flex justify-between">
                <label htmlFor="output-text" className="text-sm font-medium">
                  {mode === "encode" ? "Base64 encoded" : "Decoded text"}
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
                      ? "Encoded Base64 will appear here..."
                      : "Decoded text will appear here..."
                  }
                  value={output}
                  readOnly
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
