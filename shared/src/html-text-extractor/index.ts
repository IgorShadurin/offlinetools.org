/**
 * HTML text extractor options
 */
import { convert, HtmlToTextOptions } from 'html-to-text';

export enum HtmlLinkHandlingOption {
  /** Remove links completely */
  Remove = 'Remove',
  /** Keep link text only */
  KeepText = 'Keep text',
  /** Show as text [link text](url) */
  ShowAsMarkdown = 'Show as markdown',
}

/**
 * Options for HTML text extraction
 */
export interface HtmlTextExtractorOptions {
  /** Whether to preserve newlines from HTML */
  preserveNewlines: boolean;
  /** How to handle links in HTML */
  linkHandling: HtmlLinkHandlingOption;
  /** Whether to remove images */
  removeImages: boolean;
  /** Whether to include the alt text of images */
  includeImageAlt: boolean;
  /** Maximum line length (0 for no limit) */
  wordwrap: number;
}

/**
 * Default HTML text extractor options
 */
export const DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS: HtmlTextExtractorOptions = {
  preserveNewlines: true,
  linkHandling: HtmlLinkHandlingOption.KeepText,
  removeImages: true,
  includeImageAlt: true,
  wordwrap: 0,
};

/**
 * Regular expression for detecting HTML content
 */
export const HTML_REGEX = /<\/?[a-z][\s\S]*>/i;

/**
 * Extract plain text from HTML string
 * @param htmlString - The HTML string to extract text from
 * @param options - The extraction options
 * @returns The extracted plain text
 * @throws {Error} If extraction fails
 */
export function extractTextFromHtml(
  htmlString: string,
  options: HtmlTextExtractorOptions = DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS
): string {
  try {
    if (!htmlString) return "";
    
    type FormatElement = {
      attribs: Record<string, string>;
      children: Array<{ data?: string }>;
    };
    
    type FormatBuilder = {
      addInline: (text: string) => void;
    };
    
    const convertOptions: HtmlToTextOptions = {
      wordwrap: options.wordwrap,
      preserveNewlines: options.preserveNewlines,
      selectors: [],
    };
    
    switch (options.linkHandling) {
      case HtmlLinkHandlingOption.Remove:
        convertOptions.selectors = [
          { selector: 'a', options: { ignoreHref: true } }
        ];
        break;
      case HtmlLinkHandlingOption.KeepText:
        convertOptions.selectors = [
          { selector: 'a', options: { ignoreHref: true } }
        ];
        break;
      case HtmlLinkHandlingOption.ShowAsMarkdown:
        convertOptions.selectors = [
          { 
            selector: 'a', 
            format: 'linkFormat',
            options: { ignoreHref: false }
          }
        ];
        convertOptions.formatters = {
          linkFormat: function(elem, walk, builder) {
            const href = elem.attribs.href;
            const content = elem.children
              .map((child: any) => child.data || '')
              .join('')
              .trim();
            builder.addInline(`${content}(${href})`);
          }
        };
        break;
    }
    
    if (options.removeImages) {
      if (!convertOptions.selectors) convertOptions.selectors = [];
      convertOptions.selectors.push({
        selector: 'img',
        format: 'imageFormat',
      });
      
      convertOptions.formatters = {
        ...(convertOptions.formatters || {}),
        imageFormat: function(elem, walk, builder) {
          if (options.includeImageAlt && elem.attribs.alt) {
            builder.addInline(`[Image: ${elem.attribs.alt}]`);
          }
        }
      };
    }
    
    return convert(htmlString, convertOptions);
  } catch (error) {
    throw new Error(`HTML text extraction failed: ${(error as Error).message}`);
  }
}

/**
 * Check if a string appears to be HTML
 * @param content - String to check
 * @returns Whether the string appears to be HTML
 */
export function isLikelyHtml(content: string): boolean {
  if (!content) {
    return false;
  }
  
  const containsHtmlEntities = /&[a-z]+;|&#\d+;/i.test(content);
  if (containsHtmlEntities) {
    return true;
  }
  
  if (!HTML_REGEX.test(content)) {
    return false;
  }
  
  const containsCommonHtmlTags = /<\/?(?:div|span|p|a|img|table|tr|td|th|ul|ol|li|h[1-6])\b/i.test(content);
  
  return containsCommonHtmlTags;
}
