import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { resizeImage, ImageResizeOptions, DEFAULT_IMAGE_RESIZE_OPTIONS } from "shared";
import { AlertCircle, Download, ImageIcon, Upload } from "lucide-react";

interface ImageResizerProps {
  className?: string;
}

export function ImageResizer({ className }: ImageResizerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<string>("100");
  const [height, setHeight] = useState<string>("100");
  const [originalWidth, setOriginalWidth] = useState<number | null>(null);
  const [originalHeight, setOriginalHeight] = useState<number | null>(null);
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOutputUrl(null);
      setError(null);
      
      const img = new Image();
      const objectUrl = URL.createObjectURL(selectedFile);
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
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

  const handleResize = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const parsedWidth = Number(width);
      const parsedHeight = Number(height);
      
      if (parsedWidth <= 0 || parsedHeight <= 0) {
        throw new Error('Width and height must be positive numbers');
      }
      
      const options: ImageResizeOptions = {
        width: parsedWidth,
        height: parsedHeight,
        keepAspectRatio,
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

  const handleDownload = () => {
    if (!outputUrl || !file) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = `resized-${file.name}`;
    a.click();
  };

  const handleClear = () => {
    setFile(null);
    setWidth("100");
    setHeight("100");
    setOriginalWidth(null);
    setOriginalHeight(null);
    setKeepAspectRatio(true);
    setOutputUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Image Resizer</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-6 flex-1 flex flex-col">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-lg font-medium mb-1">
                  {file ? file.name : "Choose image to resize"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {file ? (
                    <>
                      {formatSize(file.size)}
                      {originalWidth && originalHeight && (
                        <> • {originalWidth} × {originalHeight} pixels</>
                      )}
                    </>
                  ) : (
                    "PNG, JPG, WEBP, or GIF"
                  )}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-sm font-medium">Dimensions</div>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="width" className="block text-sm font-medium mb-1">
                      Width (px)
                    </label>
                    <input
                      id="width"
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="Width"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium mb-1">
                      Height (px)
                    </label>
                    <input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Height"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-medium">Options</div>
                <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={keepAspectRatio}
                      onChange={(e) => setKeepAspectRatio(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    Keep aspect ratio
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleResize}
                className="flex-1"
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
              <Button
                variant="outline"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>

            {outputUrl && (
              <div className="space-y-4">
                <div className="text-sm font-medium">Result</div>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="flex justify-center mb-4">
                    <img
                      src={outputUrl}
                      alt="Resized"
                      className="max-w-full max-h-64 object-contain rounded border"
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button onClick={handleDownload} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download Resized Image
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
