"use client"

import { useState, useCallback, useRef } from "react"
import { 
  generateHash, 
  generateAllHashes,
  verifyTextHash,
  TextHashAlgorithm as HashAlgorithm,
  HASH_ALGORITHM_GROUPS
} from "shared"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, Copy, AlertCircle, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import TextHashGeneratorExplanation from "./TextHashGeneratorExplanation"

export default function TextHashGenerator() {
  const [text, setText] = useState("")
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>(HashAlgorithm.SHA256)
  const [hashOutput, setHashOutput] = useState("")
  const [verifyHash, setVerifyHash] = useState("")
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)
  const [allHashesOutput, setAllHashesOutput] = useState<Record<HashAlgorithm, string> | null>(null)
  const [uppercase, setUppercase] = useState(false)
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  /**
   * Generates a hash based on the current text and selected algorithm
   */
  const generateHashOutput = useCallback(() => {
    if (!text) return
    
    try {
      const hash = generateHash(text, { algorithm, uppercase })
      setHashOutput(hash)
    } catch (error) {
      console.error(error)
    }
  }, [text, algorithm, uppercase])

  /**
   * Generates hashes using all available algorithms
   */
  const generateAllHashesOutput = useCallback(() => {
    if (!text) return
    
    try {
      const hashes = generateAllHashes(text, uppercase)
      setAllHashesOutput(hashes)
    } catch (error) {
      console.error(error)
    }
  }, [text, uppercase])

  /**
   * Verifies if the input text produces the expected hash
   */
  const verifyTextHashOutput = useCallback(() => {
    if (!text || !verifyHash) return
    
    try {
      const result = verifyTextHash(text, verifyHash, algorithm)
      setVerificationResult(result)
    } catch (error) {
      console.error(error)
      setVerificationResult(false)
    }
  }, [text, verifyHash, algorithm])

  /**
   * Copies text to clipboard and shows a success indicator
   * @param textToCopy - The text to copy to clipboard
   */
  const copyToClipboard = useCallback((textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        setCopied(false)
        timeoutRef.current = null
      }, 2000)
    })
  }, [])

  /**
   * Renders algorithm buttons grouped by category
   */
  const renderAlgorithmButtons = useCallback(() => {
    return Object.entries(HASH_ALGORITHM_GROUPS).map(([groupName, groupData]) => (
      <div key={groupName} className="mb-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{groupName}</h3>
        <div className="flex flex-wrap gap-2">
          {groupData.algorithms.map((alg: HashAlgorithm) => (
            <Button
              key={alg}
              size="sm"
              variant={algorithm === alg ? "default" : "outline"}
              onClick={() => setAlgorithm(alg)}
              className="text-xs md:text-sm"
            >
              {alg}
            </Button>
          ))}
        </div>
      </div>
    ))
  }, [algorithm])

  return (
    <>
      <Container className="py-6 md:py-8">
        <h1 className="text-2xl font-bold mb-2">Text Hash Generator</h1>
        <p className="mb-6 text-gray-500">Generate cryptographic hashes from text using various algorithms.</p>
        
        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tool: </span>
          <Link 
            href="/tools/file-hash-compare" 
            className="text-primary hover:underline"
          >
            File & Text Hash Compare
          </Link>
        </div>
        
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="verify">Verify</TabsTrigger>
            <TabsTrigger value="all">All Algorithms</TabsTrigger>
          </TabsList>

          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Generate Hash</CardTitle>
                <CardDescription>Enter text and select an algorithm to generate a hash</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="input-text">Input Text</Label>
                    <Textarea
                      id="input-text"
                      placeholder="Enter text to hash..."
                      className="mt-1 h-32"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label className="block mb-2">Select Algorithm</Label>
                    <div className="max-h-48 overflow-y-auto pr-2 pb-2">
                      {renderAlgorithmButtons()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="uppercase" className="cursor-pointer">
                      Uppercase Output
                    </Label>
                    <input
                      id="uppercase"
                      type="checkbox"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  
                  <Button onClick={generateHashOutput} className="w-full">
                    Generate Hash
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {hashOutput && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Hash Output</CardTitle>
                  <CardDescription>{algorithm}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="p-4 bg-gray-100 rounded font-mono text-xs md:text-sm break-all">
                      {hashOutput}
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(hashOutput)}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle>Verify Hash</CardTitle>
                <CardDescription>Check if text produces an expected hash</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="verify-text">Input Text</Label>
                    <Textarea
                      id="verify-text"
                      placeholder="Enter text to verify..."
                      className="mt-1 h-24"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="verify-hash">Expected Hash</Label>
                    <Input
                      id="verify-hash"
                      placeholder="Enter expected hash..."
                      className="mt-1 font-mono"
                      value={verifyHash}
                      onChange={(e) => setVerifyHash(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label className="block mb-2">Algorithm</Label>
                    <div className="max-h-32 overflow-y-auto pr-2 pb-2">
                      {renderAlgorithmButtons()}
                    </div>
                  </div>
                  
                  <Button onClick={verifyTextHashOutput} className="w-full">
                    Verify Hash
                  </Button>

                  {verificationResult !== null && (
                    <Alert variant={verificationResult ? "default" : "destructive"} className="mt-4">
                      <div className="flex items-center gap-2">
                        {verificationResult ? 
                          <Check className="h-4 w-4 text-green-500" /> :
                          <AlertCircle className="h-4 w-4" />
                        }
                        <AlertDescription>
                          {verificationResult ? 
                            "Hash verification successful! The text produces the expected hash." :
                            "Hash verification failed. The text does not produce the expected hash."
                          }
                        </AlertDescription>
                      </div>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Generate All Hashes</CardTitle>
                <CardDescription>Generate hashes using all available algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="all-text">Input Text</Label>
                    <Textarea
                      id="all-text"
                      placeholder="Enter text to hash with all algorithms..."
                      className="mt-1 h-32"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="uppercase-all" className="cursor-pointer">
                      Uppercase Output
                    </Label>
                    <input
                      id="uppercase-all"
                      type="checkbox"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  
                  <Button onClick={generateAllHashesOutput} className="w-full">
                    Generate All Hashes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {allHashesOutput && (
              <div className="mt-6 space-y-4">
                {Object.entries(HASH_ALGORITHM_GROUPS).map(([groupName, groupData]) => (
                  <Card key={groupName}>
                    <CardHeader>
                      <CardTitle>{groupName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {groupData.algorithms.map((alg: HashAlgorithm) => (
                          <div key={alg}>
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium">{alg}</p>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(allHashesOutput[alg])}
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                              </Button>
                            </div>
                            <div className="p-3 bg-gray-100 rounded font-mono text-xs break-all">
                              {allHashesOutput[alg]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Container>

      <Container className="py-8 md:py-12">
        <TextHashGeneratorExplanation />
      </Container>
    </>
  )
} 