"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Link } from "@/components/ui/link"
import { LinkIcon, Copy, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  generatePersonData, 
  PersonOutputFormat, 
  PersonField, 
  getPersonFields 
} from "shared"

export default function PersonGenerator() {
  const [selectedFields, setSelectedFields] = useState<PersonField[]>([
    PersonField.FULL_NAME,
    PersonField.EMAIL,
    PersonField.PHONE,
    PersonField.ADDRESS,
    PersonField.JOB_TITLE
  ])
  const [count, setCount] = useState<number>(1)
  const [format, setFormat] = useState<PersonOutputFormat>(PersonOutputFormat.JSON)
  const [includeLabels, setIncludeLabels] = useState<boolean>(true)
  const [output, setOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)

  const availableFields = getPersonFields()
  
  const toggleField = (field: PersonField) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field))
    } else {
      setSelectedFields([...selectedFields, field])
    }
  }
  
  const handleGenerate = () => {
    try {
      if (selectedFields.length === 0) {
        throw new Error("Please select at least one field")
      }
      
      const result = generatePersonData({
        fields: selectedFields,
        count,
        format,
        includeLabels
      })
      
      setOutput(result)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
      setOutput("")
    }
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Person Generator"
          description="Generate realistic person data with customizable fields in multiple formats."
        />
        
        {/* Related Tools */}
        <div className="flex items-center gap-3 mt-2 mb-8">
          <span className="text-sm text-muted-foreground">Related tool:</span>
          <Link href="/tools/file-generator" className="flex items-center gap-1.5 text-sm">
            <LinkIcon className="h-3.5 w-3.5" />
            File Generator
          </Link>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-6">
          {/* Left Column - Controls */}
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <Label htmlFor="format">Output Format</Label>
              <Select 
                value={format} 
                onValueChange={(value) => setFormat(value as PersonOutputFormat)}
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PersonOutputFormat.JSON}>JSON</SelectItem>
                  <SelectItem value={PersonOutputFormat.XML}>XML</SelectItem>
                  <SelectItem value={PersonOutputFormat.TEXT}>Text</SelectItem>
                  <SelectItem value={PersonOutputFormat.CSV}>CSV</SelectItem>
                  <SelectItem value={PersonOutputFormat.YAML}>YAML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="count">Number of People</Label>
              <Select 
                value={count.toString()} 
                onValueChange={(value) => setCount(parseInt(value))}
              >
                <SelectTrigger id="count">
                  <SelectValue placeholder="Number of people" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {format === PersonOutputFormat.TEXT && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="includeLabels" 
                  checked={includeLabels}
                  onCheckedChange={(checked) => setIncludeLabels(checked === true)}
                />
                <Label htmlFor="includeLabels">Include field labels in text output</Label>
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Fields to Include</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableFields.map(({ field, description }) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox 
                      id={field}
                      checked={selectedFields.includes(field)}
                      onCheckedChange={() => toggleField(field)}
                    />
                    <Label htmlFor={field}>{description}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={handleGenerate}
              disabled={selectedFields.length === 0}
            >
              Generate Person Data
            </Button>
          </div>
          
          {/* Right Column - Output */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="output">Output</Label>
              {output && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopy}
                  className="h-8 gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
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
                id="output"
                value={output}
                readOnly
                className="font-mono min-h-[250px] h-full"
                placeholder="Generated person data will appear here..."
              />
            )}
          </div>
        </div>
      </Container>
      
      <PersonGeneratorExplanation />
    </>
  )
}


function PersonGeneratorExplanation() {
  return (
    <Container className="py-8 md:py-12">
      <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-6">
        <h2 className="text-2xl font-bold">About Person Generator</h2>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Tool Capabilities</h3>
          <p>
            The Person Generator creates realistic fake person data for testing, development, and demonstration purposes.
            It allows you to customize exactly which fields to include and supports multiple output formats.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Generate one or multiple person records at once</li>
            <li>Choose from 12 different person data fields</li>
            <li>Output in JSON, XML, Text, CSV, or YAML formats</li>
            <li>Customize text output with or without field labels</li>
            <li>Copy results to clipboard with one click</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Common Use Cases</h3>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Database Testing</strong>
              <p>Generate realistic test data to populate databases during development and testing phases.</p>
            </li>
            <li>
              <strong>UI Prototyping</strong>
              <p>Create sample user profiles to populate UI mockups and prototypes with realistic content.</p>
            </li>
            <li>
              <strong>API Development</strong>
              <p>Generate sample request/response payloads when building or testing APIs that handle person data.</p>
            </li>
            <li>
              <strong>Data Visualization</strong>
              <p>Create sample datasets for testing data visualization components and reports.</p>
            </li>
            <li>
              <strong>Documentation Examples</strong>
              <p>Generate realistic examples for API documentation, user guides, and technical specifications.</p>
            </li>
            <li>
              <strong>Form Testing</strong>
              <p>Create test data for validating form inputs and submission processes.</p>
            </li>
            <li>
              <strong>CSV/Excel Import Testing</strong>
              <p>Generate CSV data to test import functionality in applications that process user information.</p>
            </li>
          </ol>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Technical Details</h3>
          <p>
            The Person Generator uses the Faker.js library to create realistic, localized person data.
            All data is generated locally in your browser without sending any information to external servers.
          </p>
          <p>
            The tool supports multiple output formats through specialized formatters:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>JSON: Structured data with proper nesting and indentation</li>
            <li>XML: Well-formed XML with proper escaping of special characters</li>
            <li>Text: Human-readable format with optional field labels</li>
            <li>CSV: Comma-separated values with header row and proper escaping</li>
            <li>YAML: Human-readable data serialization format</li>
          </ul>
          <p>
            For performance reasons, the tool limits generation to 100 records at once.
            All processing happens client-side for maximum privacy and security.
          </p>
        </div>
      </div>
    </Container>
  )
}
