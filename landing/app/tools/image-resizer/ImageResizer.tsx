"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { 
  Check, 
  Copy, 
  Download, 
  Link as LinkIcon, 
  AlertCircle, 
  Upload, 
  ImageIcon,
  Settings,
  Lock
} from "lucide-react";
import Link from "next/link";
import { resizeImage, ImageResizeOptions, DEFAULT_IMAGE_RESIZE_OPTIONS } from "shared";

/**
 * Simple separator component for dividing sections
 */
const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`border-b border-border ${className}`} />
);

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<string>("100");
  const [height, setHeight] = useState<string>("100");
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);
  const [keepAspect, setKeepAspect] = useState(true);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handles the image resizing process
   */
  const handleResize = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const parsedWidth = Number(width);
      const parsedHeight = Number(height);
      const options: ImageResizeOptions = {
        width: parsedWidth > 0 ? parsedWidth : DEFAULT_IMAGE_RESIZE_OPTIONS.width,
        height: parsedHeight > 0 ? parsedHeight : DEFAULT_IMAGE_RESIZE_OPTIONS.height,
        keepAspectRatio: keepAspect,
        type: DEFAULT_IMAGE_RESIZE_OPTIONS.type,
        quality: DEFAULT_IMAGE_RESIZE_OPTIONS.quality,
      };
      const blob = await resizeImage(file, options);
      const url = URL.createObjectURL(blob);
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(url);
    } catch (error) {
      setError((error as Error).message);
      setOutputUrl(null);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Copies the output URL to clipboard
   */
  const handleCopy = () => {
    if (!outputUrl) return;
    navigator.clipboard.writeText(outputUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Downloads the resized image
   */
  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `resized-${file?.name || 'image'}`;
    a.click();
  };

  /**
   * Handles file selection and extracts image dimensions
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOutputUrl(null);
      setError(null);
      
      // Get image dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(selectedFile);
      img.onload = () => {
        // Store original dimensions
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        // Set input fields to original dimensions
        setWidth(img.width.toString());
        setHeight(img.height.toString());
        URL.revokeObjectURL(objectUrl);
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    }
  };

  return (
    <Container className="py-8 md:py-12">
      <SectionHeading
        title="Image Resizer"
        description="Resize images to custom dimensions directly in your browser with optional aspect ratio preservation."
      />
      
      <div className="mb-6 flex items-center text-sm text-muted-foreground gap-2">
        <LinkIcon className="h-4 w-4" />
        <span>Related tool: </span>
        <Link href="/tools/file-generator" className="text-primary hover:underline">
          File Generator
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload & Configure
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select an image and set your desired dimensions
                </p>
              </div>

              <Separator />

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="image-file" className="text-sm font-medium">
                  Select Image
                </Label>
                <div className="relative">
                  <Input 
                    id="image-file" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 border-0 bg-transparent p-0 h-auto"
                  />
                </div>
                {file && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                    {originalWidth && originalHeight && (
                      <>
                        <br />
                        Original dimensions: {originalWidth} × {originalHeight} pixels
                      </>
                    )}
                  </p>
                )}
              </div>

              {/* Dimensions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-4 w-4" />
                  <Label className="text-sm font-medium">Dimensions</Label>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-sm">Width (px)</Label>
                    <Input 
                      id="width" 
                      type="number" 
                      value={width} 
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="Width"
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm">Height (px)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={height} 
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Height"
                      min="1"
                    />
                  </div>
                </div>

                {/* Keep Aspect Ratio */}
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={keepAspect} 
                      onChange={(e) => setKeepAspect(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Keep aspect ratio
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={handleResize} 
                className="w-full" 
                size="lg"
                disabled={!file || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Resize Image
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Result
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your resized image will appear here
                </p>
              </div>

              <Separator />

              {/* Result Area */}
              <div className="min-h-[300px] flex flex-col items-center justify-center">
                {error ? (
                  <Alert variant="destructive" className="w-full">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : outputUrl ? (
                  <div className="w-full space-y-4">
                    <div className="flex justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={outputUrl} 
                        alt="Resized" 
                        className="max-w-full max-h-80 object-contain rounded-lg border shadow-sm" 
                      />
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={handleCopy} 
                        className="flex items-center gap-2"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Copied!" : "Copy URL"}
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleDownload} 
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" /> 
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground space-y-3">
                    <ImageIcon className="h-12 w-12 mx-auto opacity-50" />
                    <p>No image resized yet.</p>
                    <p className="text-xs">
                      Upload an image and click "Resize Image" to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
