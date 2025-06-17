"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, FileUp, Download, Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  embedTextInImage,
  extractTextFromImage,
  validateImageFile,
  type SteganographyOptions,
  type EmbedResult,
  type ExtractResult,
} from "shared";
import { useState, useRef, ChangeEvent, useCallback } from "react";

export default function SteganographyTool() {
  const [activeTab, setActiveTab] = useState<"embed" | "extract">("embed");
  
  const [embedImageFile, setEmbedImageFile] = useState<File | null>(null);
  const [embedText, setEmbedText] = useState("");
  const [embedPassword, setEmbedPassword] = useState("");
  const [showEmbedPassword, setShowEmbedPassword] = useState(false);
  const [embedResult, setEmbedResult] = useState<EmbedResult | null>(null);
  const [isEmbedding, setIsEmbedding] = useState(false);
  const [embedError, setEmbedError] = useState<string | null>(null);
  
  const [extractImageFile, setExtractImageFile] = useState<File | null>(null);
  const [extractPassword, setExtractPassword] = useState("");
  const [showExtractPassword, setShowExtractPassword] = useState(false);
  const [extractResult, setExtractResult] = useState<ExtractResult | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);

  const embedImageInputRef = useRef<HTMLInputElement>(null);
  const extractImageInputRef = useRef<HTMLInputElement>(null);

  const handleEmbedImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setEmbedError(validation.error || "Invalid image file");
      return;
    }

    setEmbedImageFile(file);
    setEmbedError(null);
    setEmbedResult(null);
  }, []);

  const handleExtractImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setExtractError(validation.error || "Invalid image file");
      return;
    }

    setExtractImageFile(file);
    setExtractError(null);
    setExtractResult(null);
  }, []);

  const handleEmbedTextChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setEmbedText(text);
    setEmbedError(null);
    setEmbedResult(null);
  }, []);

  const handleEmbed = useCallback(async () => {
    if (!embedImageFile || !embedText.trim()) {
      setEmbedError("Please select an image and enter text to embed");
      return;
    }

    setIsEmbedding(true);
    setEmbedError(null);

    try {
      const options: SteganographyOptions = {
        password: embedPassword || undefined,
        quality: 0.9,
      };

      const result = await embedTextInImage(embedImageFile, embedText, options);
      setEmbedResult(result);

      if (!result.success) {
        setEmbedError(result.error || "Failed to embed text in image");
      }
    } catch (error) {
      setEmbedError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsEmbedding(false);
    }
  }, [embedImageFile, embedText, embedPassword]);

  const handleExtract = useCallback(async () => {
    if (!extractImageFile) {
      setExtractError("Please select an image to extract text from");
      return;
    }

    setIsExtracting(true);
    setExtractError(null);

    try {
      const options: SteganographyOptions = {
        password: extractPassword || undefined,
      };

      const result = await extractTextFromImage(extractImageFile, options);
      setExtractResult(result);

      if (!result.success) {
        setExtractError(result.error || "Failed to extract text from image");
      }
    } catch (error) {
      setExtractError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsExtracting(false);
    }
  }, [extractImageFile, extractPassword]);

  const handleDownload = useCallback(() => {
    if (!embedResult?.success || !embedResult.data) return;

    const url = URL.createObjectURL(embedResult.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = embedResult.steganographyFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [embedResult]);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Container className="py-8">
      <SectionHeading
        title="Steganography Tool"
        description="Hide any text securely within images using advanced steganography techniques. All processing happens locally in your browser for maximum security."
      />

      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "embed" | "extract")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="embed" className="flex items-center gap-2">
              <Lock size={16} />
              Embed Text
            </TabsTrigger>
            <TabsTrigger value="extract" className="flex items-center gap-2">
              <Unlock size={16} />
              Extract Text
            </TabsTrigger>
          </TabsList>

          <TabsContent value="embed" className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="embed-image">Select Image</Label>
                  <div className="mt-2">
                    <input
                      ref={embedImageInputRef}
                      id="embed-image"
                      type="file"
                      accept="image/*"
                      onChange={handleEmbedImageChange}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => embedImageInputRef.current?.click()}
                      className="w-full h-32 border-dashed"
                    >
                      <div className="text-center">
                        <FileUp className="mx-auto h-8 w-8 mb-2" />
                        <p className="text-sm">
                          {embedImageFile ? embedImageFile.name : "Click to select image"}
                        </p>
                        {embedImageFile && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatFileSize(embedImageFile.size)}
                          </p>
                        )}
                      </div>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="embed-text">Text to Hide</Label>
                  <Textarea
                    id="embed-text"
                    placeholder="Enter any text you want to hide in the image..."
                    value={embedText}
                    onChange={handleEmbedTextChange}
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="embed-password">Password (Optional)</Label>
                <div className="relative mt-2">
                  <Input
                    id="embed-password"
                    type={showEmbedPassword ? "text" : "password"}
                    placeholder="Enter password for encryption..."
                    value={embedPassword}
                    onChange={(e) => setEmbedPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowEmbedPassword(!showEmbedPassword)}
                  >
                    {showEmbedPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              {embedError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{embedError}</AlertDescription>
                </Alert>
              )}

              {embedResult?.success && (
                <Alert>
                  <Download className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Text has been successfully embedded in the image.
                  </AlertDescription>
                </Alert>
              )}

              {embedResult?.success && embedResult.data && (
                <div className="space-y-2">
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Steganography Image
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    File: {embedResult.steganographyFileName}
                  </p>
                </div>
              )}

              <Button
                onClick={handleEmbed}
                disabled={!embedImageFile || !embedText.trim() || isEmbedding}
                className="w-full"
              >
                {isEmbedding ? "Embedding..." : "Embed Text in Image"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="extract" className="space-y-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="extract-image">Select Image</Label>
                  <div className="mt-2">
                    <input
                      ref={extractImageInputRef}
                      id="extract-image"
                      type="file"
                      accept="image/*"
                      onChange={handleExtractImageChange}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => extractImageInputRef.current?.click()}
                      className="w-full h-32 border-dashed"
                    >
                      <div className="text-center">
                        <FileUp className="mx-auto h-8 w-8 mb-2" />
                        <p className="text-sm">
                          {extractImageFile ? extractImageFile.name : "Click to select image"}
                        </p>
                        {extractImageFile && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatFileSize(extractImageFile.size)}
                          </p>
                        )}
                      </div>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="extract-password">Password (If Used)</Label>
                  <div className="relative mt-2">
                    <Input
                      id="extract-password"
                      type={showExtractPassword ? "text" : "password"}
                      placeholder="Enter password if text was encrypted..."
                      value={extractPassword}
                      onChange={(e) => setExtractPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowExtractPassword(!showExtractPassword)}
                    >
                      {showExtractPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
              </div>

              {extractError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{extractError}</AlertDescription>
                </Alert>
              )}

              {extractResult?.success && extractResult.data && (
                <div className="space-y-4">
                  <Alert>
                    <Unlock className="h-4 w-4" />
                    <AlertTitle>Text Extracted Successfully!</AlertTitle>
                    <AlertDescription>
                      The hidden text has been extracted from the image.
                    </AlertDescription>
                  </Alert>

                  <div>
                    <Label htmlFor="extracted-text">Extracted Text</Label>
                    <Textarea
                      id="extracted-text"
                      value={extractResult.data}
                      readOnly
                      className="mt-2 min-h-[120px] font-mono"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(extractResult.data!)}
                      className="mt-2 w-full"
                    >
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={handleExtract}
                disabled={!extractImageFile || isExtracting}
                className="w-full"
              >
                {isExtracting ? "Extracting..." : "Extract Text from Image"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-4">How Steganography Works</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>Steganography</strong> is the practice of hiding information within other non-secret data. 
              This tool uses the LSB (Least Significant Bit) method to embed text into image pixels.
            </p>
            <p>
              <strong>Security:</strong> All processing happens locally in your browser. Your images and text never leave your device.
            </p>
            <p>
              <strong>Password Protection:</strong> When you provide a password, your text is encrypted using AES encryption before being embedded.
            </p>
            <p>
              <strong>Text Hiding:</strong> This tool can hide any text content within images, from passwords to private notes.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
