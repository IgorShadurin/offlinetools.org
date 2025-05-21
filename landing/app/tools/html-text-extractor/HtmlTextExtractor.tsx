"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { extractTextFromHtml, HtmlLinkHandlingOption, HtmlTextExtractorOptions, DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS } from "shared";
import { useState } from "react";
import { AlertCircle, Check, Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import HtmlTextExtractorExplanation from "./HtmlTextExtractorExplanation";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export default function HtmlTextExtractor() {
  const [inputHtml, setInputHtml] = useState("");
  const [outputText, setOutputText] = useState("");
  const [options, setOptions] = useState<HtmlTextExtractorOptions>(DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleExtract = () => {
    try {
      const extracted = extractTextFromHtml(inputHtml, options);
      setOutputText(extracted);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
      setOutputText("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkHandlingChange = (value: string) => {
    setOptions({
      ...options,
      linkHandling: value as HtmlLinkHandlingOption,
    });
  };

  const handlePreserveNewlinesChange = (checked: boolean) => {
    setOptions({
      ...options,
      preserveNewlines: checked,
    });
  };

  const handleRemoveImagesChange = (checked: boolean) => {
    setOptions({
      ...options,
      removeImages: checked,
    });
  };

  const handleIncludeImageAltChange = (checked: boolean) => {
    setOptions({
      ...options,
      includeImageAlt: checked,
    });
  };

  const handleWordwrapChange = (value: string) => {
    setOptions({
      ...options,
      wordwrap: parseInt(value) || 0,
    });
  };

  return (
    <>
      <Container className="py-8 md:py-12">
        <h1 className="text-4xl font-bold text-center mb-3">HTML Text Extractor</h1>
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto mb-10">
          Extract plain text from HTML content with customizable options for handling links, images, and formatting.
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Related tools:</span>
          <Link
            href="/tools/json-formatter"
            className="text-sm inline-flex items-center gap-1 hover:underline"
          >
            <LinkIcon className="h-3.5 w-3.5" />
            JSON Formatter
          </Link>
          <Link
            href="/tools/url-encoder"
            className="text-sm inline-flex items-center gap-1 hover:underline"
          >
            <LinkIcon className="h-3.5 w-3.5" />
            URL Encoder/Decoder
          </Link>
        </div>

        <div className="space-y-4">
          {/* Headers Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            {/* Input Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between">
              <Label htmlFor="input-html">Input HTML</Label>
            </div>

            {/* Output Section Header */}
            <div className="w-full md:w-1/2 flex items-center justify-between h-9">
              <Label htmlFor="output-text">Extracted Text</Label>
              <div className="min-w-[85px] h-8 flex justify-end">
                {outputText ? (
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
                id="input-html"
                className="min-h-[300px] font-mono w-full"
                placeholder="Paste your HTML here..."
                value={inputHtml}
                onChange={(e) => setInputHtml(e.target.value)}
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
                  className="min-h-[300px] font-mono w-full"
                  placeholder="Extracted text will appear here..."
                  value={outputText}
                  readOnly
                />
              )}
            </div>
          </div>

          {/* Options Row */}
          <div className="flex flex-wrap md:flex-nowrap gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="link-handling">Link Handling</Label>
                  <Select
                    value={options.linkHandling}
                    onValueChange={handleLinkHandlingChange}
                  >
                    <SelectTrigger id="link-handling">
                      <SelectValue placeholder="Select link handling" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={HtmlLinkHandlingOption.Remove}>Remove</SelectItem>
                      <SelectItem value={HtmlLinkHandlingOption.KeepText}>Keep text</SelectItem>
                      <SelectItem value={HtmlLinkHandlingOption.ShowAsMarkdown}>Show as markdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wordwrap">Wordwrap (0 for no limit)</Label>
                  <Input
                    id="wordwrap"
                    type="number"
                    min="0"
                    value={options.wordwrap}
                    onChange={(e) => handleWordwrapChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="preserve-newlines"
                    checked={options.preserveNewlines}
                    onCheckedChange={handlePreserveNewlinesChange}
                  />
                  <Label htmlFor="preserve-newlines" className="cursor-pointer">
                    Preserve newlines
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remove-images"
                    checked={options.removeImages}
                    onCheckedChange={handleRemoveImagesChange}
                  />
                  <Label htmlFor="remove-images" className="cursor-pointer">
                    Remove images
                  </Label>
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <Checkbox
                    id="include-image-alt"
                    checked={options.includeImageAlt}
                    onCheckedChange={handleIncludeImageAltChange}
                    disabled={!options.removeImages}
                  />
                  <Label
                    htmlFor="include-image-alt"
                    className={`cursor-pointer ${!options.removeImages ? "text-muted-foreground" : ""}`}
                  >
                    Include image alt text
                  </Label>
                </div>
              </div>

              <Button onClick={handleExtract} className="w-full">
                Extract Text
              </Button>
            </div>
            <div className="w-full md:w-1/2">{/* Empty space to align with button */}</div>
          </div>
        </div>
      </Container>

      {/* Add the explanation section */}
      <Container className="py-8 md:py-12">
        <HtmlTextExtractorExplanation />
      </Container>
    </>
  );
}
