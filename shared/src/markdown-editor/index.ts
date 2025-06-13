import { marked, type MarkedOptions } from 'marked';

/**
 * Renders Markdown string to HTML.
 * @param markdown The Markdown string to render.
 * @param options Optional marked options.
 * @returns The rendered HTML string.
 */
export function renderMarkdown(markdown: string, options?: MarkedOptions): string {
  if (!markdown) {
    return '';
  }
  try {
    // Use marked.parse() for synchronous parsing
    const result = marked.parse(markdown, options);
    if (typeof result === 'string') {
      return result;
    }
    // If marked.parse() ever returns a promise with current versions and no async options,
    // this would be unexpected. For now, we assume it's string based on typical usage.
    // If it can be a promise, the function signature and tests would need to change.
    // However, the current error TS2322 suggests the type system thinks 'marked()' can return a promise.
    // 'marked.parse()' is explicitly synchronous.
    return String(result); // Fallback, though .parse should be string.
  } catch (error) {
    console.error('Error rendering Markdown:', error);
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

    reader.onerror = (error): void => {
      console.error('Error reading file:', error);
      reject(new Error(`Failed to read file: ${error.target?.error?.message || String(error)}`));
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
    console.warn('saveMarkdownFile is intended for browser environments only.');
    return;
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
  } catch (error) {
    console.error('Error saving Markdown file:', error);
    throw new Error(`Failed to save Markdown file: ${error instanceof Error ? error.message : String(error)}`);
  }
}
