import { 
  generateQRCode, 
  QRCodeErrorCorrectionLevel, 
  QRCodeOutputFormat,
  DEFAULT_QRCODE_OPTIONS,
  isQRCodeDataUrl
} from './index';

describe('QR Code Generator', () => {
  describe('generateQRCode', () => {
    it('should generate a valid SVG QR code', async () => {
      const text = 'https://offlinetools.org';
      const result = await generateQRCode(text);
      
      expect(result).toContain('<svg');
      expect(result).toContain('</svg>');
      expect(result.length).toBeGreaterThan(100);
    });
    
    it('should respect output format options', async () => {
      const text = 'Test QR Code';
      
      const svgResult = await generateQRCode(text, {
        outputFormat: QRCodeOutputFormat.SVG
      });
      expect(svgResult).toContain('<svg');
      
      const dataUrlResult = await generateQRCode(text, {
        outputFormat: QRCodeOutputFormat.DATA_URL
      });
      expect(dataUrlResult).toContain('data:image/png;base64,');
      
      const utf8Result = await generateQRCode(text, {
        outputFormat: QRCodeOutputFormat.UTF8
      });
      expect(utf8Result).toContain('██');
    });
    
    it('should apply different error correction levels', async () => {
      const text = 'Error correction test';
      
      const lowResult = await generateQRCode(text, {
        errorCorrectionLevel: QRCodeErrorCorrectionLevel.LOW,
        outputFormat: QRCodeOutputFormat.SVG
      });
      
      const highResult = await generateQRCode(text, {
        errorCorrectionLevel: QRCodeErrorCorrectionLevel.HIGH,
        outputFormat: QRCodeOutputFormat.SVG
      });
      
      expect(lowResult).not.toEqual(highResult);
    });
    
    it('should respect size option', async () => {
      const text = 'Size test';
      const smallSize = 100;
      const largeSize = 500;
      
      const smallResult = await generateQRCode(text, {
        size: smallSize,
        outputFormat: QRCodeOutputFormat.SVG
      });
      
      const largeResult = await generateQRCode(text, {
        size: largeSize,
        outputFormat: QRCodeOutputFormat.SVG
      });
      
      expect(smallResult).not.toEqual(largeResult);
      expect(smallResult).toContain(`width="${smallSize}"`);
    });
    
    it('should respect color options', async () => {
      const text = 'Color test';
      const color = '#FF0000'; // Red
      
      const result = await generateQRCode(text, {
        color: color,
        outputFormat: QRCodeOutputFormat.SVG
      });
      
      expect(result).toContain(color);
    });
    
    it('should return empty string for empty input', async () => {
      const result = await generateQRCode('');
      expect(result).toBe('');
    });
    
    it('should throw an error for invalid options', async () => {
      await expect(async () => {
        await generateQRCode('test', { outputFormat: 'invalid' as any });
      }).rejects.toThrow('QR code generation failed');
    });
  });
  
  describe('isQRCodeDataUrl', () => {
    it('should return true for valid QR code data URLs', () => {
      const validDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      expect(isQRCodeDataUrl(validDataUrl)).toBe(true);
    });
    
    it('should return false for invalid data', () => {
      expect(isQRCodeDataUrl('not a data url')).toBe(false);
      expect(isQRCodeDataUrl('')).toBe(false);
      expect(isQRCodeDataUrl('data:text/plain,hello')).toBe(false);
    });
  });
});
