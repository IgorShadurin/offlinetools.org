import { resizeImage, DEFAULT_IMAGE_RESIZE_OPTIONS } from './index';

async function loadSharp(): Promise<unknown> {
  try {
    // @ts-ignore - optional dependency
    return (await import('sharp')).default;
  } catch {
    const path = require('node:path');
    const modPath = path.join(__dirname, '../../../node_modules/.pnpm/sharp@0.34.1/node_modules/sharp/lib/index.js');
    // @ts-ignore - optional dependency
    return (await import(modPath)).default;
  }
}

describe('resizeImage', () => {
  const createSampleBlob = async (): Promise<Blob> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sharp = (await loadSharp()) as any;
    const buf = await sharp({ create: { width: 4, height: 4, channels: 3, background: { r: 255, g: 0, b: 0 } } }).png().toBuffer();
    return new Blob([buf], { type: 'image/png' });
  };

  it('should resize image with aspect ratio', async () => {
    const blob = await createSampleBlob();
    const out = await resizeImage(blob, { ...DEFAULT_IMAGE_RESIZE_OPTIONS, width: 2, height: 2 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sharp = (await loadSharp()) as any;
    const meta = await sharp(Buffer.from(await out.arrayBuffer())).metadata();
    expect(meta.width).toBe(2);
    expect(meta.height).toBe(2);
  });

  it('should resize without keeping aspect ratio', async () => {
    const blob = await createSampleBlob();
    const out = await resizeImage(blob, { ...DEFAULT_IMAGE_RESIZE_OPTIONS, width: 3, height: 1, keepAspectRatio: false });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sharp = (await loadSharp()) as any;
    const meta = await sharp(Buffer.from(await out.arrayBuffer())).metadata();
    expect(meta.width).toBe(3);
    expect(meta.height).toBe(1);
  });

  it('should throw error for empty input', async () => {
    const empty = new Blob([]);
    await expect(resizeImage(empty)).rejects.toThrow('Input image is empty');
  });
});
