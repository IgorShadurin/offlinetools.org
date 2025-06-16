import * as CryptoJS from 'crypto-js';

export interface SteganographyOptions {
  password?: string;
  quality?: number;
}

export interface SteganographyResult {
  success: boolean;
  data?: string | Blob;
  error?: string;
}

export interface EmbedResult extends SteganographyResult {
  data?: Blob;
  originalFileName: string;
  steganographyFileName: string;
}

export interface ExtractResult extends SteganographyResult {
  data?: string;
}

export const DEFAULT_STEGANOGRAPHY_OPTIONS: SteganographyOptions = {
  quality: 0.9,
};

function encryptText(text: string, password: string): string {
  return CryptoJS.AES.encrypt(text, password).toString();
}

function decryptText(encryptedText: string, password: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, password);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function loadImageForSteganography(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = (): void => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    
    img.onerror = (): void => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    
    img.src = url;
  });
}

export function imageToCanvas(image: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  canvas.width = image.width;
  canvas.height = image.height;
  
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(image, 0, 0);
  
  return canvas;
}

export function canvasToImageData(canvas: HTMLCanvasElement): ImageData {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function imageDataToCanvas(imageData: ImageData): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  ctx.putImageData(imageData, 0, 0);
  
  return canvas;
}

export function embedTextInImageLSB(imageData: ImageData, text: string): ImageData {
  const data = new Uint8Array(imageData.data);
  const textBytes = new TextEncoder().encode(text + '\0');
  
  if (textBytes.length * 8 > data.length) {
    throw new Error('Text too long for image capacity');
  }
  
  let bitIndex = 0;
  
  for (let i = 0; i < textBytes.length; i++) {
    const byte = textBytes[i];
    
    for (let bit = 0; bit < 8; bit++) {
      const bitValue = (byte >> (7 - bit)) & 1;
      const pixelIndex = bitIndex;
      
      if (pixelIndex >= data.length) {
        throw new Error('Insufficient image capacity');
      }
      
      data[pixelIndex] = (data[pixelIndex] & 0xFE) | bitValue;
      bitIndex++;
    }
  }
  
  return new ImageData(new Uint8ClampedArray(data), imageData.width, imageData.height);
}

export function extractTextFromImageLSB(imageData: ImageData): string {
  const data = imageData.data;
  const bytes: number[] = [];
  let bitIndex = 0;
  
  while (bitIndex < data.length) {
    let byte = 0;
    
    for (let bit = 0; bit < 8; bit++) {
      if (bitIndex >= data.length) break;
      
      const bitValue = data[bitIndex] & 1;
      byte = (byte << 1) | bitValue;
      bitIndex++;
    }
    
    if (byte === 0) break;
    bytes.push(byte);
    
    if (bytes.length > 10000) {
      throw new Error('Text extraction exceeded maximum length');
    }
  }
  
  return new TextDecoder().decode(new Uint8Array(bytes));
}

export async function embedTextInImage(
  imageFile: File,
  text: string,
  options: SteganographyOptions = DEFAULT_STEGANOGRAPHY_OPTIONS
): Promise<EmbedResult> {
  try {
    if (!text.trim()) {
      return {
        success: false,
        error: 'Text cannot be empty',
        originalFileName: imageFile.name,
        steganographyFileName: '',
      };
    }
    
    const image = await loadImageForSteganography(imageFile);
    const canvas = imageToCanvas(image);
    const imageData = canvasToImageData(canvas);
    
    let textToEmbed = text;
    if (options.password) {
      textToEmbed = encryptText(text, options.password);
    }
    
    const modifiedImageData = embedTextInImageLSB(imageData, textToEmbed);
    const modifiedCanvas = imageDataToCanvas(modifiedImageData);
    
    return new Promise((resolve) => {
      modifiedCanvas.toBlob(
        (blob) => {
          if (blob) {
            const originalName = imageFile.name;
            const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
            const ext = originalName.split('.').pop() || 'png';
            const steganographyName = `${nameWithoutExt}_steganography.${ext}`;
            
            resolve({
              success: true,
              data: blob,
              originalFileName: originalName,
              steganographyFileName: steganographyName,
            });
          } else {
            resolve({
              success: false,
              error: 'Failed to create steganography image',
              originalFileName: imageFile.name,
              steganographyFileName: '',
            });
          }
        },
        imageFile.type || 'image/png',
        options.quality || 0.9
      );
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      originalFileName: imageFile.name,
      steganographyFileName: '',
    };
  }
}

export async function extractTextFromImage(
  imageFile: File,
  options: SteganographyOptions = DEFAULT_STEGANOGRAPHY_OPTIONS
): Promise<ExtractResult> {
  try {
    const image = await loadImageForSteganography(imageFile);
    const canvas = imageToCanvas(image);
    const imageData = canvasToImageData(canvas);
    
    let extractedText = extractTextFromImageLSB(imageData);
    
    if (options.password) {
      try {
        extractedText = decryptText(extractedText, options.password);
        if (!extractedText) {
          return {
            success: false,
            error: 'Invalid password or corrupted data',
          };
        }
      } catch (decryptError) {
        return {
          success: false,
          error: 'Invalid password or corrupted data',
        };
      }
    }
    
    return {
      success: true,
      data: extractedText,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to extract text from image',
    };
  }
}

export function isSteganographyCompatibleImage(file: File): boolean {
  return file.type.startsWith('image/') && 
         ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type);
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!isSteganographyCompatibleImage(file)) {
    return {
      valid: false,
      error: 'Please select a valid image file (JPEG, PNG, WebP, or GIF)',
    };
  }
  
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image file is too large. Maximum size is 10MB',
    };
  }
  
  return { valid: true };
}

export function isMnemonicPhrase(text: string): boolean {
  const words = text.trim().split(/\s+/);
  
  if (words.length !== 12 && words.length !== 24) {
    return false;
  }
  
  return words.every(word => /^[a-z]+$/.test(word) && word.length >= 3);
}

export function validateMnemonicPhrase(text: string): { valid: boolean; error?: string } {
  if (!text.trim()) {
    return {
      valid: false,
      error: 'Mnemonic phrase cannot be empty',
    };
  }
  
  if (!isMnemonicPhrase(text)) {
    return {
      valid: false,
      error: 'Please enter a valid mnemonic phrase (12 or 24 words)',
    };
  }
  
  return { valid: true };
}
