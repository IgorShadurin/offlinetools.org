/**
 * File size units
 */
export enum FileSizeUnit {
  /** Bytes unit */
  Bytes = 'Bytes',
  /** Kilobytes unit */
  KB = 'KB',
  /** Megabytes unit */
  MB = 'MB',
  /** Gigabytes unit */
  GB = 'GB',
}

/**
 * File content type options
 */
export enum FileContentType {
  /** Random data */
  Random = 'Random',
  /** All zeros */
  Zeros = 'Zeros',
  /** Custom hex pattern */
  CustomHex = 'CustomHex',
}

/**
 * Predefined file size options
 */
export const PREDEFINED_SIZES = [
  { value: 1, unit: FileSizeUnit.KB },
  { value: 10, unit: FileSizeUnit.KB },
  { value: 100, unit: FileSizeUnit.KB },
  { value: 1, unit: FileSizeUnit.MB },
  { value: 10, unit: FileSizeUnit.MB },
];

/**
 * Common file extensions
 */
export const COMMON_EXTENSIONS = ['txt', 'bin', 'dat', 'iso', 'img'];

/**
 * Options for generating files
 */
export interface FileGeneratorOptions {
  /** File size value */
  size: number;
  /** File size unit */
  unit: FileSizeUnit;
  /** File extension (without dot) */
  extension: string;
  /** Content type to fill the file with */
  contentType: FileContentType;
  /** Custom hex value to repeat (for CustomHex content type) */
  customHexValue?: string;
}

/**
 * Default options for file generation
 */
export const DEFAULT_FILE_GENERATOR_OPTIONS: FileGeneratorOptions = {
  size: 1,
  unit: FileSizeUnit.KB,
  extension: 'txt',
  contentType: FileContentType.Random,
};

/**
 * Converts a size with unit to bytes
 * @param size - Size value
 * @param unit - Size unit
 * @returns Size in bytes
 */
export function convertToBytes(size: number, unit: FileSizeUnit): number {
  switch (unit) {
    case FileSizeUnit.Bytes:
      return size;
    case FileSizeUnit.KB:
      return size * 1024;
    case FileSizeUnit.MB:
      return size * 1024 * 1024;
    case FileSizeUnit.GB:
      return size * 1024 * 1024 * 1024;
    default:
      return size;
  }
}

/**
 * Validates and parses a hex string
 * @param hexString - Hex string to validate
 * @returns Validated hex string
 * @throws Error if the hex string is invalid
 */
export function validateHexString(hexString: string): string {
  // Remove any spaces or non-hex characters
  const cleanedHex = hexString.replace(/[^0-9A-Fa-f]/g, '');
  
  // Ensure we have an even number of characters (complete bytes)
  if (cleanedHex.length % 2 !== 0) {
    throw new Error('Hex string must have an even number of digits');
  }
  
  if (cleanedHex.length === 0) {
    throw new Error('Hex string cannot be empty');
  }
  
  return cleanedHex;
}

// Chunk size for streaming (1MB)
const CHUNK_SIZE = 1024 * 1024;

/**
 * Creates a pattern generator function based on content type
 * @param contentType - The content type
 * @param customHexValue - Optional custom hex value for CustomHex type
 * @returns Function that generates bytes for the pattern
 */
function createPatternGenerator(contentType: FileContentType, customHexValue?: string) {
  switch (contentType) {
    case FileContentType.Random:
      return () => Math.floor(Math.random() * 256);
      
    case FileContentType.Zeros:
      return () => 0;
      
    case FileContentType.CustomHex: {
      if (!customHexValue) {
        throw new Error('Custom hex value is required for CustomHex content type');
      }
      
      const hexValue = validateHexString(customHexValue);
      
      // Convert hex pairs to bytes
      const pattern = new Uint8Array(hexValue.length / 2);
      for (let i = 0; i < hexValue.length; i += 2) {
        pattern[i / 2] = parseInt(hexValue.substring(i, i + 2), 16);
      }
      
      let index = 0;
      return () => {
        const byte = pattern[index];
        index = (index + 1) % pattern.length;
        return byte;
      };
    }
    
    default:
      throw new Error(`Unsupported content type: ${contentType}`);
  }
}

/**
 * Generates file content based on the specified options using streaming
 * @param options - File generator options
 * @returns Blob with the generated content
 * @throws Error if there are issues with the options
 */
export function generateFileContent(options: FileGeneratorOptions): Blob {
  try {
    const sizeInBytes = convertToBytes(options.size, options.unit);
    
    if (sizeInBytes <= 0) {
      throw new Error('File size must be greater than 0');
    }
    
    // Cap the size at a reasonable limit (10GB) to prevent memory issues
    if (sizeInBytes > 10 * 1024 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum limit of 10GB');
    }
    
    // For smaller files (less than 50MB), use the direct approach
    if (sizeInBytes < 50 * 1024 * 1024) {
      const buffer = new Uint8Array(sizeInBytes);
      const generateByte = createPatternGenerator(
        options.contentType, 
        options.contentType === FileContentType.CustomHex ? options.customHexValue : undefined
      );
      
      for (let i = 0; i < sizeInBytes; i++) {
        buffer[i] = generateByte();
      }
      
      return new Blob([buffer], { type: 'application/octet-stream' });
    }
    
    // For larger files, use a chunked approach to avoid memory issues
    const chunks: Uint8Array[] = [];
    const chunkSize = Math.min(CHUNK_SIZE, sizeInBytes);
    const generateByte = createPatternGenerator(
      options.contentType, 
      options.contentType === FileContentType.CustomHex ? options.customHexValue : undefined
    );
    
    let remainingBytes = sizeInBytes;
    
    while (remainingBytes > 0) {
      const currentChunkSize = Math.min(chunkSize, remainingBytes);
      const chunk = new Uint8Array(currentChunkSize);
      
      for (let i = 0; i < currentChunkSize; i++) {
        chunk[i] = generateByte();
      }
      
      chunks.push(chunk);
      remainingBytes -= currentChunkSize;
    }
    
    return new Blob(chunks, { type: 'application/octet-stream' });
    
  } catch (error) {
    throw new Error(`Failed to generate file content: ${(error as Error).message}`);
  }
}

/**
 * Generates a file download URL for the specified content
 * @param content - File content as Blob
 * @param extension - File extension (without dot)
 * @returns Object with download URL and function to revoke it
 */
export function generateFileDownloadUrl(content: Blob, extension: string): {
  url: string;
  revoke: () => void;
} {
  const url = URL.createObjectURL(content);
  
  return {
    url,
    revoke: () => URL.revokeObjectURL(url),
  };
} 