/**
 * Type of clipboard content
 */
export type ClipboardType = 'string' | 'photo' | 'video';

/**
 * List of available tools
 */
export enum Tool {
  BASE64_CODEC = 'base64-codec',
  BINARY_BASE64_CODEC = 'binary-base64-codec',
  FILE_HASH_COMPARE = 'file-hash-compare',
  JSON_FORMATTER = 'json-formatter',
  TEXT_HASH_GENERATOR = 'text-hash-generator',
  URL_ENCODER = 'url-encoder'
}

/**
 * Options for clipboard detection
 */
export interface ClipboardDetectorOptions {
  /** Type of clipboard content */
  type: ClipboardType;
  /** Content text (only used for string type) */
  content?: string;
}

/**
 * Tool compatibility configuration
 */
const TOOL_COMPATIBILITY: Record<ClipboardType, Tool[]> = {
  'string': [
    Tool.BASE64_CODEC,
    Tool.BINARY_BASE64_CODEC,
    Tool.FILE_HASH_COMPARE,
    Tool.JSON_FORMATTER,
    Tool.TEXT_HASH_GENERATOR,
    Tool.URL_ENCODER
  ],
  'photo': [
    Tool.BINARY_BASE64_CODEC,
    Tool.FILE_HASH_COMPARE
  ],
  'video': [
    Tool.BINARY_BASE64_CODEC,
    Tool.FILE_HASH_COMPARE
  ]
};

/**
 * JSON detection regex
 */
const JSON_REGEX = /^\s*(\{|\[)[\s\S]*(\}|\])\s*$/;

/**
 * Base64 detection regex (standard Base64 characters)
 */
const BASE64_REGEX = /^[A-Za-z0-9+/=]+$/;

/**
 * URL detection regex
 */
const URL_REGEX = /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i;

/**
 * Checks if a string appears to be valid JSON
 * More thorough than just using regex
 * @param content - String to check
 * @returns Whether the string appears to be valid JSON
 */
function isLikelyJson(content: string): boolean {
  // Quick initial check with regex
  if (!JSON_REGEX.test(content)) {
    return false;
  }
  
  // Try parsing as JSON
  try {
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a string appears to be valid Base64
 * @param content - String to check
 * @returns Whether the string appears to be valid Base64
 */
function isLikelyBase64(content: string): boolean {
  // Must be non-empty and match Base64 character set
  if (!content || !BASE64_REGEX.test(content)) {
    return false;
  }
  
  // Must have valid length (divisible by 4)
  if (content.length % 4 !== 0) {
    return false;
  }
  
  // Avoid false positives for very short strings
  if (content.length < 8) {
    return false;
  }
  
  return true;
}

/**
 * Checks if a string appears to be a valid URL
 * @param content - String to check
 * @returns Whether the string appears to be a valid URL
 */
function isLikelyUrl(content: string): boolean {
  // Basic URL check with regex
  if (!URL_REGEX.test(content)) {
    return false;
  }
  
  // Avoid false positives for very short strings
  if (content.length < 10) {
    return false;
  }
  
  // Check for common URL components
  return content.includes('.') && !content.includes(' ');
}

/**
 * Detects which tools can handle the provided clipboard content
 * @param options - Options for clipboard content detection
 * @returns Array of tools that can handle the content
 */
export function detectClipboardTools(options: ClipboardDetectorOptions): Tool[] {
  try {
    if (!options) {
      throw new Error('Options are required');
    }
    
    const { type, content } = options;
    
    // For non-string types, return only compatible tools
    if (type !== 'string') {
      return TOOL_COMPATIBILITY[type] || [];
    }
    
    // For string type without content or with empty content, return all string-compatible tools
    if (content === undefined || content === null || content === '') {
      return TOOL_COMPATIBILITY.string;
    }
    
    // For string with content, detect specific format
    const compatibleTools: Tool[] = [];
    
    // Check if content is JSON
    if (isLikelyJson(content)) {
      compatibleTools.push(Tool.JSON_FORMATTER);
    }
    
    // Check if content looks like Base64
    if (isLikelyBase64(content)) {
      compatibleTools.push(Tool.BASE64_CODEC);
    }
    
    // Check if content is URL
    if (isLikelyUrl(content)) {
      compatibleTools.push(Tool.URL_ENCODER);
    }
    
    // These tools can handle any string
    compatibleTools.push(Tool.TEXT_HASH_GENERATOR);
    compatibleTools.push(Tool.FILE_HASH_COMPARE);
    compatibleTools.push(Tool.BINARY_BASE64_CODEC);
    
    return compatibleTools;
  } catch (error) {
    throw new Error(`Failed to detect clipboard tools: ${(error as Error).message}`);
  }
} 