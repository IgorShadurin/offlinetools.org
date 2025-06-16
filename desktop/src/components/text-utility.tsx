import React, { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, Type } from "lucide-react";
import { 
  processText,
  TextUtilityOperation,
  LineBreakType,
  CaseType,
  SortType,
  DEFAULT_TEXT_UTILITY_OPTIONS
} from "../../../shared";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectOption } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "../lib/utils";

interface TextUtilityProps {
  className?: string;
}

export function TextUtility({ className }: TextUtilityProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState<TextUtilityOperation>(TextUtilityOperation.CASE_CONVERSION);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const [lineBreakType, setLineBreakType] = useState<LineBreakType>(LineBreakType.LF);
  const [caseType, setCaseType] = useState<CaseType>(CaseType.LOWER);
  const [sortType, setSortType] = useState<SortType>(SortType.ALPHABETIZE);

  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      setInput(clipboardContent);
      localStorage.removeItem('clipboard-content-for-tool');
      
      try {
        const result = processText(clipboardContent, {
          operation: activeTab,
          lineBreakType,
          caseType,
          sortType
        });
        setOutput(result);
        setError(null);
      } catch (error) {
      }
    }
  }, []);

  const handleProcess = () => {
    try {
      let options: any = { operation: activeTab };
      
      switch (activeTab) {
        case TextUtilityOperation.LINE_BREAK_CONVERSION:
          options = { ...options, lineBreakType };
          break;
        case TextUtilityOperation.CASE_CONVERSION:
          options = { ...options, caseType };
          break;
        case TextUtilityOperation.LINE_SORTING:
          options = { ...options, sortType };
          break;
      }
      
      const result = processText(input, options);
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

  const handleTabChange = (value: string) => {
    setActiveTab(value as TextUtilityOperation);
    setError(null);
    if (input) {
      setTimeout(() => {
        handleProcess();
      }, 0);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className={cn("p-4 h-full flex flex-col", className)}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Text Utility</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 flex-1 flex flex-col">
            <div className="flex flex-row justify-between items-center">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-auto"
              >
                <TabsList className="grid grid-cols-3 w-[400px]">
                  <TabsTrigger value={TextUtilityOperation.CASE_CONVERSION}>Case</TabsTrigger>
                  <TabsTrigger value={TextUtilityOperation.LINE_BREAK_CONVERSION}>Line Breaks</TabsTrigger>
                  <TabsTrigger value={TextUtilityOperation.LINE_SORTING}>Sort Lines</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-3">
                {activeTab === TextUtilityOperation.CASE_CONVERSION && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Type:</span>
                    <div className="relative border rounded-md overflow-hidden h-9 px-2 flex items-center bg-background">
                      <Select
                        value={caseType}
                        onChange={(e) => setCaseType(e.target.value as CaseType)}
                        className="w-40 border-0 h-8 px-1 focus:ring-0 appearance-none"
                      >
                        {Object.values(CaseType).map((type) => (
                          <SelectOption key={type} value={type}>
                            {type}
                          </SelectOption>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}

                {activeTab === TextUtilityOperation.LINE_BREAK_CONVERSION && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Type:</span>
                    <div className="relative border rounded-md overflow-hidden h-9 px-2 flex items-center bg-background">
                      <Select
                        value={lineBreakType}
                        onChange={(e) => setLineBreakType(e.target.value as LineBreakType)}
                        className="w-40 border-0 h-8 px-1 focus:ring-0 appearance-none"
                      >
                        <SelectOption value={LineBreakType.LF}>LF (\n) - Unix</SelectOption>
                        <SelectOption value={LineBreakType.CRLF}>CRLF (\r\n) - Windows</SelectOption>
                      </Select>
                    </div>
                  </div>
                )}

                {activeTab === TextUtilityOperation.LINE_SORTING && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Type:</span>
                    <div className="relative border rounded-md overflow-hidden h-9 px-2 flex items-center bg-background">
                      <Select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value as SortType)}
                        className="w-40 border-0 h-8 px-1 focus:ring-0 appearance-none"
                      >
                        {Object.values(SortType).map((type) => (
                          <SelectOption key={type} value={type}>
                            {type}
                          </SelectOption>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-1 flex justify-between">
                <label htmlFor="input-text" className="text-sm font-medium">
                  Input Text
                </label>
              </div>
              <Textarea
                id="input-text"
                className="flex-1 min-h-[150px] font-mono"
                placeholder="Enter text to process..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="flex justify-between my-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={!input && !output}
              >
                Clear
              </Button>
              <Button onClick={handleProcess} size="default" disabled={!input.trim()}>
                Process Text
              </Button>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <div className="mb-1 flex justify-between">
                <label htmlFor="output-text" className="text-sm font-medium">
                  Output
                </label>
                {output && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 h-7 px-2 text-xs"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                )}
              </div>
              <Textarea
                id="output-text"
                className="flex-1 min-h-[150px] font-mono"
                placeholder="Processed text will appear here..."
                value={output}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
