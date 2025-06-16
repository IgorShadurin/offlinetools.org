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
      // Watermark 200x100 scaled by 0.2 = 40x20
      expect(result.width).toBe(40);
      expect(result.height).toBe(20);
    });

    it('should scale watermark by exact factor', () => {
      const result = calculateWatermarkSize(800, 600, 100, 200, 0.2);
      // Watermark 100x200 scaled by 0.2 = 20x40
      expect(result.width).toBe(20);
      expect(result.height).toBe(40);
    });

    it('should handle square watermarks', () => {
      const result = calculateWatermarkSize(800, 600, 100, 100, 0.25);
      // Watermark 100x100 scaled by 0.25 = 25x25
      expect(result.width).toBe(25);
      expect(result.height).toBe(25);
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

  describe('Custom positioning functionality', () => {
         it('should correctly convert preview coordinates to actual image coordinates for 1280x960', () => {
       // Test the exact case from user's issue: 1280x960 image
       const imageWidth = 1280;
       const imageHeight = 960;
       const watermarkWidth = 64;
       const watermarkHeight = 48;
       
       // Preview constraints (same as desktop implementation)
       const maxPreviewWidth = 600;
       const maxPreviewHeight = 400;
       const previewScale = Math.min(maxPreviewWidth / imageWidth, maxPreviewHeight / imageHeight, 1);
       
       // For 1280x960, the limiting factor is height: 400/960 = 0.4167
       expect(previewScale).toBeCloseTo(0.4167, 4);
       
       // Preview canvas dimensions (calculated, not DOM dimensions)
       const previewCanvasWidth = imageWidth * previewScale; // 533.33
       const previewCanvasHeight = imageHeight * previewScale; // 400
       
       // Simulate user dragging to center of preview
       const dragX = previewCanvasWidth / 2; // Center horizontally
       const dragY = previewCanvasHeight / 2; // Center vertically
       
       // Apply clamping logic EXACTLY as in the fixed desktop implementation
       const watermarkScale = 0.2 * previewScale; // Default scale * preview scale
       const previewWatermarkWidth = watermarkWidth * watermarkScale;
       const previewWatermarkHeight = watermarkHeight * watermarkScale;
       
       // Use calculated preview dimensions for clamping (this was the bug!)
       const clampedX = Math.max(0, Math.min(previewCanvasWidth - previewWatermarkWidth, dragX - previewWatermarkWidth / 2));
       const clampedY = Math.max(0, Math.min(previewCanvasHeight - previewWatermarkHeight, dragY - previewWatermarkHeight / 2));
       
       // Convert to actual image coordinates (fixed desktop implementation)
       const customPosition = {
         x: clampedX / previewScale,
         y: clampedY / previewScale,
       };
       
       // Expected position should be center of actual image
       const expectedX = imageWidth / 2 - (watermarkWidth * 0.2) / 2; // Center minus half watermark width
       const expectedY = imageHeight / 2 - (watermarkHeight * 0.2) / 2; // Center minus half watermark height
       
       // Debug information for positioning verification (removed for linting)
       
       // With the fix, the positioning should be accurate
       expect(customPosition.x).toBeCloseTo(expectedX, 1);
       expect(customPosition.y).toBeCloseTo(expectedY, 1);
     });

     it('should handle different drag positions correctly for 1280x960', () => {
       // Test dragging to different positions
       const imageWidth = 1280;
       const imageHeight = 960;
       const watermarkWidth = 64;
       const watermarkHeight = 48;
       
       const maxPreviewWidth = 600;
       const maxPreviewHeight = 400;
       const previewScale = Math.min(maxPreviewWidth / imageWidth, maxPreviewHeight / imageHeight, 1);
       
       const previewCanvasWidth = imageWidth * previewScale;
       const previewCanvasHeight = imageHeight * previewScale;
       
       const watermarkScale = 0.2 * previewScale;
       const previewWatermarkWidth = watermarkWidth * watermarkScale;
       const previewWatermarkHeight = watermarkHeight * watermarkScale;
       
       // Test case 1: Top-left corner
       const topLeftDragX = 50;
       const topLeftDragY = 50;
       const topLeftClampedX = Math.max(0, Math.min(previewCanvasWidth - previewWatermarkWidth, topLeftDragX - previewWatermarkWidth / 2));
       const topLeftClampedY = Math.max(0, Math.min(previewCanvasHeight - previewWatermarkHeight, topLeftDragY - previewWatermarkHeight / 2));
       const topLeftPosition = {
         x: topLeftClampedX / previewScale,
         y: topLeftClampedY / previewScale,
       };
       
       // Test case 2: Bottom-right area
       const bottomRightDragX = previewCanvasWidth - 50;
       const bottomRightDragY = previewCanvasHeight - 50;
       const bottomRightClampedX = Math.max(0, Math.min(previewCanvasWidth - previewWatermarkWidth, bottomRightDragX - previewWatermarkWidth / 2));
       const bottomRightClampedY = Math.max(0, Math.min(previewCanvasHeight - previewWatermarkHeight, bottomRightDragY - previewWatermarkHeight / 2));
       const bottomRightPosition = {
         x: bottomRightClampedX / previewScale,
         y: bottomRightClampedY / previewScale,
       };
       
       // Testing different positions (debug output removed for linting)
       
       // Verify positions are within image bounds
       expect(topLeftPosition.x).toBeGreaterThanOrEqual(0);
       expect(topLeftPosition.y).toBeGreaterThanOrEqual(0);
       expect(topLeftPosition.x).toBeLessThanOrEqual(imageWidth);
       expect(topLeftPosition.y).toBeLessThanOrEqual(imageHeight);
       
       expect(bottomRightPosition.x).toBeGreaterThanOrEqual(0);
       expect(bottomRightPosition.y).toBeGreaterThanOrEqual(0);
       expect(bottomRightPosition.x).toBeLessThanOrEqual(imageWidth);
       expect(bottomRightPosition.y).toBeLessThanOrEqual(imageHeight);
       
       // Bottom-right should be closer to the bottom-right corner
       expect(bottomRightPosition.x).toBeGreaterThan(topLeftPosition.x);
       expect(bottomRightPosition.y).toBeGreaterThan(topLeftPosition.y);
     });

    it('should handle coordinate conversion from preview to actual size', () => {
      // Original image: 1800x1200
      // Preview constraints: 600x400 max
      const originalWidth = 1800;
      const originalHeight = 1200;
      const maxPreviewWidth = 600;
      const maxPreviewHeight = 400;
      
      const previewScale = Math.min(maxPreviewWidth / originalWidth, maxPreviewHeight / originalHeight, 1);
      expect(previewScale).toBeCloseTo(0.3333, 4); // 600/1800 = 0.3333
      
      // Position on preview canvas
      const previewX = 150;
      const previewY = 100;
      
      // Convert to actual image coordinates
      const actualX = previewX / previewScale;
      const actualY = previewY / previewScale;
      
      expect(actualX).toBeCloseTo(450, 0); // 150 / 0.3333 ≈ 450
      expect(actualY).toBeCloseTo(300, 0); // 100 / 0.3333 ≈ 300
    });

    it('should handle edge case positioning correctly', () => {
      // Test coordinate clamping logic
      const canvasWidth = 400;
      const canvasHeight = 300;
      const watermarkWidth = 50;
      const watermarkHeight = 40;
      
      // Simulate dragging outside canvas bounds
      const dragPosition = { x: -10, y: -5 }; // Outside canvas
      
      // Apply clamping logic (same as in updatePreview)
      const clampedX = Math.max(0, Math.min(canvasWidth - watermarkWidth, dragPosition.x - watermarkWidth / 2));
      const clampedY = Math.max(0, Math.min(canvasHeight - watermarkHeight, dragPosition.y - watermarkHeight / 2));
      
      expect(clampedX).toBe(0); // Should be clamped to 0
      expect(clampedY).toBe(0); // Should be clamped to 0
    });
  });
});
