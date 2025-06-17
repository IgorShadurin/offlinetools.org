import { useState, useEffect } from "react";
import { AlertCircle, Check, Copy, FileText } from "lucide-react";
import {
  extractTextFromHtml,
  HtmlLinkHandlingOption,
  HtmlTextExtractorOptions,
  DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
} from "shared/html-text-extractor";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert } from "./ui/alert";
import { Input } from "./ui/input";
import { Select, SelectOption } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

/**
 * Props for the HtmlTextExtractor component
 * @interface HtmlTextExtractorProps
 */
interface HtmlTextExtractorProps {
  className?: string;
}

/**
 * HTML Text Extractor component for extracting plain text from HTML
 * @param props - Component props
 * @returns HtmlTextExtractor component
 */
export function HtmlTextExtractor({ className = "" }: HtmlTextExtractorProps) {
  const [inputHtml, setInputHtml] = useState("");
  const [outputText, setOutputText] = useState("");
  const [options, setOptions] = useState<HtmlTextExtractorOptions>(DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Check for clipboard content when component mounts
  useEffect(() => {
    const clipboardContent = localStorage.getItem('clipboard-content-for-tool');
    if (clipboardContent) {
      setInputHtml(clipboardContent);
      // Clear the stored content after using it
      localStorage.removeItem('clipboard-content-for-tool');
    }
  }, []);

  /**
   * Handle text extraction from HTML
   */
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

  /**
   * Copy output to clipboard
   */
  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Handle link handling option change
   */
  const handleLinkHandlingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions({
      ...options,
      linkHandling: event.target.value as HtmlLinkHandlingOption,
    });
  };

  /**
   * Handle preserve newlines option change
   */
  const handlePreserveNewlinesChange = (checked: boolean) => {
    setOptions({
      ...options,
      preserveNewlines: checked,
    });
  };

  /**
   * Handle remove images option change
   */
  const handleRemoveImagesChange = (checked: boolean) => {
    setOptions({
      ...options,
      removeImages: checked,
    });
  };

  /**
   * Handle include image alt text option change
   */
  const handleIncludeImageAltChange = (checked: boolean) => {
    setOptions({
      ...options,
      includeImageAlt: checked,
    });
  };

  /**
   * Handle wordwrap option change
   */
  const handleWordwrapChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      wordwrap: Number(event.target.value) || 0,
    });
  };

  /**
   * Save output to file
   */
  const handleSaveOutput = () => {
    if (!outputText) return;
    
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Card className="flex-1 flex flex-col">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <CardTitle>HTML Text Extractor</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Input/Output Section */}
          <div className="flex gap-4 flex-1">
            {/* Input Section */}
            <div className="flex-1 flex flex-col space-y-2">
              <label className="text-sm font-medium">Input HTML</label>
              <Textarea
                className="flex-1 font-mono text-sm"
                placeholder="Paste your HTML here..."
                value={inputHtml}
                onChange={(e) => setInputHtml(e.target.value)}
              />
            </div>

            {/* Output Section */}
            <div className="flex-1 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Extracted Text</label>
                <div className="flex gap-2">
                  {outputText && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopy}
                        className="flex items-center gap-1"
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSaveOutput}
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {error ? (
                <Alert variant="destructive" className="flex-1">
                  <AlertCircle className="h-4 w-4" />
                  <div>
                    <h4 className="font-medium">Error</h4>
                    <p>{error}</p>
                  </div>
                </Alert>
              ) : (
                <Textarea
                  className="flex-1 font-mono text-sm"
                  placeholder="Extracted text will appear here..."
                  value={outputText}
                  readOnly
                />
              )}
            </div>
          </div>

          {/* Options Section */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Link Handling */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Link Handling</label>
                <Select value={options.linkHandling} onChange={handleLinkHandlingChange}>
                  <SelectOption value={HtmlLinkHandlingOption.Remove}>Remove</SelectOption>
                  <SelectOption value={HtmlLinkHandlingOption.KeepText}>Keep text</SelectOption>
                  <SelectOption value={HtmlLinkHandlingOption.ShowAsMarkdown}>Show as markdown</SelectOption>
                </Select>
              </div>

              {/* Wordwrap */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Wordwrap (0 for no limit)</label>
                <Input
                  type="number"
                  min="0"
                  value={options.wordwrap}
                  onChange={handleWordwrapChange}
                />
              </div>

              {/* Checkbox Options */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={options.preserveNewlines}
                    onCheckedChange={handlePreserveNewlinesChange}
                  />
                  <label className="text-sm cursor-pointer">
                    Preserve newlines
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={options.removeImages}
                    onCheckedChange={handleRemoveImagesChange}
                  />
                  <label className="text-sm cursor-pointer">
                    Remove images
                  </label>
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <Checkbox
                    checked={options.includeImageAlt}
                    onCheckedChange={handleIncludeImageAltChange}
                    disabled={!options.removeImages}
                  />
                  <label className={`text-sm cursor-pointer ${!options.removeImages ? 'text-muted-foreground' : ''}`}>
                    Include image alt text
                  </label>
                </div>
              </div>

              {/* Extract Button */}
              <div className="flex items-end">
                <Button onClick={handleExtract} className="w-full">
                  Extract Text
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 