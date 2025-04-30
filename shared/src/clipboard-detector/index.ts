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
 * Detect compatible tools based on clipboard content type and content
 * @param clipboardData - Clipboard data containing type and content
 * @returns Array of compatible tools sorted by relevance
 * @throws Error if clipboardData is null or undefined
 */
export function detectClipboardTools(clipboardData: { 
  type: ClipboardType; 
  content?: string;
}): Tool[] {
  if (!clipboardData) {
    throw new Error('Failed to detect clipboard tools: Options are required');
  }

  const { type, content } = clipboardData;
  let compatibleTools = [...TOOL_COMPATIBILITY[type] || []];

  // For string content, check for special formats and prioritize specific tools
  if (type === 'string' && content) {
    // Create a prioritized array of tools based on content detection
    const prioritizedTools: Tool[] = [];
    
    // Add other specialized format tools if they are detected
    if (isLikelyJson(content)) {
      prioritizedTools.push(Tool.JSON_FORMATTER);
    }
    
    if (isLikelyUrl(content) && !prioritizedTools.includes(Tool.URL_ENCODER)) {
      prioritizedTools.push(Tool.URL_ENCODER);
    }
    
    if (isLikelyBase64(content)) {
      prioritizedTools.push(Tool.BASE64_CODEC);
    }
    
    // Add the other general tools that weren't specifically matched
    compatibleTools.forEach(tool => {
      // Don't duplicate specialized tools that were already matched
      if (!prioritizedTools.includes(tool)) {
        // Filter out specialized tools that didn't match the content
        if (
          (tool === Tool.JSON_FORMATTER && !isLikelyJson(content)) ||
          (tool === Tool.URL_ENCODER && !isLikelyUrl(content)) ||
          (tool === Tool.BASE64_CODEC && !isLikelyBase64(content))
        ) {
          // Skip this tool
        } else {
          // Include this tool
          prioritizedTools.push(tool);
        }
      }
    });

    // Always add URL_ENCODER as the first tool for string type
    prioritizedTools.push(Tool.URL_ENCODER);

    return prioritizedTools;
  }

  return compatibleTools;
} 