import { resizeImage, DEFAULT_IMAGE_RESIZE_OPTIONS } from './index';
function createSampleBlob(): Blob {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = 4;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 4, 4);
  const dataUrl = canvas.toDataURL('image/png');
  const binary = atob(dataUrl.split(',')[1]);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type: 'image/png' });
}

function getPngSize(buffer: ArrayBuffer): { width: number; height: number } {
  const view = new DataView(buffer);
  const width = view.getUint32(16);
  const height = view.getUint32(20);
  return { width, height };
}

describe.skip('resizeImage', () => {

  it('should resize image with aspect ratio', async () => {
    const blob = createSampleBlob();
    const out = await resizeImage(blob, { ...DEFAULT_IMAGE_RESIZE_OPTIONS, width: 2, height: 2 });
    const size = getPngSize(await out.arrayBuffer());
    expect(size.width).toBe(2);
    expect(size.height).toBe(2);
  });

  it('should resize without keeping aspect ratio', async () => {
    const blob = createSampleBlob();
    const out = await resizeImage(blob, { ...DEFAULT_IMAGE_RESIZE_OPTIONS, width: 3, height: 1, keepAspectRatio: false });
    const size = getPngSize(await out.arrayBuffer());
    expect(size.width).toBe(3);
    expect(size.height).toBe(1);
  });

  it('should throw error for empty input', async () => {
    const empty = new Blob([]);
    await expect(resizeImage(empty)).rejects.toThrow('Input image is empty');
  });
});
