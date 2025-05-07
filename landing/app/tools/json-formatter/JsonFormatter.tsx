"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { formatJson, JsonIndentationType } from "shared";
import { useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import JsonFormatterExplanation from "./JsonFormatterExplanation";
import JsonFormatterCategories from "./JsonFormatterCategories";

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [indentation, setIndentation] = useState<JsonIndentationType>(JsonIndentationType.TwoSpaces);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      const formatted = formatJson(inputJson, { indentation });
      setOutputJson(formatted);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setOutputJson("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectChange = (value: string) => {
    switch (value) {
      case "2-spaces":
        setIndentation(JsonIndentationType.TwoSpaces);
        break;
      case "4-spaces":
        setIndentation(JsonIndentationType.FourSpaces);
        break;
      case "1-tab":
        setIndentation(JsonIndentationType.OneTab);
        break;
      case "minified":
        setIndentation(JsonIndentationType.Minified);
        break;
    }
  };

  const getSelectValue = () => {
    switch (indentation) {
      case JsonIndentationType.TwoSpaces:
        return "2-spaces";
      case JsonIndentationType.FourSpaces:
        return "4-spaces";
      case JsonIndentationType.OneTab:
        return "1-tab";
      case JsonIndentationType.Minified:
        return "minified";
      default:
        return "2-spaces";
    }
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <h1 className="text-4xl font-bold text-center mb-3">JSON Formatter</h1>
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-10">
          Format and beautify your JSON with customizable indentation options.
        </p>

        <div className="space-y-4">
          {/* Headers Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Input Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between flex-wrap gap-2">
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
                  <Label htmlFor="two-spaces" className="text-sm cursor-pointer">
                    2 spaces
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={JsonIndentationType.FourSpaces} id="four-spaces" />
                  <Label htmlFor="four-spaces" className="text-sm cursor-pointer">
                    4 spaces
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={JsonIndentationType.OneTab} id="one-tab" />
                  <Label htmlFor="one-tab" className="text-sm cursor-pointer">
                    1 tab
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={JsonIndentationType.Minified} id="minified" />
                  <Label htmlFor="minified" className="text-sm cursor-pointer">
                    Minified
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Output Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between h-9">
              <Label htmlFor="output-json">Formatted JSON</Label>
              <div className="min-w-[85px] h-8 flex justify-end">
                {outputJson ? (
                  <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleCopy}>
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
                id="input-json"
                className="min-h-[300px] font-mono w-full"
                placeholder="Paste your JSON here..."
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
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
                  id="output-json"
                  className="min-h-[300px] font-mono w-full"
                  placeholder="Formatted JSON will appear here..."
                  value={outputJson}
                  readOnly
                />
              )}
            </div>
          </div>

          {/* Button Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2">
              <Button onClick={handleFormat} className="w-full">
                Format JSON
              </Button>
            </div>
            <div className="w-full md:w-1/2">{/* Empty space to align with button */}</div>
          </div>
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <JsonFormatterExplanation />
      </Container>

      {/* Add the categories section */}
      <Container className="py-8 md:py-12">
        <JsonFormatterCategories />
      </Container>
    </>
  );
}
