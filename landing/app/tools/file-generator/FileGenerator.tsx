"use client"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link as LinkIcon, AlertCircle, Download } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { 
  generateFileContent,
  generateFileDownloadUrl,
  FileSizeUnit,
  FileContentType,
  COMMON_EXTENSIONS,
} from "shared"
import { Slider } from "@/components/ui/slider"

export default function FileGenerator() {
  // Form state
  const [selectedSize, setSelectedSize] = useState("1")
  const [unit, setUnit] = useState<FileSizeUnit>(FileSizeUnit.KB)
  const [extension, setExtension] = useState("txt")
  const [contentType, setContentType] = useState<FileContentType>(FileContentType.Random)
  const [customHexValue, setCustomHexValue] = useState("FF")
  const [sliderValue, setSliderValue] = useState(0) // 0-100 slider value
  
  // Computed values
  const [sizeInBytes, setSizeInBytes] = useState<number>(1024) // Default to 1KB
  const [sizeDisplay, setSizeDisplay] = useState<string>("1 KB")
  
  // Result state
  const [error, setError] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadFilename, setDownloadFilename] = useState<string>("file.txt")
  
  // Reference to download link
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)
  
  // Size presets for slider markers
  const sizePresets = useMemo(() => [
    { value: 1, unit: FileSizeUnit.KB },
    { value: 10, unit: FileSizeUnit.KB },
    { value: 100, unit: FileSizeUnit.KB },
    { value: 1, unit: FileSizeUnit.MB },
    { value: 10, unit: FileSizeUnit.MB },
    { value: 100, unit: FileSizeUnit.MB },
  ], [])
  
  // Convert slider value (0-100) to size and unit
  const sliderToSize = (value: number) => {
    const index = Math.floor(value / (100 / (sizePresets.length - 1)))
    const nextIndex = Math.min(index + 1, sizePresets.length - 1)
    
    const lowerPreset = sizePresets[index]
    const upperPreset = sizePresets[nextIndex]
    
    // If we're exactly on a preset
    if (index === nextIndex || value % (100 / (sizePresets.length - 1)) === 0) {
      return { 
        size: lowerPreset.value.toString(), 
        unit: lowerPreset.unit 
      }
    }
    
    // Calculate current position between presets
    const segmentSize = 100 / (sizePresets.length - 1)
    const segmentPosition = (value % segmentSize) / segmentSize
    
    // If units are the same, interpolate linearly
    if (lowerPreset.unit === upperPreset.unit) {
      const sizeDiff = upperPreset.value - lowerPreset.value
      const currentSize = lowerPreset.value + sizeDiff * segmentPosition
      return { 
        size: Math.round(currentSize).toString(), 
        unit: lowerPreset.unit 
      }
    }
    
    // If units are different (KB to MB), use a logarithmic scale
    if (segmentPosition < 0.5) {
      // First half: stay in KB and approach 1000
      const position = segmentPosition * 2
      const size = lowerPreset.value + position * (1000 - lowerPreset.value)
      return { 
        size: Math.round(size).toString(), 
        unit: FileSizeUnit.KB 
      }
    } else {
      // Second half: switch to MB and go from 1 to upperPreset.value
      const position = (segmentPosition - 0.5) * 2
      const size = 1 + position * (upperPreset.value - 1)
      return { 
        size: Math.round(size).toString(), 
        unit: FileSizeUnit.MB 
      }
    }
  }
  
  // Find the closest slider value for a given size and unit
  const sizeToSliderValue = useCallback((size: string, unit: FileSizeUnit) => {
    const numSize = Number(size)
    
    // Find the closest preset or interpolate
    for (let i = 0; i < sizePresets.length - 1; i++) {
      const current = sizePresets[i]
      const next = sizePresets[i + 1]
      
      // If exactly matches a preset
      if (numSize === current.value && unit === current.unit) {
        return i * (100 / (sizePresets.length - 1))
      }
      
      // If between two presets with the same unit
      if (current.unit === unit && next.unit === unit && 
          numSize > current.value && numSize < next.value) {
        const segmentSize = 100 / (sizePresets.length - 1)
        const progress = (numSize - current.value) / (next.value - current.value)
        return i * segmentSize + progress * segmentSize
      }
      
      // If between KB and MB
      if (current.unit === FileSizeUnit.KB && next.unit === FileSizeUnit.MB) {
        const segmentSize = 100 / (sizePresets.length - 1)
        
        if (unit === FileSizeUnit.KB && numSize > current.value && numSize <= 1000) {
          // First half: KB increasing to 1000
          const progress = (numSize - current.value) / (1000 - current.value) * 0.5
          return i * segmentSize + progress * segmentSize
        } else if (unit === FileSizeUnit.MB && numSize >= 1 && numSize < next.value) {
          // Second half: MB increasing from 1
          const progress = 0.5 + (numSize - 1) / (next.value - 1) * 0.5
          return i * segmentSize + progress * segmentSize
        }
      }
    }
    
    // If it's the last preset
    const last = sizePresets[sizePresets.length - 1]
    if (numSize === last.value && unit === last.unit) {
      return 100
    }
    
    // Default fallback - clamp the value to valid range
    if (unit === FileSizeUnit.MB && numSize > 100) return 100
    if (unit === FileSizeUnit.KB && numSize < 1) return 0
    
    // For values outside the interpolation ranges, make a best guess
    const sizeInBytes = numSize * (unit === FileSizeUnit.KB ? 1024 : 1024 * 1024)
    const minBytes = 1 * 1024 // 1 KB
    const maxBytes = 100 * 1024 * 1024 // 100 MB
    const percentage = Math.log(sizeInBytes / minBytes) / Math.log(maxBytes / minBytes)
    return Math.max(0, Math.min(100, percentage * 100))
  }, [sizePresets])
  
  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    const newValue = value[0]
    setSliderValue(newValue)
    
    const sizeInfo = sliderToSize(newValue)
    setSelectedSize(sizeInfo.size)
    setUnit(sizeInfo.unit)
  }
  
  // Initialize slider based on initial size and unit
  useEffect(() => {
    setSliderValue(sizeToSliderValue(selectedSize, unit))
  }, [selectedSize, unit, sizeToSliderValue])
  
  // Update slider when size or unit changes from input/select
  useEffect(() => {
    const numSize = Number(selectedSize)
    if (!isNaN(numSize) && numSize > 0) {
      setSliderValue(sizeToSliderValue(selectedSize, unit))
    }
  }, [selectedSize, unit, sizeToSliderValue])
  
  // Compute size in bytes and display text when form values change
  useEffect(() => {
    try {
      const numSize = Number(selectedSize)
      if (isNaN(numSize) || numSize <= 0) {
        throw new Error("Size must be a positive number")
      }
      
      // Convert to bytes based on unit
      let size = 0
      if (unit === FileSizeUnit.Bytes) {
        size = numSize
      } else if (unit === FileSizeUnit.KB) {
        size = numSize * 1024
      } else {
        size = numSize * 1024 * 1024
      }
      
      // Cap at 100MB
      if (size > 100 * 1024 * 1024) {
        throw new Error("Size cannot exceed 100MB")
      }
      
      setSizeInBytes(size)
      setSizeDisplay(`${numSize} ${unit}`)
      setError(null)
    } catch (error) {
      setError((error as Error).message)
      setSizeInBytes(0)
      setSizeDisplay("Invalid")
    }
  }, [selectedSize, unit])
  
  // Update filename when extension changes
  useEffect(() => {
    let ext = extension
    
    // Remove leading dot if present
    if (ext.startsWith('.')) {
      ext = ext.substring(1)
    }
    
    // Ensure extension is not empty
    if (!ext) {
      ext = "bin"
    }
    
    setDownloadFilename(`file.${ext}`)
  }, [extension])
  
  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl)
      }
    }
  }, [downloadUrl])
  
  // Generate the file with current settings and download it immediately
  const handleGenerateFile = () => {
    try {
      // Clean up previous URL
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl)
        setDownloadUrl(null)
      }
      
      // Get extension
      let ext = extension
      
      // Remove leading dot if present
      if (ext.startsWith('.')) {
        ext = ext.substring(1)
      }
      
      // Ensure extension is not empty
      if (!ext) {
        ext = "bin"
      }
      
      // Get size
      const size = Number(selectedSize)
      
      if (isNaN(size) || size <= 0) {
        throw new Error("Size must be a positive number")
      }
      
      // Generate file content
      const options = {
        size,
        unit,
        extension: ext,
        contentType,
        ...(contentType === FileContentType.CustomHex && { customHexValue })
      }
      
      const content = generateFileContent(options)
      
      // Create download URL
      const { url } = generateFileDownloadUrl(content, ext)
      
      // Update state
      setDownloadUrl(url)
      setError(null)
      
      // Trigger download immediately
      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url
        downloadLinkRef.current.download = downloadFilename
        downloadLinkRef.current.click()
      }
    } catch (error) {
      setError((error as Error).message)
      setDownloadUrl(null)
    }
  }
  
  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="File Generator"
          description="Generate files with specific size and format with random data, zeros, or custom patterns."
        />
        
        <div className="flex items-center space-x-2 mb-6">
          <LinkIcon className="h-4 w-4" />
          <Link href="/tools/file-hash-compare" className="text-sm text-blue-500 hover:underline">
            Related tool: File Hash Compare
          </Link>
        </div>
        
        <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
          <div className="space-y-6">
            {/* File Size & Extension Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Size Controls */}
              <div>
                <Label htmlFor="size" className="block mb-2">File Size</Label>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="w-full sm:w-1/2">
                    <Input
                      id="size"
                      type="number"
                      min="1"
                      step="1"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="w-full sm:w-1/3">
                    <Select 
                      value={unit} 
                      onValueChange={(value) => setUnit(value as FileSizeUnit)}
                    >
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={FileSizeUnit.Bytes}>Bytes</SelectItem>
                        <SelectItem value={FileSizeUnit.KB}>KB</SelectItem>
                        <SelectItem value={FileSizeUnit.MB}>MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Size Slider */}
                <div className="mb-2">
                  <Slider
                    defaultValue={[0]}
                    value={[sliderValue]}
                    onValueChange={handleSliderChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
                
                {/* Slider Markers */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 KB</span>
                  <span>10 KB</span>
                  <span>100 KB</span>
                  <span>1 MB</span>
                  <span>10 MB</span>
                  <span>100 MB</span>
                </div>
                
                <div className="text-sm text-muted-foreground mt-2">
                  Selected size: <span className="font-medium">{sizeDisplay}</span>
                </div>
              </div>
              
              {/* Extension Controls */}
              <div>
                <Label htmlFor="extension" className="block mb-2">File Extension</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-2/3">
                    <Select 
                      value={COMMON_EXTENSIONS.includes(extension) ? extension : "custom"} 
                      onValueChange={(value) => {
                        if (value !== "custom") {
                          setExtension(value)
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select extension" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMMON_EXTENSIONS.map(ext => (
                          <SelectItem key={ext} value={ext}>.{ext}</SelectItem>
                        ))}
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {!COMMON_EXTENSIONS.includes(extension) && (
                    <div className="w-full md:w-2/3">
                      <Input
                        placeholder="Custom extension (without dot)"
                        value={extension}
                        onChange={(e) => setExtension(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Selected file: <span className="font-medium">{downloadFilename}</span>
                </div>
              </div>
            </div>
            
            {/* Content Type Section */}
            <div>
              <Label className="block mb-2">Content Type</Label>
              <RadioGroup 
                value={contentType}
                onValueChange={(value) => setContentType(value as FileContentType)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-2 min-w-[120px]">
                  <RadioGroupItem value={FileContentType.Random} id="content-random" />
                  <Label htmlFor="content-random" className="cursor-pointer">Random Data</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-2 min-w-[120px]">
                  <RadioGroupItem value={FileContentType.Zeros} id="content-zeros" />
                  <Label htmlFor="content-zeros" className="cursor-pointer">All Zeros</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-2 min-w-[120px]">
                  <RadioGroupItem value={FileContentType.CustomHex} id="content-custom" />
                  <Label htmlFor="content-custom" className="cursor-pointer">Custom Hex</Label>
                </div>
              </RadioGroup>
              
              {contentType === FileContentType.CustomHex && (
                <div className="mt-4">
                  <Label htmlFor="custom-hex" className="block mb-2">Custom Hex Value (e.g. FF, DEADBEEF)</Label>
                  <Input
                    id="custom-hex"
                    value={customHexValue}
                    onChange={(e) => setCustomHexValue(e.target.value)}
                    className="w-full md:w-1/2 font-mono"
                    placeholder="FF"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Hex value will be repeated to fill the file. Must be an even number of hex digits.
                  </p>
                </div>
              )}
            </div>
            
            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Generate Button */}
            <div>
              <Button 
                onClick={handleGenerateFile}
                className="w-full"
                size="lg"
                disabled={sizeInBytes === 0 || !!error}
              >
                <Download className="mr-2 h-4 w-4" />
                Generate File
              </Button>
            </div>
            
            {/* Hidden link for automatic download */}
            <a 
              ref={downloadLinkRef} 
              className="hidden"
              href={downloadUrl || '#'}
              download={downloadFilename}
            />
          </div>
        </div>
      </Container>
    </>
  )
} 