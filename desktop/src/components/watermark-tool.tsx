import React, { useState, useRef, useCallback, useEffect, ChangeEvent } from "react";
import { AlertCircle, Image as ImageIcon, FileUp, Download } from "lucide-react";
import {
  WatermarkPosition,
  DEFAULT_WATERMARK_OPTIONS,
  applyWatermark,
  processMultipleImages,
  validateImageFiles,
  loadImageFromFile,
  type WatermarkOptions,
  type WatermarkResult,
  type BatchProcessingProgress,
} from "shared";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";

interface WatermarkToolProps {
  className?: string;
}

export function WatermarkTool({ className = "" }: WatermarkToolProps) {
  const [mode, setMode] = useState<"batch" | "single">("batch");
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
  const [watermarkImage, setWatermarkImage] = useState<HTMLImageElement | null>(null);
  const [targetFiles, setTargetFiles] = useState<File[]>([]);
  const [singleTargetFile, setSingleTargetFile] = useState<File | null>(null);
  const [singleTargetImage, setSingleTargetImage] = useState<HTMLImageElement | null>(null);
  const [options, setOptions] = useState<WatermarkOptions>(DEFAULT_WATERMARK_OPTIONS);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<BatchProcessingProgress | null>(null);
  const [results, setResults] = useState<WatermarkResult[]>([]);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const watermarkInputRef = useRef<HTMLInputElement>(null);
  const targetInputRef = useRef<HTMLInputElement>(null);
  const singleTargetInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleWatermarkChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file for the watermark');
      return;
    }

    try {
      setWatermarkFile(file);
      const img = await loadImageFromFile(file);
      setWatermarkImage(img);
      setError(null);
    } catch {
      setError('Failed to load watermark image');
      setWatermarkFile(null);
      setWatermarkImage(null);
    }
  };

  const handleTargetFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const { valid, invalid } = validateImageFiles(files);
    
    if (invalid.length > 0) {
      setError(`${invalid.length} file(s) are not valid images and will be skipped`);
    } else {
      setError(null);
    }
    
    setTargetFiles(valid);
    setResults([]);
  };

  const handleSingleTargetChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    try {
      setSingleTargetFile(file);
      const img = await loadImageFromFile(file);
      setSingleTargetImage(img);
      setError(null);
      updatePreview(img);
    } catch {
      setError('Failed to load target image');
      setSingleTargetFile(null);
      setSingleTargetImage(null);
    }
  };

  const calculatePosition = useCallback((canvasWidth: number, canvasHeight: number, watermarkWidth: number, watermarkHeight: number) => {
    const margin = options.margin;
    switch (options.position) {
      case WatermarkPosition.TOP_LEFT:
        return { x: margin, y: margin };
      case WatermarkPosition.TOP_RIGHT:
        return { x: canvasWidth - watermarkWidth - margin, y: margin };
      case WatermarkPosition.BOTTOM_LEFT:
        return { x: margin, y: canvasHeight - watermarkHeight - margin };
      case WatermarkPosition.BOTTOM_RIGHT:
        return { x: canvasWidth - watermarkWidth - margin, y: canvasHeight - watermarkHeight - margin };
      default:
        return { x: canvasWidth - watermarkWidth - margin, y: canvasHeight - watermarkHeight - margin };
    }
  }, [options.margin, options.position]);

  const updatePreview = useCallback((targetImg?: HTMLImageElement) => {
    if (!canvasRef.current || !watermarkImage) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = targetImg || singleTargetImage;
    if (!img) return;

    const maxWidth = 600;
    const maxHeight = 400;
    const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
    
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const watermarkScale = options.scale * scale;
    const watermarkWidth = watermarkImage.width * watermarkScale;
    const watermarkHeight = watermarkImage.height * watermarkScale;

    let x, y;
    if (dragPosition) {
      x = Math.max(0, Math.min(canvas.width - watermarkWidth, dragPosition.x - watermarkWidth / 2));
      y = Math.max(0, Math.min(canvas.height - watermarkHeight, dragPosition.y - watermarkHeight / 2));
    } else {
      const pos = calculatePosition(canvas.width, canvas.height, watermarkWidth, watermarkHeight);
      x = pos.x;
      y = pos.y;
    }

    ctx.globalAlpha = options.opacity;
    ctx.drawImage(watermarkImage, x, y, watermarkWidth, watermarkHeight);
    ctx.globalAlpha = 1;
  }, [watermarkImage, singleTargetImage, options, dragPosition, calculatePosition]);

  useEffect(() => {
    if (mode === "single") {
      updatePreview();
    }
  }, [mode, updatePreview]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDragPosition({ x, y });
    setIsDragging(true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDragPosition({ x, y });
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleBatchProcess = async () => {
    if (!watermarkImage || targetFiles.length === 0) {
      setError('Please select a watermark and at least one target image');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResults([]);

    try {
      const processedResults = await processMultipleImages(
        targetFiles,
        watermarkImage,
        options,
        setProgress
      );
      setResults(processedResults);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const handleSingleProcess = async () => {
    if (!watermarkImage || !singleTargetFile) {
      setError('Please select both a watermark and target image');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResults([]);

    try {
      const finalOptions: WatermarkOptions = dragPosition
        ? { ...options }
        : options;

      let customPosition;
      if (dragPosition && canvasRef.current && singleTargetImage && watermarkImage) {
        const canvas = canvasRef.current;
        const targetImg = singleTargetImage;

        // Calculate preview scale factor exactly as in updatePreview
        const maxWidth = 600;
        const maxHeight = 400;
        const previewScale = Math.min(maxWidth / targetImg.width, maxHeight / targetImg.height, 1);

        // Calculate watermark dimensions in preview exactly as in updatePreview
        const watermarkScale = options.scale * previewScale;
        const watermarkWidth = watermarkImage.width * watermarkScale;
        const watermarkHeight = watermarkImage.height * watermarkScale;

        // Calculate clamped position exactly as in updatePreview using calculated dimensions
        const previewCanvasWidth = targetImg.width * previewScale;
        const previewCanvasHeight = targetImg.height * previewScale;
        const clampedCanvasX = Math.max(0, Math.min(previewCanvasWidth - watermarkWidth, dragPosition.x - watermarkWidth / 2));
        const clampedCanvasY = Math.max(0, Math.min(previewCanvasHeight - watermarkHeight, dragPosition.y - watermarkHeight / 2));

        // Convert from preview canvas coordinates to original image coordinates
        // The preview canvas size is: targetImg.width * previewScale x targetImg.height * previewScale
        // But the actual canvas size might be different due to CSS styling
        // So we need to convert based on the preview scale factor and actual image dimensions
        customPosition = {
          x: (clampedCanvasX / previewScale),
          y: (clampedCanvasY / previewScale),
        };
      } else {
        customPosition = undefined;
      }

      const result = await applyWatermark(
        singleTargetFile,
        watermarkImage,
        finalOptions,
        customPosition
      );
      setResults([result]);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (result: WatermarkResult) => {
    if (!result.blob) return;
    
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.watermarkedFileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    results.filter(result => result.success && result.blob).forEach(result => {
      handleDownload(result);
    });
  };

  const handleTabChange = (value: string) => {
    setMode(value as "batch" | "single");
    setTargetFiles([]);
    setSingleTargetFile(null);
    setSingleTargetImage(null);
    setResults([]);
    setError(null);
    setDragPosition(null);
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
          <CardTitle>Watermark Tool</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="space-y-6 flex-1 flex flex-col">
            <Tabs defaultValue="batch" className="w-full" value={mode} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="batch">Batch Processing</TabsTrigger>
                <TabsTrigger value="single">Single Image</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <input
                type="file"
                ref={watermarkInputRef}
                onChange={handleWatermarkChange}
                accept="image/*"
                className="hidden"
                id="watermark-upload"
              />
              <label htmlFor="watermark-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-lg font-medium mb-1">
                  {watermarkFile ? watermarkFile.name : "Choose watermark image"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {watermarkFile ? formatSize(watermarkFile.size) : "PNG, JPG, WEBP, or GIF"}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-sm font-medium">Position</div>
                <div className="space-y-2">
                  {Object.values(WatermarkPosition).map((position) => (
                    <label key={position} className="flex items-center space-x-2 text-sm">
                      <input
                        type="radio"
                        name="position"
                        value={position}
                        checked={options.position === position}
                        onChange={() => setOptions(prev => ({ ...prev, position }))}
                        className="h-4 w-4"
                      />
                      <span className="capitalize">{position.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Opacity: {Math.round(options.opacity * 100)}%</div>
                  <input
                    type="range"
                    value={options.opacity * 100}
                    onChange={(e) => setOptions(prev => ({ ...prev, opacity: parseInt(e.target.value) / 100 }))}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Scale: {Math.round(options.scale * 100)}%</div>
                  <input
                    type="range"
                    value={options.scale * 100}
                    onChange={(e) => setOptions(prev => ({ ...prev, scale: parseInt(e.target.value) / 100 }))}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Margin: {options.margin}px</div>
                  <input
                    type="range"
                    value={options.margin}
                    onChange={(e) => setOptions(prev => ({ ...prev, margin: parseInt(e.target.value) }))}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {mode === "batch" ? (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    ref={targetInputRef}
                    onChange={handleTargetFilesChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="target-upload"
                  />
                  <label htmlFor="target-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-lg font-medium mb-1">
                      {targetFiles.length > 0 ? `${targetFiles.length} image(s) selected` : "Choose target images"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Select multiple images to watermark
                    </span>
                  </label>
                </div>

                <Button
                  onClick={handleBatchProcess}
                  className="w-full"
                  disabled={!watermarkImage || targetFiles.length === 0 || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Apply Watermark to All Images"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    ref={singleTargetInputRef}
                    onChange={handleSingleTargetChange}
                    accept="image/*"
                    className="hidden"
                    id="single-target-upload"
                  />
                  <label htmlFor="single-target-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-lg font-medium mb-1">
                      {singleTargetFile ? singleTargetFile.name : "Choose target image"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {singleTargetFile ? formatSize(singleTargetFile.size) : "Select an image to watermark"}
                    </span>
                  </label>
                </div>

                {singleTargetImage && watermarkImage && (
                  <div className="space-y-4">
                    <div className="text-sm font-medium">Preview (drag to position watermark)</div>
                    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                      <canvas
                        ref={canvasRef}
                        className="max-w-full h-auto border cursor-crosshair"
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                      />
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleSingleProcess}
                  className="w-full"
                  disabled={!watermarkImage || !singleTargetFile || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Apply Watermark"}
                </Button>
              </div>
            )}

            {isProcessing && progress && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing: {progress.fileName}</span>
                  <span>{progress.current} / {progress.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Results</div>
                  {results.filter(r => r.success).length > 1 && (
                    <Button variant="outline" onClick={handleDownloadAll}>
                      Download All
                    </Button>
                  )}
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium text-sm">{result.originalFileName}</p>
                        {result.success ? (
                          <p className="text-xs text-green-600">Watermark applied successfully</p>
                        ) : (
                          <p className="text-xs text-red-600">{result.error}</p>
                        )}
                      </div>
                      {result.success && result.blob && (
                        <Button variant="outline" size="sm" onClick={() => handleDownload(result)}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  ))}
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
