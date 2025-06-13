"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { Check, Copy, Download, Link as LinkIcon, AlertCircle } from "lucide-react";
import Link from "next/link";
import { resizeImage, ImageResizeOptions, DEFAULT_IMAGE_RESIZE_OPTIONS } from "shared";

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<string>("100");
  const [height, setHeight] = useState<string>("100");
  const [keepAspect, setKeepAspect] = useState(true);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleResize = async () => {
    if (!file) return;
    try {
      const options: ImageResizeOptions = {
        width: parseInt(width, 10) || DEFAULT_IMAGE_RESIZE_OPTIONS.width,
        height: parseInt(height, 10) || DEFAULT_IMAGE_RESIZE_OPTIONS.height,
        keepAspectRatio: keepAspect,
        type: DEFAULT_IMAGE_RESIZE_OPTIONS.type,
        quality: DEFAULT_IMAGE_RESIZE_OPTIONS.quality,
      };
      const blob = await resizeImage(file, options);
      const url = URL.createObjectURL(blob);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(url);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutputUrl(null);
    }
  };

  const handleCopy = () => {
    if (!outputUrl) return;
    navigator.clipboard.writeText(outputUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = "resized-image";
    a.click();
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Image Resizer"
          description="Resize images to custom dimensions directly in your browser."
        />
        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link href="/tools/file-generator" className="text-primary hover:underline">
            File Generator
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2 space-y-2">
              <Label htmlFor="image-file">Select Image</Label>
              <Input id="image-file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} />
                    Keep aspect
                  </label>
                </div>
              </div>
              <Button onClick={handleResize} className="w-full">Resize Image</Button>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
              {error ? (
                <Alert variant="destructive" className="w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : outputUrl ? (
                <img src={outputUrl} alt="Resized" className="max-w-full max-h-80 object-contain" />
              ) : (
                <div className="text-muted-foreground">No image resized yet.</div>
              )}
              {outputUrl && (
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline" onClick={handleCopy} className="flex items-center gap-1">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy URL"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleDownload} className="flex items-center gap-1">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
