import { marked, type MarkedOptions } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Renders Markdown string to HTML, with sanitization.
 * @param markdown The Markdown string to render.
 * @param options Optional marked options.
 * @returns The sanitized HTML string.
 */
export function renderMarkdown(markdown: string, customOptions?: MarkedOptions): string {
  if (typeof markdown !== 'string' || markdown.trim() === '') {
    return '';
  }

  if (typeof window === 'undefined') {
    throw new Error('Markdown rendering requires a DOM environment (window object) for HTML sanitization.');
  }

  // Define DEFAULT_MARKDOWN_OPTIONS if not already defined elsewhere or passed in
  // For now, assuming it might be defined globally or should be defined here if not.
  // Let's define a simple default here if not provided.
  const DEFAULT_MARKDOWN_OPTIONS: MarkedOptions = {
    // Common default options can go here, e.g., gfm: true
    gfm: true,
  };

  const options: MarkedOptions = { ...DEFAULT_MARKDOWN_OPTIONS, ...customOptions };

  if (options.async) {
    throw new Error('Asynchronous Markdown rendering (options.async=true) is not supported by this function. Use a dedicated asynchronous parsing method if needed.');
  }

  // This subtask focuses on adding sanitization to synchronous rendering.

  try {
    const rawHtml = marked.parse(markdown, options) as string; // Assuming synchronous parse
    return DOMPurify.sanitize(rawHtml);
  } catch (error) {
    throw new Error(`Failed to render Markdown: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Loads a Markdown file and returns its content as a string.
 * @param file The File object to read.
 * @returns A Promise that resolves with the file content or rejects with an error.
 */
export function loadMarkdownFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided.'));
    }

    const reader = new FileReader();

    reader.onload = (event): void => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file content.'));
      }
    };

    reader.onerror = (errorEvent): void => {
      // The 'error' property of FileReader is a DOMException.
      // The event itself (ProgressEvent) might not directly have a verbose error message.
      // Accessing errorEvent.target.error is the standard way.
      const errorMessage = errorEvent.target?.error?.message || 'Unknown file reading error';
      reject(new Error(`Error reading file: ${errorMessage}`));
    };

    reader.readAsText(file);
  });
}

/**
 * Saves Markdown content to a file and triggers a download.
 * This function is intended for client-side use.
 * @param markdown The Markdown string to save.
 * @param filename The name of the file to save as.
 */
export function saveMarkdownFile(markdown: string, filename: string): void {
  // Check if essential browser APIs are not available
  if (typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !document.createElement ||
      typeof URL === 'undefined' || // Check if URL itself is defined
      !URL.createObjectURL ||
      !URL.revokeObjectURL) {
    throw new Error('saveMarkdownFile is intended for browser environments only.');
  }

  try {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // Required for Firefox
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    // Keep throwing a new error to standardize, but use the original message
    const err = e as Error;
    throw new Error(`Failed to save Markdown file: ${err.message}`);
  }
}
