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
  HTML_TEXT_EXTRACTOR = 'html-text-extractor',
  JSON_FORMATTER = 'json-formatter',
  TEXT_HASH_GENERATOR = 'text-hash-generator',
  URL_ENCODER = 'url-encoder',
  FILE_GENERATOR = 'file-generator',
  UUID_GENERATOR = 'uuid-generator',
  SPEECH_LENGTH_ESTIMATOR = 'speech-length-estimator',
  TEXT_TO_SLUG = 'text-to-slug',
  ETHEREUM_CONVERTER = 'ethereum-converter',
  PERSON_GENERATOR = 'person-generator',
  TEXT_UTILITY = 'text-utility',
  MARKDOWN_EDITOR = 'markdown-editor'
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

import { getRegisteredTools } from './registry';
export { registerClipboardTool, getRegisteredTools, type ClipboardToolRegistration } from './registry';


/**
 * Detect compatible tools based on clipboard content type and content
 * @param clipboardData - Clipboard data containing type and content
 * @returns Array of compatible tools sorted by relevance
 * @throws Error if clipboardData is null or undefined
 */
export function detectClipboardTools(clipboardData: {
  type: ClipboardType;
  content?: string | null;
}): Tool[] {
  if (!clipboardData) {
    throw new Error('Failed to detect clipboard tools: Options are required');
  }

  const { type, content } = clipboardData;
  const registrations = getRegisteredTools();

  const prioritized: Tool[] = [];
  const general: Tool[] = [];
  const hasContent = type === 'string' && content !== undefined && content !== null && content !== '';

  for (const reg of registrations) {
    if (!reg.supportedTypes.includes(type)) {
      continue;
    }

    if (hasContent && reg.detect) {
      if (reg.detect(content as string)) {
        prioritized.push(reg.id);
      }
    } else {
      general.push(reg.id);
    }
  }

  let result = [...new Set([...prioritized, ...general])];

  if (type === 'string' && result.includes(Tool.URL_ENCODER)) {
    result = [Tool.URL_ENCODER, ...result.filter(t => t !== Tool.URL_ENCODER)];
  }

  return result;
}
