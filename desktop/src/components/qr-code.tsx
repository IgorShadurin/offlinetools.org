import { useState, useRef } from "react";
import { Download, AlertCircle, Check, Copy, HelpCircle, QrCode } from "lucide-react";
import { generateQrCode, decodeQrCode, QrCodeOptions } from "shared/qr-code";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface QrCodeToolProps {
  className?: string;
}

export function QrCodeTool({ className = "" }: QrCodeToolProps) {
  const [mode, setMode] = useState<"generate" | "decode">("generate");
  const [textInput, setTextInput] = useState("");
  const [size, setSize] = useState(256);
  const [errorCorrection, setErrorCorrection] = useState<QrCodeOptions["errorCorrectionLevel"]>("M");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [decodeResult, setDecodeResult] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    try {
      const opts: Partial<QrCodeOptions> = {
        width: size,
        margin: 2,
        errorCorrectionLevel: errorCorrection,
      };
      const url = await generateQrCode(textInput, opts);
      setQrDataUrl(url);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setQrDataUrl("");
    }
  };

  const handleDecodeFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const result = await decodeQrCode(reader.result as string);
        setDecodeResult(result);
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setDecodeResult("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleDecodeFile(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(decodeResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qr-code.png";
    a.click();
  };

  const handleTabChange = (value: string) => {
    setMode(value as "generate" | "decode");
    setTextInput("");
    setQrDataUrl("");
    setDecodeResult("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`p-6 h-full flex flex-col space-y-6 ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-2">
        <QrCode className="h-6 w-6" />
        <h1 className="text-2xl font-bold">QR Code Tool</h1>
      </div>
          <div className="space-y-4 flex-1 flex flex-col">
            <Tabs value={mode} onValueChange={handleTabChange} className="w-auto">
              <TabsList className="grid grid-cols-2 w-[200px]">
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="decode">Decode</TabsTrigger>
              </TabsList>
            </Tabs>
            {mode === "generate" ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="qr-input" className="block mb-1 text-sm font-medium">Text / URL</label>
                  <Textarea
                    id="qr-input"
                    className="w-full"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter text to encode"
                  />
                </div>
                <div className="flex flex-wrap gap-4 items-end">
                  <div>
                    <label htmlFor="size" className="block mb-1 text-sm font-medium">Size (px)</label>
                    <input
                      id="size"
                      type="number"
                      min={64}
                      max={1024}
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      className="w-24 border rounded h-8 px-2 text-sm"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1 text-sm font-medium">
                      <label>Error Correction</label>
                      <span
                        title="Higher levels keep data readable even if the QR code is partially damaged"
                        className="inline-flex cursor-help text-muted-foreground"
                      >
                        <HelpCircle className="h-4 w-4 pointer-events-none" />
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {['L','M','Q','H'].map(level => (
                        <label key={level} className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="error-correction"
                            value={level}
                            checked={errorCorrection === level}
                            onChange={(e) => setErrorCorrection(e.target.value as QrCodeOptions["errorCorrectionLevel"])}
                            className="h-4 w-4"
                          />
                          <span>{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <Button onClick={handleGenerate} className="w-full">Generate QR Code</Button>
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {qrDataUrl && (
                  <div className="flex flex-col items-center gap-2">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img src={qrDataUrl} width={size} height={size} />
                    <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleDownload}>
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
                {decodeResult && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="decode-output" className="block mb-1 text-sm font-medium">Decoded Text</label>
                      <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <Textarea id="decode-output" className="w-full h-32" value={decodeResult} readOnly />
                  </div>
                )}
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
    </div>
  );
}

export default QrCodeTool;
