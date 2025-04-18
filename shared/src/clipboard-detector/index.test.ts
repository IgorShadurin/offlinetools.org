import { detectClipboardTools, Tool, ClipboardDetectorOptions } from './index';

describe('Clipboard Detector', () => {
  describe('detectClipboardTools', () => {
    // Test photo type
    it('should return binary-base64-codec and file-hash-compare for photo type', () => {
      const options: ClipboardDetectorOptions = { type: 'photo' };
      const result = detectClipboardTools(options);
      
      expect(result).toHaveLength(2);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
    });
    
    // Test video type
    it('should return binary-base64-codec and file-hash-compare for video type', () => {
      const options: ClipboardDetectorOptions = { type: 'video' };
      const result = detectClipboardTools(options);
      
      expect(result).toHaveLength(2);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
    });
    
    // Test string type without content
    it('should return all string-compatible tools for string type without content', () => {
      const options: ClipboardDetectorOptions = { type: 'string' };
      const result = detectClipboardTools(options);
      
      expect(result).toHaveLength(6);
      expect(result).toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.JSON_FORMATTER);
      expect(result).toContain(Tool.TEXT_HASH_GENERATOR);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test empty string content
    it('should return all string-compatible tools for empty string content', () => {
      const options: ClipboardDetectorOptions = { type: 'string', content: '' };
      const result = detectClipboardTools(options);
      
      expect(result).toHaveLength(6);
      expect(result).toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.JSON_FORMATTER);
      expect(result).toContain(Tool.TEXT_HASH_GENERATOR);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test JSON content
    it('should include JSON formatter for valid JSON content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: '{"name": "Test", "value": 123}'
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.JSON_FORMATTER);
    });
    
    // Test malformed JSON content
    it('should not include JSON formatter for malformed JSON', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: '{"name": "Test", "value": 123'  // Missing closing brace
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.JSON_FORMATTER);
    });
    
    // Test valid Base64 content
    it('should include base64-codec for valid Base64 content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'SGVsbG8gV29ybGQ=' // "Hello World" in Base64
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.BASE64_CODEC);
    });
    
    // Test invalid Base64 content (invalid characters)
    it('should not include base64-codec for content with invalid Base64 characters', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'SGVsbG8gV29ybGQ*' // Not valid Base64 (has *)
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.BASE64_CODEC);
    });
    
    // Test invalid Base64 content (invalid length)
    it('should not include base64-codec for content with invalid Base64 length', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'SGVsbG' // Length not divisible by 4
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.BASE64_CODEC);
    });
    
    // Test too short Base64-like content
    it('should not include base64-codec for very short content even if it matches Base64 format', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'abcd' // Valid Base64 format but too short to be likely
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.BASE64_CODEC);
    });
    
    // Test URL content
    it('should include url-encoder for valid URL content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'https://example.com/path?query=value'
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test invalid URL-like content
    it('should not include url-encoder for content that looks like URL but is invalid', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'http://abc' // Too short to be a valid URL
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.URL_ENCODER);
    });
    
    // Test URL-like content with spaces
    it('should not include url-encoder for URL-like content with spaces', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'https://example.com/path with spaces'
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.URL_ENCODER);
    });
    
    // Test plain text content
    it('should include text-hash-generator, file-hash-compare and binary-base64-codec for any string content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'Just a regular text string'
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.TEXT_HASH_GENERATOR);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
    });
    
    // Test null options
    it('should throw an error for null options', () => {
      const badOptions = null as unknown as ClipboardDetectorOptions;
      
      expect(() => {
        detectClipboardTools(badOptions);
      }).toThrow('Failed to detect clipboard tools: Options are required');
    });

    // Test null content (should be treated as undefined)
    it('should handle null content same as undefined content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: null as unknown as string
      };
      const result = detectClipboardTools(options);
      
      expect(result).toHaveLength(6);
      expect(result).toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.JSON_FORMATTER);
      expect(result).toContain(Tool.TEXT_HASH_GENERATOR);
      expect(result).toContain(Tool.URL_ENCODER);
    });
  });
}); 