import { encodeUrl, decodeUrl, UrlCodecOptions } from './index';

describe('URL Encoder/Decoder', () => {
  describe('encodeUrl', () => {
    it('should encode a string with special characters', () => {
      const input = 'Hello World! This is a test with special chars: ?&=';
      const expected = 'Hello%20World!%20This%20is%20a%20test%20with%20special%20chars%3A%20%3F%26%3D';
      
      const result = encodeUrl(input);
      
      expect(result).toBe(expected);
    });
    
    it('should encode a string with unicode characters', () => {
      const input = 'こんにちは世界';
      const expected = '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF%E4%B8%96%E7%95%8C';
      
      const result = encodeUrl(input);
      
      expect(result).toBe(expected);
    });
    
    it('should return empty string for empty input', () => {
      expect(encodeUrl('')).toBe('');
      expect(encodeUrl(undefined as unknown as string)).toBe('');
    });
    
    it('should use escape when useEscapeUnescape option is enabled', () => {
      const input = 'Hello World!';
      const options: UrlCodecOptions = { useEscapeUnescape: true };
      
      const result = encodeUrl(input, options);
      
      // escape behaves differently from encodeURIComponent
      // Note: The actual behavior may vary across browsers, but this should match
      // the JavaScript runtime we're testing with
      expect(result).toBe('Hello%20World%21');
    });
  });
  
  describe('decodeUrl', () => {
    it('should decode an encoded string', () => {
      const input = 'Hello%20World!%20This%20is%20a%20test%20with%20special%20chars%3A%20%3F%26%3D';
      const expected = 'Hello World! This is a test with special chars: ?&=';
      
      const result = decodeUrl(input);
      
      expect(result).toBe(expected);
    });
    
    it('should decode a string with encoded unicode characters', () => {
      const input = '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF%E4%B8%96%E7%95%8C';
      const expected = 'こんにちは世界';
      
      const result = decodeUrl(input);
      
      expect(result).toBe(expected);
    });
    
    it('should return empty string for empty input', () => {
      expect(decodeUrl('')).toBe('');
      expect(decodeUrl(undefined as unknown as string)).toBe('');
    });
    
    it('should use unescape when useEscapeUnescape option is enabled', () => {
      const input = 'Hello%20World%21';
      const options: UrlCodecOptions = { useEscapeUnescape: true };
      
      const result = decodeUrl(input, options);
      
      expect(result).toBe('Hello World!');
    });
    
    it('should throw an error for invalid encoded text', () => {
      const invalidEncodedText = 'Invalid%FGencoded%text';
      
      expect(() => {
        decodeUrl(invalidEncodedText);
      }).toThrow('URL decoding failed');
    });
  });
}); 