"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section'; // SectionHeading is from section.tsx
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { renderMarkdown, loadMarkdownFile, saveMarkdownFile } from 'shared';
import { AlertCircle, Check, Copy, FileUp, FileDown, Loader2, Trash2 } from 'lucide-react';
import { MarkdownEditorExplanation } from './MarkdownEditorExplanation';

const EXAMPLE_MARKDOWN = `# Welcome to the Markdown Editor

This is a **demonstration** of the Markdown editor. You can see how different elements are rendered:

## Headings

### This is an H3
#### This is an H4
##### This is an H5
###### This is an H6

## Text Formatting

You can make text **bold**, *italic*, or ***both***. You can also ~~strikethrough~~ text.

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Code

Inline code: \`console.log('Hello, World!')\`

Code block:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Links and Images

[Visit OpenAI](https://openai.com)

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Tables

| Feature | Supported |
|---------|-----------|
| Headers | ✅ |
| Lists   | ✅ |
| Code    | ✅ |
| Tables  | ✅ |

---

*Delete this example content and start writing your own markdown!*`;

export function MarkdownEditor() {
  const [markdownInput, setMarkdownInput] = useState<string>(EXAMPLE_MARKDOWN);
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [currentFilename, setCurrentFilename] = useState<string>('markdown.md');
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (markdownInput.trim() === '') {
        setHtmlOutput('');
        setError(null);
      } else {
        const html = renderMarkdown(markdownInput);
        setHtmlOutput(html);
        setError(null);
      }
    } catch (e) {
      const err = e as Error;
      setHtmlOutput('');
      setError(`Error rendering Markdown: ${err.message}`);
    }
  }, [markdownInput]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownInput(event.target.value);
  }, []);

  const handleFileLoadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileLoad = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoadingFile(true);
      setError(null);
      try {
        const content = await loadMarkdownFile(file);
        setMarkdownInput(content);
        setCurrentFilename(file.name);
      } catch (e) {
        const err = e as Error;
        setError(`Error loading file: ${err.message}`);
      } finally {
        setIsLoadingFile(false);
        // Reset file input value to allow loading the same file again
        if (event.target) {
          event.target.value = '';
        }
      }
    }
  }, []);

  const handleSaveFile = useCallback(() => {
    try {
      saveMarkdownFile(markdownInput, currentFilename || 'markdown-export.md');
      setError(null);
    } catch (e) {
      const err = e as Error;
      setError(`Error saving file: ${err.message}`);
    }
  }, [markdownInput, currentFilename]);

  const handleCopyToClipboard = useCallback(async () => {
    if (!htmlOutput) return;
    try {
      await navigator.clipboard.writeText(htmlOutput);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      setError(null);
    } catch (e) {
      const err = e as Error;
      setError(`Error copying HTML to clipboard: ${err.message}`);
    }
  }, [htmlOutput]);

  const handleClearContent = useCallback(() => {
    setMarkdownInput('');
    setCurrentFilename('markdown.md');
  }, []);


  return (
    <Container className="py-12">
      <SectionHeading
        title="Markdown Editor"
        description="Edit and preview Markdown text in real-time. Load and save .md files directly in your browser."
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Input Column */}
        <div className="flex-1 space-y-4">
          <Label htmlFor="markdown-input">Markdown Input</Label>
          <Textarea
            id="markdown-input"
            value={markdownInput}
            onChange={handleInputChange}
            placeholder="Type your Markdown here..."
            className="min-h-[400px] lg:min-h-[600px] font-mono text-sm p-3"
            aria-label="Markdown Input"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleFileLoadClick} variant="outline" disabled={isLoadingFile}>
              {isLoadingFile ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileUp className="mr-2 h-4 w-4" />
              )}
              Load .md File
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileLoad}
              accept=".md,.markdown,text/markdown"
              className="hidden"
              aria-hidden="true"
            />
            <Button onClick={handleSaveFile} disabled={!markdownInput}>
              <FileDown className="mr-2 h-4 w-4" />
              Save .md File
            </Button>
            <Button onClick={handleClearContent} variant="outline">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        {/* Output/Preview Column */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="html-preview">HTML Preview</Label>
            <Button onClick={handleCopyToClipboard} variant="ghost" size="sm" disabled={!htmlOutput}>
              {showCopied ? (
                <Check className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {showCopied ? 'Copied!' : 'Copy HTML'}
            </Button>
          </div>
          <div
            id="html-preview"
            className="border rounded-md p-4 min-h-[400px] lg:min-h-[600px] bg-muted/20 prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
            aria-label="HTML Preview"
          />
        </div>
      </div>
      <div className="mt-12">
        <MarkdownEditorExplanation />
      </div>
    </Container>
  );
}
