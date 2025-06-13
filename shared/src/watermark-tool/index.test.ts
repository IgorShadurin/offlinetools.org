import {
  WatermarkPosition,
  DEFAULT_WATERMARK_OPTIONS,
  calculateWatermarkPosition,
  calculateWatermarkSize,
  isImageFile,
  validateImageFiles,
} from './index';

describe('Watermark Tool', () => {
  describe('calculateWatermarkPosition', () => {
    it('should calculate top-left position correctly', () => {
      const result = calculateWatermarkPosition(800, 600, 100, 80, WatermarkPosition.TOP_LEFT, 20);
      expect(result).toEqual({ x: 20, y: 20 });
    });

    it('should calculate top-right position correctly', () => {
      const result = calculateWatermarkPosition(800, 600, 100, 80, WatermarkPosition.TOP_RIGHT, 20);
      expect(result).toEqual({ x: 680, y: 20 });
    });

    it('should calculate bottom-left position correctly', () => {
      const result = calculateWatermarkPosition(800, 600, 100, 80, WatermarkPosition.BOTTOM_LEFT, 20);
      expect(result).toEqual({ x: 20, y: 500 });
    });

    it('should calculate bottom-right position correctly', () => {
      const result = calculateWatermarkPosition(800, 600, 100, 80, WatermarkPosition.BOTTOM_RIGHT, 20);
      expect(result).toEqual({ x: 680, y: 500 });
    });
  });

  describe('calculateWatermarkSize', () => {
    it('should scale watermark proportionally', () => {
      const result = calculateWatermarkSize(800, 600, 200, 100, 0.2);
      expect(result.width).toBe(120);
      expect(result.height).toBe(60);
    });

    it('should respect aspect ratio when height exceeds max size', () => {
      const result = calculateWatermarkSize(800, 600, 100, 200, 0.2);
      expect(result.width).toBe(60);
      expect(result.height).toBe(120);
    });

    it('should handle square watermarks', () => {
      const result = calculateWatermarkSize(800, 600, 100, 100, 0.25);
      expect(result.width).toBe(150);
      expect(result.height).toBe(150);
    });
  });

  describe('isImageFile', () => {
    it('should return true for valid image files', () => {
      const jpegFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const pngFile = new File([''], 'test.png', { type: 'image/png' });
      const webpFile = new File([''], 'test.webp', { type: 'image/webp' });
      const gifFile = new File([''], 'test.gif', { type: 'image/gif' });

      expect(isImageFile(jpegFile)).toBe(true);
      expect(isImageFile(pngFile)).toBe(true);
      expect(isImageFile(webpFile)).toBe(true);
      expect(isImageFile(gifFile)).toBe(true);
    });

    it('should return false for non-image files', () => {
      const textFile = new File([''], 'test.txt', { type: 'text/plain' });
      const pdfFile = new File([''], 'test.pdf', { type: 'application/pdf' });
      const svgFile = new File([''], 'test.svg', { type: 'image/svg+xml' });

      expect(isImageFile(textFile)).toBe(false);
      expect(isImageFile(pdfFile)).toBe(false);
      expect(isImageFile(svgFile)).toBe(false);
    });
  });

  describe('validateImageFiles', () => {
    it('should separate valid and invalid files', () => {
      const validFile1 = new File([''], 'image1.jpg', { type: 'image/jpeg' });
      const validFile2 = new File([''], 'image2.png', { type: 'image/png' });
      const invalidFile1 = new File([''], 'document.pdf', { type: 'application/pdf' });
      const invalidFile2 = new File([''], 'text.txt', { type: 'text/plain' });

      const files = [validFile1, invalidFile1, validFile2, invalidFile2];
      const result = validateImageFiles(files);

      expect(result.valid).toHaveLength(2);
      expect(result.invalid).toHaveLength(2);
      expect(result.valid).toContain(validFile1);
      expect(result.valid).toContain(validFile2);
      expect(result.invalid).toContain(invalidFile1);
      expect(result.invalid).toContain(invalidFile2);
    });

    it('should handle empty file array', () => {
      const result = validateImageFiles([]);
      expect(result.valid).toHaveLength(0);
      expect(result.invalid).toHaveLength(0);
    });
  });

  describe('DEFAULT_WATERMARK_OPTIONS', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_WATERMARK_OPTIONS.position).toBe(WatermarkPosition.BOTTOM_RIGHT);
      expect(DEFAULT_WATERMARK_OPTIONS.opacity).toBe(0.7);
      expect(DEFAULT_WATERMARK_OPTIONS.scale).toBe(0.2);
      expect(DEFAULT_WATERMARK_OPTIONS.margin).toBe(20);
    });
  });
});
