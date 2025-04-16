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
import { formatJson, JsonIndentationType } from "shared"
import { useState } from "react"
import { AlertCircle, Check, Copy } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState("")
  const [outputJson, setOutputJson] = useState("")
  const [indentation, setIndentation] = useState<JsonIndentationType>(JsonIndentationType.TwoSpaces)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleFormat = () => {
    try {
      const formatted = formatJson(inputJson, { indentation })
      setOutputJson(formatted)
      setError(null)
    } catch (error) {
      setError((error as Error).message)
      setOutputJson("")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSelectChange = (value: string) => {
    switch (value) {
      case "2-spaces":
        setIndentation(JsonIndentationType.TwoSpaces)
        break
      case "4-spaces":
        setIndentation(JsonIndentationType.FourSpaces)
        break
      case "1-tab":
        setIndentation(JsonIndentationType.OneTab)
        break
      case "minified":
        setIndentation(JsonIndentationType.Minified)
        break
    }
  }

  const getSelectValue = () => {
    switch (indentation) {
      case JsonIndentationType.TwoSpaces:
        return "2-spaces"
      case JsonIndentationType.FourSpaces:
        return "4-spaces"
      case JsonIndentationType.OneTab:
        return "1-tab"
      case JsonIndentationType.Minified:
        return "minified"
      default:
        return "2-spaces"
    }
  }

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="JSON Formatter"
          description="Format and beautify your JSON with customizable indentation options."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Label htmlFor="input-json">Input JSON</Label>
              
              {/* Mobile: Dropdown Select */}
              <div className="md:hidden w-full sm:w-auto">
                <Select value={getSelectValue()} onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-spaces">2 spaces</SelectItem>
                    <SelectItem value="4-spaces">4 spaces</SelectItem>
                    <SelectItem value="1-tab">1 tab</SelectItem>
                    <SelectItem value="minified">Minified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Desktop: Radio Buttons */}
              <RadioGroup
                value={indentation}
                onValueChange={(value) => setIndentation(value as JsonIndentationType)}
                className="hidden md:flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={JsonIndentationType.TwoSpaces} id="two-spaces" />
                  <Label htmlFor="two-spaces" className="text-sm cursor-pointer">2 spaces</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={JsonIndentationType.FourSpaces} id="four-spaces" />
                  <Label htmlFor="four-spaces" className="text-sm cursor-pointer">4 spaces</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={JsonIndentationType.OneTab} id="one-tab" />
                  <Label htmlFor="one-tab" className="text-sm cursor-pointer">1 tab</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={JsonIndentationType.Minified} id="minified" />
                  <Label htmlFor="minified" className="text-sm cursor-pointer">Minified</Label>
                </div>
              </RadioGroup>
            </div>
            <Textarea
              id="input-json"
              className="min-h-[300px] font-mono"
              placeholder="Paste your JSON here..."
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
            />
            <Button onClick={handleFormat} className="w-full">Format JSON</Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="output-json">Formatted JSON</Label>
              {outputJson && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              )}
            </div>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <Textarea
                id="output-json"
                className="min-h-[300px] font-mono"
                placeholder="Formatted JSON will appear here..."
                value={outputJson}
                readOnly
              />
            )}
          </div>
        </div>
      </Container>
    </>
  )
} 