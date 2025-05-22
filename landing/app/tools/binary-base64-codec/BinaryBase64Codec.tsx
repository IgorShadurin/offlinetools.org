"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Check, Copy, Download, FileUp, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { encodeBinaryBase64, decodeBinaryBase64 } from "shared";
import { useState, useRef, ChangeEvent } from "react";
import Link from "next/link";
import BinaryBase64CodecExplanation from "./BinaryBase64CodecExplanation";

export default function BinaryBase64Codec() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileType, setFileType] = useState<string>("");
  const [base64Output, setBase64Output] = useState<string>("");
  const [binaryData, setBinaryData] = useState<Uint8Array | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);
    setFileType(file.type || "application/octet-stream");
    setError(null);
    setIsProcessed(false);

    if (mode === "encode") {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result instanceof ArrayBuffer) {
          setBinaryData(new Uint8Array(event.target.result));
          setBase64Output("");
        }
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleBase64Input = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBase64Output(e.target.value);
    setIsProcessed(false);
    setError(null);
  };

  const handleEncode = () => {
    try {
      if (!binaryData) {
        setError("No file selected");
        return;
      }

      const encoded = encodeBinaryBase64(binaryData, { urlSafe });
      setBase64Output(encoded);
      setIsProcessed(true);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setBase64Output("");
    }
  };

  const handleDecode = () => {
    try {
      if (!base64Output) {
        setError("No Base64 input provided");
        return;
      }

      const decoded = decodeBinaryBase64(base64Output, { urlSafe });
      setBinaryData(decoded);
      setIsProcessed(true);
      setError(null);

      // Generate a default file name if encoding from text area
      if (!fileName) {
        setFileName("decoded-file.bin");
        setFileType("application/octet-stream");
        setFileSize(decoded.length);
      }
    } catch (error) {
      setError((error as Error).message);
      setBinaryData(null);
    }
  };

  const handleProcess = () => {
    if (mode === "encode") {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleCopy = () => {
    if (textAreaRef.current) {
      navigator.clipboard.writeText(textAreaRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!binaryData) return;

    const blob = new Blob([binaryData], { type: fileType || "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "decoded-file.bin";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTabChange = (value: string) => {
    setMode(value as "encode" | "decode");
    setBase64Output("");
    setBinaryData(null);
    setFileName("");
    setFileSize(0);
    setFileType("");
    setError(null);
    setIsProcessed(false);

    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Binary Base64 Encoder/Decoder"
          description="Convert binary files to Base64 or decode Base64 to binary files."
        />

        {/* Related Tools Section */}
        <div className="mt-4 mb-8 flex flex-wrap gap-x-4 gap-y-2 items-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Related Tools:
          </h3>
          <Link
            href="/tools/base64-codec"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400 flex items-center gap-1"
          >
            <LinkIcon size={16} /> Text Base64 Encoder/Decoder
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
              <TabsTrigger value="encode">File to Base64</TabsTrigger>
              <TabsTrigger value="decode">Base64 to File</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* URL-safe option */}
          <div className="flex items-center space-x-2">
            <Switch id="url-safe" checked={urlSafe} onCheckedChange={setUrlSafe} />
            <Label htmlFor="url-safe">URL-safe mode (replace + with - and / with _)</Label>
          </div>

          {mode === "encode" ? (
            /* File Upload Section */
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" id="file-upload" />
                <Label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                  <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-lg font-medium mb-1">{fileName ? fileName : "Choose a file"}</span>
                  <span className="text-sm text-muted-foreground">
                    {fileName ? `${formatSize(fileSize)}${fileType ? ` • ${fileType}` : ""}` : "or drag and drop here"}
                  </span>
                </Label>
              </div>

              {/* Process Button */}
              <Button onClick={handleProcess} className="w-full" disabled={!binaryData}>
                Convert to Base64
              </Button>

              {/* Output Section */}
              {isProcessed && base64Output && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="base64-output">Base64 Encoded Output</Label>
                    <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <textarea
                    ref={textAreaRef}
                    id="base64-output"
                    className="w-full h-64 rounded border p-2 font-mono text-sm"
                    value={base64Output}
                    readOnly
                  />
                </div>
              )}

              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            /* Base64 Decode Section */
            <div className="space-y-6">
              <div>
                <Label htmlFor="base64-input">Base64 Input</Label>
                <textarea
                  id="base64-input"
                  className="w-full h-64 rounded border p-2 font-mono text-sm mt-2"
                  placeholder="Paste Base64 encoded data here..."
                  value={base64Output}
                  onChange={handleBase64Input}
                />
              </div>

              {/* Process Button */}
              <Button onClick={handleProcess} className="w-full" disabled={!base64Output}>
                Decode to File
              </Button>

              {/* Output Section */}
              {isProcessed && binaryData && (
                <div className="space-y-4">
                  <div className="border rounded p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">Decoded File</h3>
                        <p className="text-sm text-muted-foreground">
                          {fileName} • {formatSize(fileSize)}
                        </p>
                      </div>
                      <Button variant="outline" className="flex items-center gap-1" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>The file is ready for download. Click the button above to save it.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <BinaryBase64CodecExplanation />
      </Container>
    </>
  );
}
