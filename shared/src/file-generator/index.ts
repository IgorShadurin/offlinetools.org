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
  /** Progress callback function */
  onProgress?: (progress: number) => void;
  /** Whether to use binary (1024) or decimal (1000) calculation */
  useBinary?: boolean;
}

/**
 * Default options for file generation
 */
export const DEFAULT_FILE_GENERATOR_OPTIONS: FileGeneratorOptions = {
  size: 1,
  unit: FileSizeUnit.KB,
  extension: 'txt',
  contentType: FileContentType.Random,
  useBinary: true,
};

/**
 * Converts a size with unit to bytes
 * @param size - Size value
 * @param unit - Size unit
 * @param useBinary - Whether to use binary (1024) or decimal (1000) calculation
 * @returns Size in bytes
 */
export function convertToBytes(size: number, unit: FileSizeUnit, useBinary: boolean = true): number {
  const base = useBinary ? 1024 : 1000;
  
  switch (unit) {
    case FileSizeUnit.Bytes:
      return size;
    case FileSizeUnit.KB:
      return size * base;
    case FileSizeUnit.MB:
      return size * base * base;
    case FileSizeUnit.GB:
      return size * base * base * base;
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

// Optimized chunk size for large files (8MB for better performance)
const CHUNK_SIZE = 8 * 1024 * 1024;

/**
 * Ensures a Uint8Array view is backed by a Blob-compatible ArrayBuffer
 */
function toBlobPart(view: Uint8Array): ArrayBuffer {
  if (view.buffer instanceof ArrayBuffer) {
    if (view.byteOffset === 0 && view.byteLength === view.buffer.byteLength) {
      return view.buffer;
    }
    return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
  }

  const buffer = new ArrayBuffer(view.byteLength);
  new Uint8Array(buffer).set(view);
  return buffer;
}

/**
 * Creates a pattern generator function based on content type
 * @param contentType - The content type
 * @param customHexValue - Optional custom hex value for CustomHex type
 * @returns Function that generates bytes for the pattern
 */
function createPatternGenerator(contentType: FileContentType, customHexValue?: string) {
  switch (contentType) {
    case FileContentType.Random:
      // Use crypto.getRandomValues for better performance, respecting the 64KB limit
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const buffer = new Uint8Array(1024); // Buffer for random values
        let bufferIndex = buffer.length; // Start with empty buffer
        
        return (): number => {
          if (bufferIndex >= buffer.length) {
            crypto.getRandomValues(buffer);
            bufferIndex = 0;
          }
          return buffer[bufferIndex++];
        };
      }
      return (): number => Math.floor(Math.random() * 256);
      
    case FileContentType.Zeros:
      return (): number => 0;
      
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
      return (): number => {
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
 * Optimized chunk generator that uses pre-allocated buffers for better performance
 * @param contentType - The content type
 * @param customHexValue - Optional custom hex value for CustomHex type
 * @param chunkSize - Size of chunks to generate
 * @returns Function that generates chunks
 */
function createOptimizedChunkGenerator(
  contentType: FileContentType, 
  customHexValue?: string, 
  chunkSize: number = CHUNK_SIZE
) {
  switch (contentType) {
    case FileContentType.Random:
      return (size: number): Uint8Array => {
        const chunk = new Uint8Array(size);
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
          // crypto.getRandomValues has a limit of 65536 bytes (64KB)
          const maxCryptoBytes = 65536;
          let offset = 0;
          
          while (offset < size) {
            const remainingBytes = size - offset;
            const bytesToGenerate = Math.min(maxCryptoBytes, remainingBytes);
            const subChunk = new Uint8Array(bytesToGenerate);
            crypto.getRandomValues(subChunk);
            chunk.set(subChunk, offset);
            offset += bytesToGenerate;
          }
        } else {
          for (let i = 0; i < size; i++) {
            chunk[i] = Math.floor(Math.random() * 256);
          }
        }
        return chunk;
      };
      
    case FileContentType.Zeros:
      return (size: number): Uint8Array => new Uint8Array(size); // Already filled with zeros
      
    case FileContentType.CustomHex: {
      if (!customHexValue) {
        throw new Error('Custom hex value is required for CustomHex content type');
      }
      
      const hexValue = validateHexString(customHexValue);
      const pattern = new Uint8Array(hexValue.length / 2);
      for (let i = 0; i < hexValue.length; i += 2) {
        pattern[i / 2] = parseInt(hexValue.substring(i, i + 2), 16);
      }
      
      return (size: number): Uint8Array => {
        const chunk = new Uint8Array(size);
        for (let i = 0; i < size; i++) {
          chunk[i] = pattern[i % pattern.length];
        }
        return chunk;
      };
    }
    
    default:
      throw new Error(`Unsupported content type: ${contentType}`);
  }
}

/**
 * Generates file content in chunks with progress reporting
 * @param options - File generator options
 * @returns Promise that resolves to a Blob with the generated content
 * @throws Error if there are issues with the options
 */
export async function generateFileContent(options: FileGeneratorOptions): Promise<Blob> {
  try {
    const sizeInBytes = convertToBytes(options.size, options.unit, options.useBinary ?? true);
    
    if (sizeInBytes <= 0) {
      throw new Error('File size must be greater than 0');
    }
    
    // Cap the size at a reasonable limit (10GB) to prevent memory issues
    if (sizeInBytes > 10 * 1024 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum limit of 10GB');
    }

    // For large files (>100MB), use optimized chunk generation
    if (sizeInBytes > 100 * 1024 * 1024) {
      return generateLargeFileContent(options, sizeInBytes);
    }

    const generateByte = createPatternGenerator(
      options.contentType, 
      options.contentType === FileContentType.CustomHex ? options.customHexValue : undefined
    );
    
    // For tiny files (under 1MB), don't bother with chunks and progress
    if (sizeInBytes < CHUNK_SIZE) {
      const buffer = new Uint8Array(sizeInBytes);
      for (let i = 0; i < sizeInBytes; i++) {
        buffer[i] = generateByte();
      }
      return new Blob([toBlobPart(buffer)], { type: 'application/octet-stream' });
    }
    
    // For larger files, use a chunked approach with progress reporting
    return new Promise((resolve, reject) => {
      const chunks: ArrayBuffer[] = [];
      const chunkSize = Math.min(CHUNK_SIZE, sizeInBytes);
      let bytesGenerated = 0;
      
      // Use setTimeout to avoid blocking the UI thread
      function generateNextChunk(): void {
        try {
          const remainingBytes = sizeInBytes - bytesGenerated;
          
          if (remainingBytes <= 0) {
            const blob = new Blob(chunks, { type: 'application/octet-stream' });
            resolve(blob);
            return;
          }
          
          const currentChunkSize = Math.min(chunkSize, remainingBytes);
          const chunk = new Uint8Array(currentChunkSize);
          
          for (let i = 0; i < currentChunkSize; i++) {
            chunk[i] = generateByte();
          }
          
          chunks.push(toBlobPart(chunk));
          bytesGenerated += currentChunkSize;
          
          // Report progress
          if (options.onProgress) {
            const progress = Math.min(100, Math.round((bytesGenerated / sizeInBytes) * 100));
            options.onProgress(progress);
          }
          
          // Schedule the next chunk
          setTimeout(generateNextChunk, 0);
        } catch (error) {
          reject(error);
        }
      }
      
      // Start generating chunks
      generateNextChunk();
    });
  } catch (error) {
    throw new Error(`Failed to generate file content: ${(error as Error).message}`);
  }
}

/**
 * Optimized file content generation for large files (>100MB)
 * @param options - File generator options
 * @param sizeInBytes - Size in bytes
 * @returns Promise that resolves to a Blob with the generated content
 */
async function generateLargeFileContent(options: FileGeneratorOptions, sizeInBytes: number): Promise<Blob> {
  const generateChunk = createOptimizedChunkGenerator(
    options.contentType,
    options.contentType === FileContentType.CustomHex ? options.customHexValue : undefined
  );
  
  const chunks: ArrayBuffer[] = [];
  let bytesGenerated = 0;
  
  while (bytesGenerated < sizeInBytes) {
    const remainingBytes = sizeInBytes - bytesGenerated;
    const currentChunkSize = Math.min(CHUNK_SIZE, remainingBytes);
    
    const chunk = generateChunk(currentChunkSize);
    chunks.push(toBlobPart(chunk));
    bytesGenerated += currentChunkSize;
    
    // Report progress
    if (options.onProgress) {
      const progress = Math.min(100, Math.round((bytesGenerated / sizeInBytes) * 100));
      options.onProgress(progress);
    }
    
    // Yield control to prevent blocking
    if (chunks.length % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  return new Blob(chunks, { type: 'application/octet-stream' });
}

/**
 * Checks if the File System Access API is supported
 * @returns Whether the File System Access API is supported
 */
export function isFileSystemAccessSupported(): boolean {
  return typeof window !== 'undefined' && 'showSaveFilePicker' in window;
}

/**
 * Optimized file generation that streams directly to disk using File System Access API
 * @param options - File generator options
 * @param filename - Suggested filename
 * @returns Promise that resolves when the file is saved
 */
export async function saveFileWithPicker(
  options: FileGeneratorOptions,
  filename: string
): Promise<void> {
  try {
    const sizeInBytes = convertToBytes(options.size, options.unit, options.useBinary ?? true);
    
    if (sizeInBytes <= 0) {
      throw new Error('File size must be greater than 0');
    }
    
    // Cap at 10GB
    if (sizeInBytes > 10 * 1024 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum limit of 10GB');
    }

    // Get the file handle first (this needs to be directly triggered by user gesture)
    // @ts-ignore - TypeScript may not know about showSaveFilePicker yet
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [{
        description: 'Files',
        accept: {
          'application/octet-stream': [`.${filename.split('.').pop() || 'bin'}`]
        }
      }]
    });
    
    // Create a writable stream to the file
    const writable = await fileHandle.createWritable();
    
    // Use optimized generation for large files
    const generateChunk = createOptimizedChunkGenerator(
      options.contentType, 
      options.contentType === FileContentType.CustomHex ? options.customHexValue : undefined
    );
    
    // Use larger chunk size for better performance on large files
    const dynamicChunkSize = sizeInBytes > 1024 * 1024 * 1024 ? // 1GB
      16 * 1024 * 1024 : // 16MB for files > 1GB
      8 * 1024 * 1024;   // 8MB for smaller files
    
    let bytesWritten = 0;
    
    // Generate and write in optimized chunks
    while (bytesWritten < sizeInBytes) {
      // Determine this chunk's size
      const remainingBytes = sizeInBytes - bytesWritten;
      const currentChunkSize = Math.min(dynamicChunkSize, remainingBytes);
      
      // Generate this chunk using optimized method
      const chunk = generateChunk(currentChunkSize);
      
      // Write the chunk
      await writable.write(chunk);
      bytesWritten += currentChunkSize;
      
      // Report progress
      if (options.onProgress) {
        const progress = Math.min(100, Math.round((bytesWritten / sizeInBytes) * 100));
        options.onProgress(progress);
      }
      
      // For very large files, yield control less frequently for better performance
      if (sizeInBytes > 1024 * 1024 * 1024) { // 1GB+
        // Only yield every 64MB to maximize throughput
        if (bytesWritten % (64 * 1024 * 1024) === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      } else {
        // For smaller files, yield more frequently for UI responsiveness
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    
    // Close the file
    await writable.close();
    
    return;
  } catch (error) {
    // User cancelled or API not supported
    if ((error as Error).name !== 'AbortError') {
      throw error;
    }
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
