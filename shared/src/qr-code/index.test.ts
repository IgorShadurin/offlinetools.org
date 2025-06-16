import { generateQrCode, decodeQrCode } from './index';

describe('QR Code generation', () => {
  it('should generate a data URL', async () => {
    const text = 'Hello QR';
    const dataUrl = await generateQrCode(text);
    expect(dataUrl.startsWith('data:image')).toBe(true);
  });

  it('should return empty string for empty input', async () => {
    const dataUrl = await generateQrCode('');
    expect(dataUrl).toBe('');
  });

  it('decode is unsupported in Node', async () => {
    await expect(decodeQrCode('data:,'))
      .rejects.toThrow('QR decoding in Node is not supported');
  });
});
