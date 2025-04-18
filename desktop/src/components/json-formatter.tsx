import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectOption } from "./ui/select";
import { formatJson, JsonIndentationType } from "../../../shared";
import { cn } from "../lib/utils";

/**
 * JSON Formatter component props
 */
interface JsonFormatterProps {
  className?: string;
}

/**
 * JSON Formatter component for formatting and validating JSON
 * @param props - JSON Formatter component props
 * @returns JSON Formatter component
 */
export function JsonFormatter({ className }: JsonFormatterProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>("");
  const [indentation, setIndentation] = useState<JsonIndentationType>(
    JsonIndentationType.TwoSpaces
  );

  // Format JSON when the format button is clicked
  const handleFormatJson = () => {
    try {
      const formatted = formatJson(inputValue, { indentation });
      setOutputValue(formatted);
    } catch (error) {
      setOutputValue(`Error: ${(error as Error).message}`);
    }
  };

  // Clear input and output
  const handleClear = () => {
    setInputValue("");
    setOutputValue("");
  };

  return (
    <div className={`p-4 h-full flex flex-col ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>JSON Format/Validate</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex items-center justify-between p-4 pb-3 border-b">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium whitespace-nowrap">
                Indentation:
              </span>
              <div className="relative border rounded-md overflow-hidden h-9 px-2 flex items-center bg-background">
                <Select
                  id="indentation"
                  value={indentation}
                  onChange={(e) =>
                    setIndentation(e.target.value as JsonIndentationType)
                  }
                  className="w-28 border-0 h-8 px-1 focus:ring-0 appearance-none"
                >
                  {Object.values(JsonIndentationType).map((option) => (
                    <SelectOption key={option} value={option}>
                      {option}
                    </SelectOption>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 font-normal py-1 px-4 rounded-md"
                onClick={handleFormatJson}
              >
                Format JSON
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="font-normal py-1 px-4 rounded-md"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-6 p-4 min-h-0">
            <div className="flex-1 flex flex-col min-h-0">
              <label
                htmlFor="input"
                className="mb-1 text-sm font-medium text-muted-foreground"
              >
                Input:
              </label>
              <Textarea
                id="input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter Your JSON Text"
                className="flex-1 min-h-0 font-mono text-sm resize-none border-muted"
              />
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <label
                htmlFor="output"
                className="mb-1 text-sm font-medium text-muted-foreground"
              >
                Output:
              </label>
              <Textarea
                id="output"
                value={outputValue}
                readOnly
                placeholder="Formatted JSON will appear here"
                className="flex-1 min-h-0 font-mono text-sm resize-none border-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
