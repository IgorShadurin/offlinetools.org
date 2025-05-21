import QRCode from 'qrcode';

/**
 * Error correction level for QR codes
 */
export enum QRCodeErrorCorrectionLevel {
  LOW = 'L',      // ~7% correction
  MEDIUM = 'M',   // ~15% correction
  QUARTILE = 'Q', // ~25% correction
  HIGH = 'H'      // ~30% correction
}

/**
 * Output format for QR codes
 */
export enum QRCodeOutputFormat {
  SVG = 'svg',
  DATA_URL = 'dataURL',
  UTF8 = 'utf8'
}

/**
 * Options for generating QR codes
 */
export interface QRCodeGeneratorOptions {
  /**
   * Error correction level
   */
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  
  /**
   * Output format
   */
  outputFormat: QRCodeOutputFormat;
  
  /**
   * Size of QR code (width/height in pixels)
   */
  size: number;
  
  /**
   * Color of QR code (CSS color)
   */
  color: string;
  
  /**
   * Background color (CSS color)
   */
  backgroundColor: string;
}

/**
 * Default options for QR code generation
 */
export const DEFAULT_QRCODE_OPTIONS: QRCodeGeneratorOptions = {
  errorCorrectionLevel: QRCodeErrorCorrectionLevel.MEDIUM,
  outputFormat: QRCodeOutputFormat.SVG,
  size: 300,
  color: '#000000',
  backgroundColor: '#ffffff'
};

/**
 * Generate a QR code from text input
 * @param text - Input text to encode in QR code
 * @param options - QR code generation options
 * @returns Generated QR code as string (format depends on outputFormat option)
 * @throws Error if generation fails
 */
export async function generateQRCode(
  text: string,
  options: Partial<QRCodeGeneratorOptions> = {}
): Promise<string> {
  try {
    if (!text) return '';
    
    const mergedOptions = { ...DEFAULT_QRCODE_OPTIONS, ...options };
    
    const qrOptions = {
      errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
      width: mergedOptions.size,
      color: {
        dark: mergedOptions.color,
        light: mergedOptions.backgroundColor
      }
    };
    
    switch (mergedOptions.outputFormat) {
      case QRCodeOutputFormat.SVG:
        return await QRCode.toString(text, {
          ...qrOptions,
          type: 'svg'
        });
      
      case QRCodeOutputFormat.DATA_URL:
        return await QRCode.toDataURL(text, qrOptions);
      
      case QRCodeOutputFormat.UTF8:
        return await QRCode.toString(text, {
          ...qrOptions,
          type: 'utf8'
        });
      
      default:
        throw new Error(`Unsupported output format: ${mergedOptions.outputFormat}`);
    }
  } catch (error) {
    throw new Error(`QR code generation failed: ${(error as Error).message}`);
  }
}

/**
 * Result of reading a QR code
 */
export interface QRCodeReadResult {
  /**
   * Text content of the QR code
   */
  text: string;
  
  /**
   * Format of the QR code (if available)
   */
  format?: string;
}

/**
 * Check if an image data URL contains a QR code
 * @param dataUrl - Data URL of the image to check
 * @returns True if the string appears to be a valid QR code data URL
 */
export function isQRCodeDataUrl(dataUrl: string): boolean {
  if (!dataUrl.startsWith('data:image/')) {
    return false;
  }
  
  if (dataUrl.length < 100) {
    return false;
  }
  
  return true;
}
