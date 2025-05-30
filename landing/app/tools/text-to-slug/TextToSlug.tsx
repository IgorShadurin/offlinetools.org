"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { textToSlug, SeparatorType, TextToSlugOptions } from "shared";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import TextToSlugExplanation from "./TextToSlugExplanation";

export default function TextToSlug() {
  const [inputText, setInputText] = useState("");
  const [outputSlug, setOutputSlug] = useState("");
  const [separator, setSeparator] = useState<SeparatorType>(SeparatorType.DASH);
  const [lowercase, setLowercase] = useState(true);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [strict, setStrict] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const options: TextToSlugOptions = {
      separator,
      lowercase,
      removeNumbers,
      removeStopWords,
      strict
    };
    
    const result = textToSlug(inputText, options);
    setOutputSlug(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputSlug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSeparatorSelectChange = (value: string) => {
    setSeparator(value === "underscore" ? SeparatorType.UNDERSCORE : SeparatorType.DASH);
  };

  const getSeparatorSelectValue = () => {
    return separator === SeparatorType.UNDERSCORE ? "underscore" : "dash";
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <h1 className="text-4xl font-bold text-center mb-3">Text to Slug</h1>
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-10">
          Convert text to URL-friendly slugs with customizable separators and character handling options.
        </p>

        <div className="space-y-4">
          {/* Headers Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Input Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between flex-wrap gap-2">
              <Label htmlFor="input-text">Input Text</Label>
            </div>

            {/* Output Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between h-9">
              <Label htmlFor="output-slug">Generated Slug</Label>
              <div className="min-w-[85px] h-8 flex justify-end">
                {outputSlug ? (
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
                id="input-text"
                className="min-h-[300px] w-full"
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            {/* Output Textarea */}
            <div className="w-full md:w-1/2">
              <Textarea
                id="output-slug"
                className="min-h-[300px] font-mono w-full"
                placeholder="Generated slug will appear here..."
                value={outputSlug}
                readOnly
              />
            </div>
          </div>

          {/* Options Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              {/* Separator Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Separator</Label>
                
                {/* Mobile: Dropdown Select */}
                <div className="md:hidden">
                  <Select value={getSeparatorSelectValue()} onValueChange={handleSeparatorSelectChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select separator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dash">Dash (-)</SelectItem>
                      <SelectItem value="underscore">Underscore (_)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Desktop: Radio Buttons */}
                <RadioGroup
                  value={separator}
                  onValueChange={(value) => setSeparator(value as SeparatorType)}
                  className="hidden md:flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SeparatorType.DASH} id="dash" />
                    <Label htmlFor="dash" className="text-sm cursor-pointer">
                      Dash (-)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={SeparatorType.UNDERSCORE} id="underscore" />
                    <Label htmlFor="underscore" className="text-sm cursor-pointer">
                      Underscore (_)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={lowercase}
                      onCheckedChange={(checked) => setLowercase(checked as boolean)}
                    />
                    <Label htmlFor="lowercase" className="text-sm cursor-pointer">
                      Convert to lowercase
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remove-numbers"
                      checked={removeNumbers}
                      onCheckedChange={(checked) => setRemoveNumbers(checked as boolean)}
                    />
                    <Label htmlFor="remove-numbers" className="text-sm cursor-pointer">
                      Remove numbers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remove-stop-words"
                      checked={removeStopWords}
                      onCheckedChange={(checked) => setRemoveStopWords(checked as boolean)}
                    />
                    <Label htmlFor="remove-stop-words" className="text-sm cursor-pointer">
                      Remove stop words
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="strict"
                      checked={strict}
                      onCheckedChange={(checked) => setStrict(checked as boolean)}
                    />
                    <Label htmlFor="strict" className="text-sm cursor-pointer">
                      Strict mode (URL-safe only)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">{/* Empty space to align with options */}</div>
          </div>

          {/* Button Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2">
              <Button onClick={handleGenerate} className="w-full">
                Generate Slug
              </Button>
            </div>
            <div className="w-full md:w-1/2">{/* Empty space to align with button */}</div>
          </div>
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <TextToSlugExplanation />
      </Container>
    </>
  );
}
