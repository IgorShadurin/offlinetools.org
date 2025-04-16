/**
 * Options for URL encoding/decoding
 */
export interface UrlCodecOptions {
  /** Whether to use the deprecated escape/unescape functions */
  useEscapeUnescape: boolean;
}

/**
 * Default options for URL encoding/decoding
 */
export const DEFAULT_URL_CODEC_OPTIONS: UrlCodecOptions = {
  useEscapeUnescape: false,
};

/**
 * Encodes a string for use in a URL
 * @param text - The text to encode
 * @param options - Optional configuration
 * @returns The URL encoded string
 */
export function encodeUrl(
  text: string,
  options: UrlCodecOptions = DEFAULT_URL_CODEC_OPTIONS
): string {
  try {
    if (!text) return "";
    
    if (options.useEscapeUnescape) {
      // Use the deprecated escape function (preserves more characters)
      return escape(text);
    } else {
      // Use the modern encodeURIComponent function
      return encodeURIComponent(text);
    }
  } catch (error) {
    throw new Error(`URL encoding failed: ${(error as Error).message}`);
  }
}

/**
 * Decodes a URL encoded string
 * @param encodedText - The URL encoded string to decode
 * @param options - Optional configuration
 * @returns The decoded text
 * @throws {Error} If the input is not valid URL encoded text
 */
export function decodeUrl(
  encodedText: string,
  options: UrlCodecOptions = DEFAULT_URL_CODEC_OPTIONS
): string {
  try {
    if (!encodedText) return "";
    
    if (options.useEscapeUnescape) {
      // Use the deprecated unescape function
      return unescape(encodedText);
    } else {
      // Use the modern decodeURIComponent function
      return decodeURIComponent(encodedText);
    }
  } catch (error) {
    throw new Error(`URL decoding failed: ${(error as Error).message}`);
  }
} 