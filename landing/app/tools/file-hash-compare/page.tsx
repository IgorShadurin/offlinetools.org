"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card"
import { 
  AlertCircle, 
  FileText,
  CheckCircle2, 
  XCircle
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  HashAlgorithm, 
  calculateTextHash, 
  calculateFileHash, 
  compareHashes
} from "shared"

export default function HashComparePage() {
  // Common state
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>(HashAlgorithm.SHA256)
  
  // Text comparison state
  const [firstText, setFirstText] = useState("")
  const [secondText, setSecondText] = useState("")
  const [textComparisonResult, setTextComparisonResult] = useState<{
    firstHash: string;
    secondHash: string;
    match: boolean;
  } | null>(null)
  const [textError, setTextError] = useState<string | null>(null)
  
  // File comparison state
  const [firstFile, setFirstFile] = useState<File | null>(null)
  const [secondFile, setSecondFile] = useState<File | null>(null)
  const [fileComparisonResult, setFileComparisonResult] = useState<{
    firstHash: string;
    secondHash: string;
    match: boolean;
  } | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const firstFileInputRef = useRef<HTMLInputElement>(null)
  const secondFileInputRef = useRef<HTMLInputElement>(null)
  
  // Text comparison handler
  const handleCompareTexts = async () => {
    try {
      if (!firstText.trim() || !secondText.trim()) {
        setTextError("Both text fields are required")
        setTextComparisonResult(null)
        return
      }
      
      const firstHash = calculateTextHash(firstText, { algorithm })
      const secondHash = calculateTextHash(secondText, { algorithm })
      const result = compareHashes(firstHash, secondHash)
      
      setTextComparisonResult(result)
      setTextError(null)
    } catch (error) {
      setTextError((error as Error).message)
      setTextComparisonResult(null)
    }
  }
  
  // File comparison handler
  const handleCompareFiles = async () => {
    try {
      if (!firstFile || !secondFile) {
        setFileError("Both files are required")
        setFileComparisonResult(null)
        return
      }
      
      const firstFileBuffer = await firstFile.arrayBuffer()
      const secondFileBuffer = await secondFile.arrayBuffer()
      
      const firstHash = calculateFileHash(firstFileBuffer, { algorithm })
      const secondHash = calculateFileHash(secondFileBuffer, { algorithm })
      const result = compareHashes(firstHash, secondHash)
      
      setFileComparisonResult(result)
      setFileError(null)
    } catch (error) {
      setFileError((error as Error).message)
      setFileComparisonResult(null)
    }
  }
  
  // Handle first file selection
  const handleFirstFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFirstFile(e.target.files[0])
      setFileComparisonResult(null)
    }
  }
  
  // Handle second file selection
  const handleSecondFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSecondFile(e.target.files[0])
      setFileComparisonResult(null)
    }
  }
  
  // Reset file inputs
  const resetFileInputs = () => {
    setFirstFile(null)
    setSecondFile(null)
    setFileComparisonResult(null)
    if (firstFileInputRef.current) firstFileInputRef.current.value = ""
    if (secondFileInputRef.current) secondFileInputRef.current.value = ""
  }
  
  // Reset text inputs
  const resetTextInputs = () => {
    setFirstText("")
    setSecondText("")
    setTextComparisonResult(null)
  }
  
  // Get the appropriate algorithm value for the select component
  const getAlgorithmValue = () => {
    switch (algorithm) {
      case HashAlgorithm.SHA256:
        return "sha256"
      case HashAlgorithm.SHA224:
        return "sha224"
      case HashAlgorithm.SHA1:
        return "sha1"
      case HashAlgorithm.MD5:
        return "md5"
      default:
        return "sha256"
    }
  }
  
  // Handle algorithm selection
  const handleAlgorithmChange = (value: string) => {
    switch (value) {
      case "sha256":
        setAlgorithm(HashAlgorithm.SHA256)
        break
      case "sha224":
        setAlgorithm(HashAlgorithm.SHA224)
        break
      case "sha1":
        setAlgorithm(HashAlgorithm.SHA1)
        break
      case "md5":
        setAlgorithm(HashAlgorithm.MD5)
        break
    }
    
    // Clear results when algorithm changes
    setFileComparisonResult(null)
    setTextComparisonResult(null)
  }
  
  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="File & Text Hash Comparison"
          description="Compare hashes of files or text strings using different algorithms."
        />
        
        <div className="mb-4">
          <Label htmlFor="algorithm" className="mb-2 block">Hash Algorithm</Label>
          <Select value={getAlgorithmValue()} onValueChange={handleAlgorithmChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sha256">SHA-256</SelectItem>
              <SelectItem value="sha224">SHA-224</SelectItem>
              <SelectItem value="sha1">SHA-1</SelectItem>
              <SelectItem value="md5">MD5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="files" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="files">Compare Files</TabsTrigger>
            <TabsTrigger value="text">Compare Text</TabsTrigger>
          </TabsList>
          
          {/* Files Tab */}
          <TabsContent value="files" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First File */}
              <div className="space-y-2">
                <Label htmlFor="first-file">First File</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    ref={firstFileInputRef}
                    id="first-file"
                    type="file"
                    onChange={handleFirstFileChange}
                    className="flex-1"
                  />
                </div>
                {firstFile && (
                  <div className="text-sm flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span className="truncate">{firstFile.name}</span>
                    <span className="text-muted-foreground">
                      ({(firstFile.size / 1024).toFixed(2)} KB)
                    </span>
                  </div>
                )}
              </div>
              
              {/* Second File */}
              <div className="space-y-2">
                <Label htmlFor="second-file">Second File</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    ref={secondFileInputRef}
                    id="second-file"
                    type="file"
                    onChange={handleSecondFileChange}
                    className="flex-1"
                  />
                </div>
                {secondFile && (
                  <div className="text-sm flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span className="truncate">{secondFile.name}</span>
                    <span className="text-muted-foreground">
                      ({(secondFile.size / 1024).toFixed(2)} KB)
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                onClick={handleCompareFiles} 
                className="w-full sm:w-auto"
                disabled={!firstFile || !secondFile}
              >
                Compare Files
              </Button>
              <Button 
                variant="outline" 
                onClick={resetFileInputs}
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
            </div>
            
            {/* Error Display */}
            {fileError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{fileError}</AlertDescription>
              </Alert>
            )}
            
            {/* Results Display */}
            {fileComparisonResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Comparison Result
                    {fileComparisonResult.match ? (
                      <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="ml-2 h-5 w-5 text-red-500" />
                    )}
                  </CardTitle>
                  <CardDescription>
                    {fileComparisonResult.match 
                      ? "The files have matching hashes" 
                      : "The files have different hashes"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">First File Hash ({algorithm}):</p>
                    <p className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono break-all">
                      {fileComparisonResult.firstHash}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Second File Hash ({algorithm}):</p>
                    <p className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono break-all">
                      {fileComparisonResult.secondHash}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Text Tab */}
          <TabsContent value="text" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Text */}
              <div className="space-y-2">
                <Label htmlFor="first-text">First Text</Label>
                <Textarea
                  id="first-text"
                  placeholder="Enter text to hash..."
                  value={firstText}
                  onChange={(e) => setFirstText(e.target.value)}
                  className="min-h-28"
                />
              </div>
              
              {/* Second Text */}
              <div className="space-y-2">
                <Label htmlFor="second-text">Second Text</Label>
                <Textarea
                  id="second-text"
                  placeholder="Enter text to hash..."
                  value={secondText}
                  onChange={(e) => setSecondText(e.target.value)}
                  className="min-h-28"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                onClick={handleCompareTexts} 
                className="w-full sm:w-auto"
                disabled={!firstText.trim() || !secondText.trim()}
              >
                Compare Texts
              </Button>
              <Button 
                variant="outline" 
                onClick={resetTextInputs}
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
            </div>
            
            {/* Error Display */}
            {textError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{textError}</AlertDescription>
              </Alert>
            )}
            
            {/* Results Display */}
            {textComparisonResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Comparison Result
                    {textComparisonResult.match ? (
                      <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="ml-2 h-5 w-5 text-red-500" />
                    )}
                  </CardTitle>
                  <CardDescription>
                    {textComparisonResult.match 
                      ? "The texts have matching hashes" 
                      : "The texts have different hashes"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">First Text Hash ({algorithm}):</p>
                    <p className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono break-all">
                      {textComparisonResult.firstHash}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Second Text Hash ({algorithm}):</p>
                    <p className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono break-all">
                      {textComparisonResult.secondHash}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </>
  )
} 