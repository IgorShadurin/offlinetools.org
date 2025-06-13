"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, Copy, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { 
  processText,
  LineBreakType,
  CaseType,
  SortType,
  TextUtilityOperation
} from "shared";

export default function TextUtility() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TextUtilityOperation>(TextUtilityOperation.CASE_CONVERSION);
  
  const [lineBreakType, setLineBreakType] = useState<LineBreakType>(LineBreakType.LF);
  const [caseType, setCaseType] = useState<CaseType>(CaseType.LOWER);
  const [sortType, setSortType] = useState<SortType>(SortType.ALPHABETIZE);

  const handleProcess = () => {
    try {
      let result = "";
      
      switch (activeTab) {
        case TextUtilityOperation.LINE_BREAK_CONVERSION:
          result = processText(input, {
            operation: TextUtilityOperation.LINE_BREAK_CONVERSION,
            lineBreakType
          });
          break;
        case TextUtilityOperation.CASE_CONVERSION:
          result = processText(input, {
            operation: TextUtilityOperation.CASE_CONVERSION,
            caseType
          });
          break;
        case TextUtilityOperation.LINE_SORTING:
          result = processText(input, {
            operation: TextUtilityOperation.LINE_SORTING,
            sortType
          });
          break;
      }
      
      setOutput(result);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as TextUtilityOperation);
    setError(null);
    if (input) {
      setTimeout(handleProcess, 0);
    }
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <SectionHeading
          title="Text Utility"
          description="Transform text with line break conversion, case conversion, and line sorting utilities."
        />

        <div className="mb-4 flex items-center text-sm text-muted-foreground gap-2">
          <LinkIcon className="h-4 w-4" />
          <span>Related tools: </span>
          <Link href="/tools/text-to-slug" className="text-primary hover:underline">
            Text to Slug
          </Link>
          <span>•</span>
          <Link href="/tools/html-text-extractor" className="text-primary hover:underline">
            HTML Text Extractor
          </Link>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value={TextUtilityOperation.CASE_CONVERSION}>Case Conversion</TabsTrigger>
            <TabsTrigger value={TextUtilityOperation.LINE_BREAK_CONVERSION}>Line Breaks</TabsTrigger>
            <TabsTrigger value={TextUtilityOperation.LINE_SORTING}>Line Sorting</TabsTrigger>
          </TabsList>

          {/* Operation-specific Controls moved here */}
          {activeTab === TextUtilityOperation.CASE_CONVERSION && (
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
              <div className="w-full md:w-1/4">
                <Label htmlFor="case-type">Case Type</Label>
              </div>
              <div className="w-full md:w-2/4">
                <Select value={caseType} onValueChange={(value) => setCaseType(value as CaseType)}>
                  <SelectTrigger id="case-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(CaseType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/4">
                <Button onClick={handleProcess} disabled={!input.trim()}>
                  Convert
                </Button>
              </div>
            </div>
          )}

          {activeTab === TextUtilityOperation.LINE_BREAK_CONVERSION && (
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
              <div className="w-full md:w-1/4">
                <Label htmlFor="line-break-type">Line Break Type</Label>
              </div>
              <div className="w-full md:w-2/4">
                <Select value={lineBreakType} onValueChange={(value) => setLineBreakType(value as LineBreakType)}>
                  <SelectTrigger id="line-break-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={LineBreakType.LF}>LF (\n) - Unix/Linux</SelectItem>
                    <SelectItem value={LineBreakType.CRLF}>CRLF (\r\n) - Windows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/4">
                <Button onClick={handleProcess} disabled={!input.trim()}>
                  Convert
                </Button>
              </div>
            </div>
          )}

          {activeTab === TextUtilityOperation.LINE_SORTING && (
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
              <div className="w-full md:w-1/4">
                <Label htmlFor="sort-type">Sort Type</Label>
              </div>
              <div className="w-full md:w-2/4">
                <Select value={sortType} onValueChange={(value) => setSortType(value as SortType)}>
                  <SelectTrigger id="sort-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(SortType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-1/4">
                <Button onClick={handleProcess} disabled={!input.trim()}>
                  Sort
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="input-text">Input Text</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  disabled={!input && !output}
                >
                  Clear
                </Button>
              </div>
              <Textarea
                id="input-text"
                className="font-mono min-h-[300px] resize-none"
                placeholder="Enter your text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="output-text">Output</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="flex items-center gap-1"
                  disabled={!output}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <Textarea
                id="output-text"
                className="font-mono min-h-[300px] resize-none"
                placeholder="Processed text will appear here..."
                value={output}
                readOnly
              />
            </div>
          </div>


        </Tabs>
      </Container>
    </>
  );
}
