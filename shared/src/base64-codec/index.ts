/**
 * Options for Base64 encoding/decoding
 */
export interface Base64Options {
  /** Whether to enable URL-safe mode (replace + with - and / with _) */
  urlSafe: boolean;
}

/**
 * Default options for Base64 encoding/decoding
 */
export const DEFAULT_BASE64_OPTIONS: Base64Options = {
  urlSafe: false,
};

/**
 * Encodes a string to Base64
 * @param text - The text to encode
 * @param options - Optional configuration
 * @returns The Base64 encoded string
 */
export function encodeBase64(
  text: string,
  options: Base64Options = DEFAULT_BASE64_OPTIONS
): string {
  try {
    // For UTF-8 support, convert string to bytes first
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    
    // Convert bytes to binary string
    let binaryString = "";
    for (let i = 0; i < bytes.length; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }
    
    // Use built-in browser API for encoding
    let encoded = btoa(binaryString);
    
    // Apply URL-safe transformation if needed
    if (options.urlSafe) {
      encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_');
    }
    
    return encoded;
  } catch (error) {
    throw new Error(`Base64 encoding failed: ${(error as Error).message}`);
  }
}

/**
 * Decodes a Base64 string to plain text
 * @param base64String - The Base64 string to decode
 * @param options - Optional configuration
 * @returns The decoded text
 * @throws {Error} If the input is not valid Base64
 */
export function decodeBase64(
  base64String: string,
  options: Base64Options = DEFAULT_BASE64_OPTIONS
): string {
  try {
    // If input is empty, return empty string
    if (!base64String) return "";
    
    let input = base64String;
    
    // Reverse URL-safe transformation if needed
    if (options.urlSafe) {
      input = input.replace(/-/g, '+').replace(/_/g, '/');
    }
    
    // Use built-in browser API for decoding
    const binaryString = atob(input);
    
    // Convert binary string to bytes
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Convert bytes to UTF-8 string
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  } catch (error) {
    throw new Error(`Base64 decoding failed: ${(error as Error).message}`);
  }
} 