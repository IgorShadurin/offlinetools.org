"use client"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { encodeUrl, decodeUrl } from "shared"
import { useState } from "react"
import { AlertCircle, Check, Copy } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import UrlEncoderExplanation from "./UrlEncoderExplanation"

export default function UrlEncoder() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("encode")
  const [useEscapeUnescape, setUseEscapeUnescape] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  
  const handleProcess = () => {
    try {
      let result = ""
      if (activeTab === "encode") {
        result = encodeUrl(inputText, { useEscapeUnescape })
      } else {
        result = decodeUrl(inputText, { useEscapeUnescape })
      }
      setOutputText(result)
      setError(null)
    } catch (error) {
      setError((error as Error).message)
      setOutputText("")
    }
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as "encode" | "decode")
    setOutputText("")
    setError(null)
  }
  
  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="URL Encoder/Decoder"
          description="Encode text for use in URLs or decode URL-encoded text. Supports both modern and legacy encoding methods."
        />
        
        <div className="space-y-4">
          {/* Tabs */}
          <Tabs 
            defaultValue="encode" 
            value={activeTab} 
            onValueChange={handleTabChange} 
            className="w-full"
          >
            <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-4">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Headers Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Input Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between flex-wrap gap-2">
              <Label htmlFor="input-text">
                {activeTab === "encode" ? "Text to Encode" : "Text to Decode"}
              </Label>
              
              {/* Mobile: Dropdown Select */}
              <div className="md:hidden w-full sm:w-auto">
                <Select 
                  value={useEscapeUnescape ? "legacy" : "modern"} 
                  onValueChange={(v) => setUseEscapeUnescape(v === "legacy")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern (encodeURIComponent)</SelectItem>
                    <SelectItem value="legacy">Legacy (escape)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Desktop: Radio Buttons */}
              <RadioGroup
                value={useEscapeUnescape ? "legacy" : "modern"}
                onValueChange={(v) => setUseEscapeUnescape(v === "legacy")}
                className="hidden md:flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="modern" id="modern" />
                  <Label htmlFor="modern" className="text-sm cursor-pointer">
                    Modern (encodeURIComponent)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="legacy" id="legacy" />
                  <Label htmlFor="legacy" className="text-sm cursor-pointer">
                    Legacy (escape)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Output Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between h-9">
              <Label htmlFor="output-text">
                {activeTab === "encode" ? "Encoded URL" : "Decoded Text"}
              </Label>
              <div className="min-w-[85px] h-8 flex justify-end">
                {outputText ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Textareas Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Input Textarea */}
            <div className="w-full md:w-1/2">
              <Textarea
                id="input-text"
                className="min-h-[250px] font-mono w-full"
                placeholder={activeTab === "encode" 
                  ? "Enter text to encode..." 
                  : "Enter encoded text to decode..."
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            {/* Output Textarea */}
            <div className="w-full md:w-1/2">
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                <Textarea
                  id="output-text"
                  className="min-h-[250px] font-mono w-full"
                  placeholder={activeTab === "encode" 
                    ? "Encoded URL will appear here..." 
                    : "Decoded text will appear here..."
                  }
                  value={outputText}
                  readOnly
                />
              )}
            </div>
          </div>

          {/* Button Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2">
              <Button onClick={handleProcess} className="w-full">
                {activeTab === "encode" ? "Encode URL" : "Decode URL"}
              </Button>
            </div>
            <div className="w-full md:w-1/2">
              {/* Empty space to align with button */}
            </div>
          </div>
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <UrlEncoderExplanation />
      </Container>
    </>
  )
} 