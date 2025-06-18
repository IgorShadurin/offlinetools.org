import { useState, useCallback, useEffect } from "react";
import { AlertCircle, FileText, Download, Loader2, FolderOpen } from "lucide-react";
import { 
  saveFileWithPicker,
  isFileSystemAccessSupported,
  FileSizeUnit,
  FileContentType,
  convertToBytes,
  type FileGeneratorOptions 
} from "shared/file-generator";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectOption } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";

/**
 * Props for the FileGenerator component
 * @interface FileGeneratorProps
 */
interface FileGeneratorProps {
  className?: string;
}

/**
 * File Generator component
 * @param props - Component props
 * @returns FileGenerator component
 */
export function FileGenerator({ className = "" }: FileGeneratorProps) {
  const [selectedSize, setSelectedSize] = useState("1");
  const [unit, setUnit] = useState<FileSizeUnit>(FileSizeUnit.KB);
  const [fullFilename, setFullFilename] = useState("file.txt");
  const [contentType, setContentType] = useState<FileContentType>(FileContentType.Random);
  const [customHexValue, setCustomHexValue] = useState("FF");
  const [sliderValue, setSliderValue] = useState(0); // 0-100 slider value
  const [useBinary, setUseBinary] = useState(true); // true = 1024, false = 1000
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [fsApiSupported, setFsApiSupported] = useState(false);

  // Check File System Access API support on mount
  useEffect(() => {
    setFsApiSupported(isFileSystemAccessSupported());
  }, []);

  // Size presets for slider markers
  const sizePresets = [
    { value: 1, unit: FileSizeUnit.KB },
    { value: 10, unit: FileSizeUnit.KB },
    { value: 100, unit: FileSizeUnit.KB },
    { value: 1, unit: FileSizeUnit.MB },
    { value: 10, unit: FileSizeUnit.MB },
    { value: 100, unit: FileSizeUnit.MB },
    { value: 1, unit: FileSizeUnit.GB },
    { value: 5, unit: FileSizeUnit.GB },
    { value: 10, unit: FileSizeUnit.GB },
  ];

  /**
   * Convert slider value (0-100) to size and unit
   * @param value - Slider value (0-100)
   * @returns Size and unit
   */
  const sliderToSize = (value: number) => {
    const index = Math.floor(value / (100 / (sizePresets.length - 1)));
    const nextIndex = Math.min(index + 1, sizePresets.length - 1);

    const lowerPreset = sizePresets[index];
    const upperPreset = sizePresets[nextIndex];

    // If we're exactly on a preset
    if (index === nextIndex || value % (100 / (sizePresets.length - 1)) === 0) {
      return {
        size: lowerPreset.value.toString(),
        unit: lowerPreset.unit,
      };
    }

    // Calculate current position between presets
    const segmentSize = 100 / (sizePresets.length - 1);
    const segmentPosition = (value % segmentSize) / segmentSize;

    // If units are the same, interpolate linearly
    if (lowerPreset.unit === upperPreset.unit) {
      const sizeDiff = upperPreset.value - lowerPreset.value;
      const currentSize = lowerPreset.value + sizeDiff * segmentPosition;
      return {
        size: Math.round(currentSize).toString(),
        unit: lowerPreset.unit,
      };
    }

    // Handle unit transitions
    if (lowerPreset.unit === FileSizeUnit.KB && upperPreset.unit === FileSizeUnit.MB) {
      if (segmentPosition < 0.5) {
        const position = segmentPosition * 2;
        const size = lowerPreset.value + position * (1000 - lowerPreset.value);
        return {
          size: Math.round(size).toString(),
          unit: FileSizeUnit.KB,
        };
      } else {
        const position = (segmentPosition - 0.5) * 2;
        const size = 1 + position * (upperPreset.value - 1);
        return {
          size: Math.round(size).toString(),
          unit: FileSizeUnit.MB,
        };
      }
    } else if (lowerPreset.unit === FileSizeUnit.MB && upperPreset.unit === FileSizeUnit.GB) {
      if (segmentPosition < 0.5) {
        const position = segmentPosition * 2;
        const size = lowerPreset.value + position * (1000 - lowerPreset.value);
        return {
          size: Math.round(size).toString(),
          unit: FileSizeUnit.MB,
        };
      } else {
        const position = (segmentPosition - 0.5) * 2;
        const size = 1 + position * (upperPreset.value - 1);
        return {
          size: Math.round(size).toString(),
          unit: FileSizeUnit.GB,
        };
      }
    }

    return {
      size: lowerPreset.value.toString(),
      unit: lowerPreset.unit,
    };
  };

  /**
   * Handle slider change
   * @param value - New slider value
   */
  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const sizeInfo = sliderToSize(value);
    setSelectedSize(sizeInfo.size);
    setUnit(sizeInfo.unit);
  };

  /**
   * Handle input size change
   * @param value - New size value
   */
  const handleSizeInputChange = (value: string) => {
    setSelectedSize(value);
    const numSize = Number(value);
    if (!isNaN(numSize) && numSize > 0) {
      const newSliderValue = sizeToSliderValue(value, unit);
      setSliderValue(newSliderValue);
    }
  };

  /**
   * Handle unit change
   * @param newUnit - New unit value
   */
  const handleUnitChange = (newUnit: FileSizeUnit) => {
    setUnit(newUnit);
    const numSize = Number(selectedSize);
    if (!isNaN(numSize) && numSize > 0) {
      const newSliderValue = sizeToSliderValue(selectedSize, newUnit);
      setSliderValue(newSliderValue);
    }
  };

  /**
   * Handle progress updates during file generation
   * @param progressValue - Progress percentage (0-100)
   */
  const handleProgress = useCallback((progressValue: number) => {
    setProgress(progressValue);
  }, []);

  /**
   * Find the closest slider value for a given size and unit
   * @param size - Size value
   * @param unit - Size unit
   * @returns Slider value (0-100)
   */
  const sizeToSliderValue = useCallback((size: string, unit: FileSizeUnit) => {
    const numSize = Number(size);

    // Handle edge cases first
    if (numSize === 1 && unit === FileSizeUnit.KB) {
      return 0;
    }

    const lastPreset = sizePresets[sizePresets.length - 1];
    if (numSize === lastPreset.value && unit === lastPreset.unit) {
      return 100;
    }

    // Find the closest preset or interpolate
    for (let i = 0; i < sizePresets.length - 1; i++) {
      const current = sizePresets[i];
      const next = sizePresets[i + 1];

      // If exactly matches a preset
      if (numSize === current.value && unit === current.unit) {
        return i * (100 / (sizePresets.length - 1));
      }

      // If between two presets with the same unit
      if (current.unit === unit && next.unit === unit && numSize > current.value && numSize < next.value) {
        const segmentSize = 100 / (sizePresets.length - 1);
        const progress = (numSize - current.value) / (next.value - current.value);
        return i * segmentSize + progress * segmentSize;
      }
    }

    // Default fallback
    return 0;
  }, [sizePresets]);

  // Initialize slider position based on default selectedSize
  useEffect(() => {
    const initialSliderValue = sizeToSliderValue(selectedSize, unit);
    setSliderValue(initialSliderValue);
  }, []); // Only run once on mount

  /**
   * Get the current file extension from full filename
   * @returns Current extension
   */
  const getCurrentExtension = (): string => {
    const lastDotIndex = fullFilename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === fullFilename.length - 1) {
      return "bin"; // Default extension if none found
    }
    return fullFilename.substring(lastDotIndex + 1);
  };

  /**
   * Get the filename without extension
   * @returns Filename without extension
   */
  const getFilenameWithoutExtension = (): string => {
    const lastDotIndex = fullFilename.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return fullFilename;
    }
    return fullFilename.substring(0, lastDotIndex);
  };

  /**
   * Generate file options from current state
   * @returns File generator options
   */
  const getFileOptions = (): FileGeneratorOptions => {
    return {
      size: Number(selectedSize),
      unit,
      extension: getCurrentExtension(),
      contentType,
      customHexValue: contentType === FileContentType.CustomHex ? customHexValue : undefined,
      onProgress: handleProgress,
      useBinary,
    };
  };

  /**
   * Generate file using optimized streaming approach
   */
  const handleGenerateFile = async () => {
    try {
      setIsGenerating(true);
      setProgress(0);
      setError(null);
      setSuccess(false);

      const options = getFileOptions();
      
      // Validate inputs
      if (Number(selectedSize) <= 0) {
        throw new Error("File size must be greater than 0");
      }
      
      if (!fullFilename.trim()) {
        throw new Error("Filename cannot be empty");
      }

      if (contentType === FileContentType.CustomHex) {
        if (!customHexValue.trim()) {
          throw new Error("Custom hex value cannot be empty");
        }
        // Validate hex string
        if (!/^[0-9A-Fa-f\s]+$/.test(customHexValue)) {
          throw new Error("Custom hex value must contain only hexadecimal characters (0-9, A-F)");
        }
      }

      // Use File System Access API for all files when supported
      if (fsApiSupported) {
        // Use the optimized streaming approach - ask where to save first, then generate directly to disk
        await saveFileWithPicker(options, fullFilename);
        
        setSuccess(true);
        setProgress(100);
      } else {
        // Fallback to traditional approach for unsupported browsers
        // Clear previous download URL
        if (downloadUrl) {
          URL.revokeObjectURL(downloadUrl);
          setDownloadUrl(null);
        }

        // Generate file content in memory
        const { generateFileContent, generateFileDownloadUrl } = await import("shared/file-generator");
        const content = await generateFileContent(options);
        
        // Create download URL
        const { url } = generateFileDownloadUrl(content, getCurrentExtension());
        setDownloadUrl(url);
        
        const finalFilename = fullFilename;
        setDownloadFilename(finalFilename);
        
        setSuccess(true);
        setProgress(100);
        
        // Auto-download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = finalFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        // User cancelled the file picker
        setError("File generation cancelled");
      } else {
        setError((error as Error).message);
      }
      setProgress(0);
      setSuccess(false);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Get display text for file size
   * @returns Formatted size string
   */
  const getSizeDisplay = (): string => {
    const sizeValue = Number(selectedSize);
    if (isNaN(sizeValue) || sizeValue <= 0) return "0 B";
    
    const bytes = convertToBytes(sizeValue, unit, useBinary);
    const base = useBinary ? 1024 : 1000;
    
    if (bytes < base) return `${bytes} B`;
    if (bytes < base * base) return `${(bytes / base).toFixed(1)} KB`;
    if (bytes < base * base * base) return `${(bytes / (base * base)).toFixed(1)} MB`;
    return `${(bytes / (base * base * base)).toFixed(1)} GB`;
  };

  return (
    <div className={`p-6 h-full flex flex-col space-y-6 ${className}`}>
      {/* Title */}
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6" />
        <h1 className="text-2xl font-bold">File Generator</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col space-y-4">
          {/* Filename */}
          <div className="space-y-2">
            <Label htmlFor="filename">Filename</Label>
            <Input
              id="filename"
              value={fullFilename}
              onChange={(e) => setFullFilename(e.target.value)}
              placeholder="file.txt"
            />
          </div>

          {/* File Size */}
          <div className="space-y-2">
            <Label>File Size</Label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                min="1"
                value={selectedSize}
                onChange={(e) => handleSizeInputChange(e.target.value)}
                placeholder="1"
                className="w-32 min-w-[8rem]"
              />
              <Select 
                value={unit} 
                onChange={(e) => handleUnitChange(e.target.value as FileSizeUnit)}
                className="w-20"
              >
                <SelectOption value={FileSizeUnit.Bytes}>B</SelectOption>
                <SelectOption value={FileSizeUnit.KB}>KB</SelectOption>
                <SelectOption value={FileSizeUnit.MB}>MB</SelectOption>
                <SelectOption value={FileSizeUnit.GB}>GB</SelectOption>
              </Select>
              {/* Binary/Decimal Calculation Checkbox */}
              <div className="flex items-center space-x-2 ml-2">
                <input
                  type="checkbox"
                  id="decimal-calc"
                  checked={!useBinary}
                  onChange={(e) => setUseBinary(!e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="decimal-calc" className="text-sm text-muted-foreground cursor-pointer">
                  Use decimal (1000) like macOS
                </Label>
              </div>
            </div>

            {/* Size Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={sliderValue}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              
              {/* Slider Markers */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 KB</span>
                <span>100 KB</span>
                <span>10 MB</span>
                <span>1 GB</span>
                <span>10 GB</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Selected size: <span className="font-medium">{getSizeDisplay()}</span>
            </p>
          </div>

          {/* Content Type */}
          <div className="space-y-2">
            <Label>Content Type</Label>
            <div className="space-y-1">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name="content-type"
                  value={FileContentType.Random}
                  checked={contentType === FileContentType.Random}
                  onChange={(e) => setContentType(e.target.value as FileContentType)}
                  className="h-4 w-4"
                />
                <span>Random data</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name="content-type"
                  value={FileContentType.Zeros}
                  checked={contentType === FileContentType.Zeros}
                  onChange={(e) => setContentType(e.target.value as FileContentType)}
                  className="h-4 w-4"
                />
                <span>All zeros</span>
              </label>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="radio"
                  name="content-type"
                  value={FileContentType.CustomHex}
                  checked={contentType === FileContentType.CustomHex}
                  onChange={(e) => setContentType(e.target.value as FileContentType)}
                  className="h-4 w-4"
                />
                <span>Custom hex pattern</span>
              </label>
            </div>
            
            {contentType === FileContentType.CustomHex && (
              <div className="space-y-1 mt-2">
                <Label htmlFor="hex-value">Hex Value</Label>
                <Input
                  id="hex-value"
                  value={customHexValue}
                  onChange={(e) => setCustomHexValue(e.target.value.toUpperCase())}
                  placeholder="FF AB CD"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Enter hex values (e.g., FF, AB CD). Pattern will be repeated throughout the file.
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar (only show during generation) */}
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating file...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Generate Button */}
          <Button 
            onClick={handleGenerateFile} 
            className="w-full h-12 text-base"
            disabled={isGenerating || !fullFilename.trim() || Number(selectedSize) <= 0}
          >
                        {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {progress > 0 ? `Generating... ${progress}%` : "Generating..."}
              </>
            ) : (
              <>
                {fsApiSupported ? (
                  <>
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Save As...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </>
            )}
          </Button>
      </div>
    </div>
  );
} 