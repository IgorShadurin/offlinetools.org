/**
 * QR Code generation options
 */
export interface QrCodeOptions {
  /** Width/height of the QR code image */
  width: number;
  /** White space around the QR code */
  margin: number;
  /** Error correction level */
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  /** Colors for dark/light modules */
  color?: { dark: string; light: string };
}

/**
 * Default QR code options
 */
export const DEFAULT_QR_CODE_OPTIONS: QrCodeOptions = {
  width: 256,
  margin: 2,
  errorCorrectionLevel: 'M',
};

import QRCode from 'qrcode';
import jsQR from 'jsqr';

/**
 * Generates a QR code data URL from input text
 * @param text - Text to encode in the QR code
 * @param options - Optional QR code settings
 * @returns Promise that resolves to a data URL string
 * @throws Error if generation fails
 */
export async function generateQrCode(
  text: string,
  options: Partial<QrCodeOptions> = {}
): Promise<string> {
  try {
    if (!text) return '';
    const opts = { ...DEFAULT_QR_CODE_OPTIONS, ...options };
    return await QRCode.toDataURL(text, opts);
  } catch (error) {
    throw new Error(`QR code generation failed: ${(error as Error).message}`);
  }
}

/**
 * Decodes a QR code from a data URL string
 * Works in both Node.js and browser environments
 * @param dataUrl - Image data URL containing a QR code
 * @returns Promise that resolves to the decoded text
 * @throws Error if decoding fails or code not found
 */
export async function decodeQrCode(dataUrl: string): Promise<string> {
  try {
    if (!dataUrl) return '';

    if (typeof window === 'undefined') {
      throw new Error('QR decoding in Node is not supported');
    } else {
      return await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = (): void => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Failed to get canvas context'));
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const result = jsQR(imageData.data, imageData.width, imageData.height);
          if (!result) return reject(new Error('QR code not found'));
          resolve(result.data);
        };
        img.onerror = (): void => reject(new Error('Failed to load image'));
        img.src = dataUrl;
      });
    }
  } catch (error) {
    throw new Error(`QR code decoding failed: ${(error as Error).message}`);
  }
}
