"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { encodeBase64, decodeBase64 } from "shared";
import { useState } from "react";
import { AlertCircle, Check, Copy, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Base64CodecExplanation from "./Base64CodecExplanation";

export default function Base64Codec() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Base64 Encoder/Decoder"
          description="Convert text to Base64 or decode Base64 to plaintext with URL-safe option."
        />

        {/* Related Tools Section */}
        <div className="mt-4 mb-8 flex flex-wrap gap-x-4 gap-y-2 items-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Related Tools:
          </h3>
          <Link
            href="/tools/binary-base64-codec"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
          >
            <LinkIcon size={16} /> Binary Base64 Encoder/Decoder
          </Link>
          <Link
            href="/tools/gzip-codec"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
          >
            <LinkIcon size={16} /> Gzip Codec
          </Link>
        </div>

        <div className="space-y-6">
          {/* Tabs for Encode/Decode */}
          <Tabs defaultValue="encode" className="w-full" value={mode} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* URL-safe option */}
          <div className="flex items-center space-x-2">
            <Switch id="url-safe" checked={urlSafe} onCheckedChange={setUrlSafe} />
            <Label htmlFor="url-safe">URL-safe mode (replace + with - and / with _)</Label>
          </div>

          {/* Headers Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Input Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between">
              <Label htmlFor="input-text">{mode === "encode" ? "Text to encode" : "Base64 to decode"}</Label>
            </div>

            {/* Output Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between h-9">
              <Label htmlFor="output-text">{mode === "encode" ? "Base64 encoded" : "Decoded text"}</Label>
              <div className="min-w-[85px] h-8 flex justify-end">
                {output ? (
                  <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Textareas Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Input Textarea */}
            <div className="w-full md:w-1/2">
              <Textarea
                id="input-text"
                className="min-h-[300px] font-mono w-full"
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Output Textarea */}
            <div className="w-full md:w-1/2">
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <Textarea
                  id="output-text"
                  className="min-h-[300px] font-mono w-full"
                  placeholder={
                    mode === "encode" ? "Encoded Base64 will appear here..." : "Decoded text will appear here..."
                  }
                  value={output}
                  readOnly
                />
              )}
            </div>
          </div>

          {/* Button Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2">
              <Button onClick={handleProcess} className="w-full">
                {mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
              </Button>
            </div>
            <div className="w-full md:w-1/2">{/* Empty space to align with button */}</div>
          </div>
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <Base64CodecExplanation />
      </Container>
    </>
  );
}
