import { useState, useRef, useEffect } from "react";
import { AlertCircle, Check, Copy, Download, Upload, FileUp } from "lucide-react";
import { 
  encodeBinaryBase64, 
  decodeBinaryBase64,
  BinaryBase64Options 
} from "shared/binary-base64-codec";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";

/**
 * Props for the BinaryBase64Codec component
 * @interface BinaryBase64CodecProps
 */
interface BinaryBase64CodecProps {
  className?: string;
}

/**
 * Binary Base64 Codec component for converting binary files to Base64 and vice versa
 * @param props - Component props
 * @returns BinaryBase64Codec component
 */
export function BinaryBase64Codec({ className = "" }: BinaryBase64CodecProps) {
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
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Check for clipboard content when component mounts
  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent && mode === "decode") {
      setBase64Output(clipboardContent);
      // Clear the stored content after using it
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, [mode]);

  /**
   * Format file size in human readable format
   * @param bytes - File size in bytes
   * @returns Formatted size string
   */
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  /**
   * Handle file selection
   * @param event - File input change event
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

  /**
   * Handle Base64 text input
   * @param event - Textarea change event
   */
  const handleBase64Input = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBase64Output(event.target.value);
    setIsProcessed(false);
    setError(null);
  };

  /**
   * Handle encoding binary to Base64
   */
  const handleEncode = async () => {
    setIsProcessing(true);
    try {
      if (!binaryData) {
        setError("No file selected");
        return;
      }

      const options: BinaryBase64Options = { urlSafe };
      const encoded = encodeBinaryBase64(binaryData, options);
      setBase64Output(encoded);
      setIsProcessed(true);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setBase64Output("");
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Handle decoding Base64 to binary
   */
  const handleDecode = async () => {
    setIsProcessing(true);
    try {
      if (!base64Output) {
        setError("No Base64 input provided");
        return;
      }

      const options: BinaryBase64Options = { urlSafe };
      const decoded = decodeBinaryBase64(base64Output, options);
      setBinaryData(decoded);
      setIsProcessed(true);
      setError(null);

      // Generate a default file name if decoding from text area
      if (!fileName) {
        setFileName("decoded-file.bin");
        setFileType("application/octet-stream");
        setFileSize(decoded.length);
      }
    } catch (error) {
      setError((error as Error).message);
      setBinaryData(null);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Handle processing (encode or decode)
   */
  const handleProcess = async () => {
    if (mode === "encode") {
      await handleEncode();
    } else {
      await handleDecode();
    }
  };

  /**
   * Copy Base64 output to clipboard
   */
  const handleCopy = () => {
    if (base64Output) {
      navigator.clipboard.writeText(base64Output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /**
   * Download decoded binary file
   */
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

  /**
   * Handle tab change (encode/decode)
   * @param value - New tab value
   */
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

  return (
    <div className={`p-6 h-full flex flex-col space-y-6 ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-2">
        <FileUp className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Base64 Binary</h1>
      </div>
          {/* Mode Tabs */}
          <Tabs value={mode} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="encode">File to Base64</TabsTrigger>
              <TabsTrigger value="decode">Base64 to File</TabsTrigger>
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
            <Label htmlFor="url-safe" className="text-sm cursor-pointer">
              URL-safe mode (replace + with - and / with _)
            </Label>
          </div>

          {/* Main Content */}
          <div className="flex gap-4 flex-1">
            {mode === "encode" ? (
              /* Encode Mode: File Upload */
              <div className="flex-1 flex flex-col space-y-4">
                <div className="space-y-2 flex-1 flex flex-col">
                  <Label htmlFor="file-upload">Select File</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center flex-1 min-h-[320px] flex items-center justify-center">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      id="file-upload" 
                    />
                    <Label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                      <FileUp className="h-12 w-12 text-gray-400 mb-3" />
                      <span className="font-medium mb-2 text-lg">
                        {fileName ? fileName : "Choose a file"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {fileName 
                          ? `${formatSize(fileSize)}${fileType ? ` • ${fileType}` : ""}` 
                          : "Click to browse or drag and drop"
                        }
                      </span>
                    </Label>
                  </div>
                </div>

                <Button 
                  onClick={handleProcess} 
                  className="w-full h-12 text-base" 
                  disabled={!binaryData || isProcessing}
                >
                  {isProcessing ? "Converting..." : "Convert to Base64"}
                </Button>
              </div>
            ) : (
              /* Decode Mode: Base64 Input */
              <div className="flex-1 flex flex-col space-y-4">
                <div className="space-y-2 flex-1 flex flex-col">
                  <Label htmlFor="base64-input">Base64 Input</Label>
                  <Textarea
                    id="base64-input"
                    className="flex-1 min-h-[320px] font-mono text-sm resize-none"
                    placeholder="Paste Base64 encoded data here..."
                    value={base64Output}
                    onChange={handleBase64Input}
                  />
                </div>

                <Button 
                  onClick={handleProcess} 
                  className="w-full h-12 text-base" 
                  disabled={!base64Output || isProcessing}
                >
                  {isProcessing ? "Converting..." : "Convert to File"}
                </Button>
              </div>
            )}

            {/* Output Section */}
            <div className="flex-1 flex flex-col space-y-4">
              {mode === "encode" && isProcessed && base64Output ? (
                /* Base64 Output */
                <>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="base64-output">Output</Label>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-1" 
                        onClick={handleCopy}
                        disabled={!base64Output}
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <Textarea
                      ref={textAreaRef}
                      id="base64-output"
                      className="flex-1 min-h-[320px] font-mono text-sm resize-none"
                      value={base64Output}
                      readOnly
                    />
                  </div>
                </>
              ) : mode === "decode" && isProcessed && binaryData ? (
                /* File Download */
                <>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <Label>Output</Label>
                    <div className="border rounded-lg p-6 space-y-4 flex-1 min-h-[320px] flex flex-col justify-center">
                      <div className="text-center">
                        <div className="text-lg font-medium mb-2">{fileName}</div>
                        <div className="text-muted-foreground mb-4">
                          {formatSize(fileSize)} • {fileType}
                        </div>
                        <Button 
                          onClick={handleDownload} 
                          className="w-full h-12 text-base flex items-center gap-2"
                          disabled={!binaryData}
                        >
                          <Download className="h-5 w-5" />
                          Download File
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <Label>Output</Label>
                    <div className="flex items-center justify-center flex-1 min-h-[320px] border rounded-lg border-dashed">
                      <div className="text-center text-muted-foreground">
                        <div className="text-base">
                          {mode === "encode" 
                            ? "Select a file to see Base64 output" 
                            : "Enter Base64 data to decode to file"
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/50 dark:border-red-800">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
            </div>
          )}
    </div>
  );
} 