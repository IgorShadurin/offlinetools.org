/**
 * Options for image resizing
 */
export interface ImageResizeOptions {
  /** Desired width of output image */
  width: number;
  /** Desired height of output image */
  height: number;
  /** Preserve aspect ratio */
  keepAspectRatio: boolean;
  /** Output MIME type */
  type: 'image/png' | 'image/jpeg' | 'image/webp';
  /** Quality from 0 to 1 for JPEG/WebP */
  quality?: number;
}

/**
 * Default image resize options
 */
export const DEFAULT_IMAGE_RESIZE_OPTIONS: ImageResizeOptions = {
  width: 100,
  height: 100,
  keepAspectRatio: true,
  type: 'image/png',
  quality: 0.92,
};

/**
 * Resize an image Blob using the Canvas API
 * @param input - Image blob to resize
 * @param options - Resize options
 * @returns Promise resolving to resized image blob
 */
export async function resizeImage(
  input: Blob,
  options: ImageResizeOptions = DEFAULT_IMAGE_RESIZE_OPTIONS
): Promise<Blob> {
  try {
    if (!input || input.size === 0) {
      throw new Error('Input image is empty');
    }


    const dataUrl: string = await new Promise((resolve, reject): void => {
      const reader = new FileReader();
      reader.onload = (): void => resolve(reader.result as string);
      reader.onerror = (): void => reject(new Error('Failed to read image'));
      reader.readAsDataURL(input);
    });

    const img = await new Promise<HTMLImageElement>((resolve, reject): void => {
      const image = new Image();
      image.onload = (): void => resolve(image);
      image.onerror = (): void => reject(new Error('Failed to load image'));
      image.src = dataUrl;
    });

    let targetWidth = options.width;
    let targetHeight = options.height;
    if (options.keepAspectRatio) {
      const ratio = img.width / img.height;
      if (targetWidth / targetHeight > ratio) {
        targetWidth = Math.round(targetHeight * ratio);
      } else {
        targetHeight = Math.round(targetWidth / ratio);
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context is null');
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    return await new Promise<Blob>((resolve, reject): void => {
      canvas.toBlob(
        (blob): void => {
          if (!blob) {
            reject(new Error('Canvas conversion failed'));
          } else {
            resolve(blob);
          }
        },
        options.type,
        options.quality
      );
    });
  } catch (error) {
    throw new Error(`Image resizing failed: ${(error as Error).message}`);
  }
}
