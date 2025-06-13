"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, FileUp, Download, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
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
import { useState, useRef, ChangeEvent, useCallback, useEffect } from "react";
import Link from "next/link";
import WatermarkToolExplanation from "./WatermarkToolExplanation";

export default function WatermarkTool() {
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
  }, [watermarkImage, singleTargetImage, options, dragPosition]);

  const calculatePosition = (canvasWidth: number, canvasHeight: number, watermarkWidth: number, watermarkHeight: number) => {
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
  };

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
    } catch {
      setError('Failed to process images');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSingleProcess = async () => {
    if (!watermarkImage || !singleTargetFile) {
      setError('Please select a watermark and target image');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      let finalOptions = { ...options };
      
      if (dragPosition && canvasRef.current && singleTargetImage && watermarkImage) {

        finalOptions = {
          ...options,
          position: WatermarkPosition.TOP_LEFT,
          margin: 0,
        };
      }

      let customPos;
      if (dragPosition && canvasRef.current && singleTargetImage && watermarkImage) {
        const scale = Math.min(600 / singleTargetImage.width, 400 / singleTargetImage.height, 1);
        const watermarkScale = options.scale * scale;
        const watermarkWidth = watermarkImage.width * watermarkScale;
        const watermarkHeight = watermarkImage.height * watermarkScale;
        
        const actualX = Math.max(0, Math.min(singleTargetImage.width - watermarkWidth / scale, (dragPosition.x - watermarkWidth / 2) / scale));
        const actualY = Math.max(0, Math.min(singleTargetImage.height - watermarkHeight / scale, (dragPosition.y - watermarkHeight / 2) / scale));
        
        customPos = { x: actualX, y: actualY };
      }

      const result = await applyWatermark(singleTargetFile, watermarkImage, finalOptions, customPos);
      setResults([result]);
    } catch {
      setError('Failed to process image');
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
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    results.forEach(result => {
      if (result.success && result.blob) {
        handleDownload(result);
      }
    });
  };

  const handleTabChange = (value: string) => {
    setMode(value as "batch" | "single");
    setError(null);
    setResults([]);
    setProgress(null);
    setDragPosition(null);
    
    if (targetInputRef.current) targetInputRef.current.value = "";
    if (singleTargetInputRef.current) singleTargetInputRef.current.value = "";
    
    setTargetFiles([]);
    setSingleTargetFile(null);
    setSingleTargetImage(null);
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
          title="Watermark Tool"
          description="Add watermarks to your images with customizable positioning and batch processing support."
        />

        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tools: </span>
          <Link href="/tools/file-generator" className="text-primary hover:underline">
            File Generator
          </Link>
          <span>•</span>
          <Link href="/tools/binary-base64-codec" className="text-primary hover:underline">
            Binary Base64 Codec
          </Link>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="batch" className="w-full" value={mode} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="batch">Batch Processing</TabsTrigger>
              <TabsTrigger value="single">Single Image</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
              <input
                type="file"
                ref={watermarkInputRef}
                onChange={handleWatermarkChange}
                accept="image/*"
                className="hidden"
                id="watermark-upload"
              />
              <Label htmlFor="watermark-upload" className="flex flex-col items-center justify-center cursor-pointer">
                <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-lg font-medium mb-1">
                  {watermarkFile ? watermarkFile.name : "Choose watermark image"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {watermarkFile ? formatSize(watermarkFile.size) : "PNG, JPG, WEBP, or GIF"}
                </span>
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Position</Label>
                <div className="block md:hidden">
                  <Select value={options.position} onValueChange={(value) => setOptions(prev => ({ ...prev, position: value as WatermarkPosition }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={WatermarkPosition.TOP_LEFT}>Top Left</SelectItem>
                      <SelectItem value={WatermarkPosition.TOP_RIGHT}>Top Right</SelectItem>
                      <SelectItem value={WatermarkPosition.BOTTOM_LEFT}>Bottom Left</SelectItem>
                      <SelectItem value={WatermarkPosition.BOTTOM_RIGHT}>Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <RadioGroup
                  value={options.position}
                  onValueChange={(value) => setOptions(prev => ({ ...prev, position: value as WatermarkPosition }))}
                  className="hidden md:flex md:flex-col"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={WatermarkPosition.TOP_LEFT} id="top-left" />
                    <Label htmlFor="top-left">Top Left</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={WatermarkPosition.TOP_RIGHT} id="top-right" />
                    <Label htmlFor="top-right">Top Right</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={WatermarkPosition.BOTTOM_LEFT} id="bottom-left" />
                    <Label htmlFor="bottom-left">Bottom Left</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={WatermarkPosition.BOTTOM_RIGHT} id="bottom-right" />
                    <Label htmlFor="bottom-right">Bottom Right</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Opacity: {Math.round(options.opacity * 100)}%</Label>
                  <Slider
                    value={[options.opacity * 100]}
                    onValueChange={([value]) => setOptions(prev => ({ ...prev, opacity: value / 100 }))}
                    max={100}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Scale: {Math.round(options.scale * 100)}%</Label>
                  <Slider
                    value={[options.scale * 100]}
                    onValueChange={([value]) => setOptions(prev => ({ ...prev, scale: value / 100 }))}
                    max={50}
                    min={5}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Margin: {options.margin}px</Label>
                  <Slider
                    value={[options.margin]}
                    onValueChange={([value]) => setOptions(prev => ({ ...prev, margin: value }))}
                    max={100}
                    min={0}
                    step={5}
                    className="mt-2"
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
                  <Label htmlFor="target-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-lg font-medium mb-1">
                      {targetFiles.length > 0 ? `${targetFiles.length} image(s) selected` : "Choose target images"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Select multiple images to watermark
                    </span>
                  </Label>
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
                  <Label htmlFor="single-target-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-lg font-medium mb-1">
                      {singleTargetFile ? singleTargetFile.name : "Choose target image"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {singleTargetFile ? formatSize(singleTargetFile.size) : "Select an image to watermark"}
                    </span>
                  </Label>
                </div>

                {singleTargetImage && watermarkImage && (
                  <div className="space-y-4">
                    <Label>Preview (drag to position watermark)</Label>
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
                <Progress value={(progress.current / progress.total) * 100} />
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Results</Label>
                  {results.filter(r => r.success).length > 1 && (
                    <Button variant="outline" onClick={handleDownloadAll}>
                      Download All
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{result.originalFileName}</p>
                        {result.success ? (
                          <p className="text-sm text-green-600">Watermark applied successfully</p>
                        ) : (
                          <p className="text-sm text-red-600">{result.error}</p>
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
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </Container>

      <Container className="py-8 md:py-12">
        <WatermarkToolExplanation />
      </Container>
    </>
  );
}
