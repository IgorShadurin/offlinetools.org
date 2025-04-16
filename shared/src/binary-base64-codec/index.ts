/**
 * Options for Binary Base64 encoding/decoding
 */
export interface BinaryBase64Options {
  /** Whether to enable URL-safe mode (replace + with - and / with _) */
  urlSafe: boolean;
}

/**
 * Default options for Binary Base64 encoding/decoding
 */
export const DEFAULT_BINARY_BASE64_OPTIONS: BinaryBase64Options = {
  urlSafe: false,
};

/**
 * Encodes binary data to Base64
 * @param fileData - The binary data to encode (ArrayBuffer or Uint8Array)
 * @param options - Optional configuration
 * @returns The Base64 encoded string
 */
export function encodeBinaryBase64(
  fileData: ArrayBuffer | Uint8Array,
  options: BinaryBase64Options = DEFAULT_BINARY_BASE64_OPTIONS
): string {
  try {
    // Ensure we have a Uint8Array
    const bytes = fileData instanceof ArrayBuffer 
      ? new Uint8Array(fileData) 
      : fileData;
    
    // Convert binary data to a string
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
    throw new Error(`Binary Base64 encoding failed: ${(error as Error).message}`);
  }
}

/**
 * Decodes a Base64 string to binary data
 * @param base64String - The Base64 string to decode
 * @param options - Optional configuration
 * @returns The decoded binary data as Uint8Array
 * @throws {Error} If the input is not valid Base64
 */
export function decodeBinaryBase64(
  base64String: string,
  options: BinaryBase64Options = DEFAULT_BINARY_BASE64_OPTIONS
): Uint8Array {
  try {
    // If input is empty, return empty array
    if (!base64String) return new Uint8Array(0);
    
    let input = base64String;
    
    // Reverse URL-safe transformation if needed
    if (options.urlSafe) {
      input = input.replace(/-/g, '+').replace(/_/g, '/');
    }
    
    // Use built-in browser API for decoding
    const binaryString = atob(input);
    
    // Convert binary string to Uint8Array
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes;
  } catch (error) {
    throw new Error(`Binary Base64 decoding failed: ${(error as Error).message}`);
  }
} 