export enum WatermarkPosition {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export interface WatermarkOptions {
  position: WatermarkPosition;
  opacity: number;
  scale: number;
  margin: number;
}

export const DEFAULT_WATERMARK_OPTIONS: WatermarkOptions = {
  position: WatermarkPosition.BOTTOM_RIGHT,
  opacity: 0.7,
  scale: 0.2,
  margin: 20,
};

export interface WatermarkResult {
  success: boolean;
  blob?: Blob;
  error?: string;
  originalFileName: string;
  watermarkedFileName: string;
}

export interface BatchProcessingProgress {
  current: number;
  total: number;
  fileName: string;
  completed: boolean;
}

export type ProgressCallback = (progress: BatchProcessingProgress) => void;

export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
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

export function calculateWatermarkPosition(
  canvasWidth: number,
  canvasHeight: number,
  watermarkWidth: number,
  watermarkHeight: number,
  position: WatermarkPosition,
  margin: number
): { x: number; y: number } {
  switch (position) {
    case WatermarkPosition.TOP_LEFT:
      return { x: margin, y: margin };
    case WatermarkPosition.TOP_RIGHT:
      return { x: canvasWidth - watermarkWidth - margin, y: margin };
    case WatermarkPosition.BOTTOM_LEFT:
      return { x: margin, y: canvasHeight - watermarkHeight - margin };
    case WatermarkPosition.BOTTOM_RIGHT:
      return { x: canvasWidth - watermarkWidth - margin, y: canvasHeight - watermarkHeight - margin };
    default:
      return { x: canvasWidth - watermarkWidth - margin, y: canvasHeight - watermarkHeight - margin };
  }
}

export function calculateWatermarkSize(
  imageWidth: number,
  imageHeight: number,
  watermarkWidth: number,
  watermarkHeight: number,
  scale: number
): { width: number; height: number } {
  // Simply scale the watermark by the scale factor
  const width = watermarkWidth * scale;
  const height = watermarkHeight * scale;
  
  return { width, height };
}

export async function applyWatermark(
  imageFile: File,
  watermarkImage: HTMLImageElement,
  options: WatermarkOptions = DEFAULT_WATERMARK_OPTIONS,
  customPosition?: { x: number; y: number }
): Promise<WatermarkResult> {
  try {
    const image = await loadImageFromFile(imageFile);
    
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
    
    const watermarkSize = calculateWatermarkSize(
      image.width,
      image.height,
      watermarkImage.width,
      watermarkImage.height,
      options.scale
    );
    
    const position = customPosition || calculateWatermarkPosition(
      canvas.width,
      canvas.height,
      watermarkSize.width,
      watermarkSize.height,
      options.position,
      options.margin
    );
    
    ctx.globalAlpha = options.opacity;
    ctx.drawImage(
      watermarkImage,
      position.x,
      position.y,
      watermarkSize.width,
      watermarkSize.height
    );
    
    ctx.globalAlpha = 1.0;
    
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const originalName = imageFile.name;
            const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
            const ext = originalName.split('.').pop() || 'png';
            const watermarkedName = `${nameWithoutExt}_watermarked.${ext}`;
            
            resolve({
              success: true,
              blob,
              originalFileName: originalName,
              watermarkedFileName: watermarkedName,
            });
          } else {
            resolve({
              success: false,
              error: 'Failed to create watermarked image',
              originalFileName: imageFile.name,
              watermarkedFileName: '',
            });
          }
        },
        imageFile.type || 'image/png',
        0.95
      );
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      originalFileName: imageFile.name,
      watermarkedFileName: '',
    };
  }
}

export async function processMultipleImages(
  imageFiles: File[],
  watermarkImage: HTMLImageElement,
  options: WatermarkOptions = DEFAULT_WATERMARK_OPTIONS,
  onProgress?: ProgressCallback
): Promise<WatermarkResult[]> {
  const results: WatermarkResult[] = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    
    if (onProgress) {
      onProgress({
        current: i + 1,
        total: imageFiles.length,
        fileName: file.name,
        completed: false,
      });
    }
    
    const result = await applyWatermark(file, watermarkImage, options);
    results.push(result);
    
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  if (onProgress) {
    onProgress({
      current: imageFiles.length,
      total: imageFiles.length,
      fileName: '',
      completed: true,
    });
  }
  
  return results;
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') && 
         ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type);
}

export function validateImageFiles(files: File[]): { valid: File[]; invalid: File[] } {
  const valid: File[] = [];
  const invalid: File[] = [];
  
  files.forEach(file => {
    if (isImageFile(file)) {
      valid.push(file);
    } else {
      invalid.push(file);
    }
  });
  
  return { valid, invalid };
}
