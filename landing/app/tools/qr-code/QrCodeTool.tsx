"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateQrCode, decodeQrCode, QrCodeOptions } from "shared";
import { useState, useRef } from "react";
import { AlertCircle, Check, Copy, Download, HelpCircle, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function QrCodeTool() {
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
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading title="QR Code Tool" description="Generate QR codes from text or decode them from images." />
        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link href="/tools/url-encoder" className="text-primary hover:underline">
            URL Encoder/Decoder
          </Link>
        </div>
        <div className="space-y-6">
          <Tabs defaultValue="generate" value={mode} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
          </Tabs>
          {mode === "generate" ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="qr-input" className="block mb-2">
                  Text / URL
                </Label>
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
                  <Label htmlFor="size" className="block mb-2">
                    Size (px)
                  </Label>
                  <Input
                    id="size"
                    type="number"
                    min={64}
                    max={1024}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-24"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Label>Error Correction</Label>
                    <span
                      title="Higher levels keep data readable even if the QR code is partially damaged"
                      className="inline-flex cursor-help text-muted-foreground"
                    >
                      <HelpCircle className="h-4 w-4 pointer-events-none" />
                    </span>
                  </div>
                  <RadioGroup
                    value={errorCorrection}
                    onValueChange={(v) => setErrorCorrection(v as QrCodeOptions["errorCorrectionLevel"])}
                    className="flex gap-2"
                  >
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="L" id="ec-l" />
                      <Label htmlFor="ec-l">L</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="M" id="ec-m" />
                      <Label htmlFor="ec-m">M</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="Q" id="ec-q" />
                      <Label htmlFor="ec-q">Q</Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <RadioGroupItem value="H" id="ec-h" />
                      <Label htmlFor="ec-h">H</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <Button onClick={handleGenerate} className="w-full">
                Generate QR Code
              </Button>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {qrDataUrl && (
                <div className="flex flex-col items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrDataUrl} alt="QR code" width={size} height={size} />
                  <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
              {decodeResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="decode-output" className="block mb-2">
                      Decoded Text
                    </Label>
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
      </Container>
    </>
  );
}
