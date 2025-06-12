import '../index';
import { detectClipboardTools, Tool, ClipboardDetectorOptions, getRegisteredTools } from './index';
import { ClipboardType } from './index';

describe('Clipboard Detector', () => {
  describe('detectClipboardTools', () => {
    // Test photo type
    it('should return binary-base64-codec, file-hash-compare and file-generator for photo type', () => {
      const options = {
        type: 'photo' as ClipboardType
      };
      const expected = getRegisteredTools().filter(r => r.supportedTypes.includes('photo')).length;
      const result = detectClipboardTools(options);

      expect(result).toHaveLength(expected);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.FILE_GENERATOR);
    });
    
    // Test video type
    it('should return binary-base64-codec, file-hash-compare and file-generator for video type', () => {
      const options = {
        type: 'video' as ClipboardType
      };
      const expected = getRegisteredTools().filter(r => r.supportedTypes.includes('video')).length;
      const result = detectClipboardTools(options);

      expect(result).toHaveLength(expected);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.FILE_GENERATOR);
    });
    
    // Test string type without content
    it('should return all string-compatible tools for string type without content', () => {
      const options = {
        type: 'string' as ClipboardType
      };
      const expected = getRegisteredTools().filter(r => r.supportedTypes.includes('string')).length;
      const result = detectClipboardTools(options);
      expect(result).toHaveLength(expected);
      expect(result).toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.HTML_TEXT_EXTRACTOR);
      expect(result).toContain(Tool.JSON_FORMATTER);
      expect(result).toContain(Tool.TEXT_HASH_GENERATOR);
      expect(result).toContain(Tool.URL_ENCODER);
      expect(result).toContain(Tool.FILE_GENERATOR);
      expect(result).toContain(Tool.UUID_GENERATOR);
      expect(result).toContain(Tool.SPEECH_LENGTH_ESTIMATOR);
      expect(result).toContain(Tool.TEXT_TO_SLUG);
      expect(result).toContain(Tool.ETHEREUM_CONVERTER);
    });
    
    // Test empty string content
    it('should return all string-compatible tools for empty string content', () => {
      const options = {
        type: 'string' as ClipboardType,
        content: ''
      };
      const expected = getRegisteredTools().filter(r => r.supportedTypes.includes('string')).length;
      const result = detectClipboardTools(options);
      expect(result).toHaveLength(expected);
      expect(result).toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.HTML_TEXT_EXTRACTOR);
      expect(result).toContain(Tool.JSON_FORMATTER);
      expect(result).toContain(Tool.TEXT_HASH_GENERATOR);
      expect(result).toContain(Tool.URL_ENCODER);
      expect(result).toContain(Tool.FILE_GENERATOR);
      expect(result).toContain(Tool.UUID_GENERATOR);
      expect(result).toContain(Tool.SPEECH_LENGTH_ESTIMATOR);
      expect(result).toContain(Tool.TEXT_TO_SLUG);
      expect(result).toContain(Tool.ETHEREUM_CONVERTER);
    });
    
    // Test JSON content
    it('should include JSON formatter for valid JSON content and include URL_ENCODER', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: '{"name": "Test", "value": 123}'
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.JSON_FORMATTER);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test malformed JSON content
    it('should not include JSON formatter for malformed JSON but include URL_ENCODER', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: '{"name": "Test", "value": 123'  // Missing closing brace
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.JSON_FORMATTER);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test valid Base64 content
    it('should include base64-codec for valid Base64 content and include URL_ENCODER', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'SGVsbG8gV29ybGQ=' // "Hello World" in Base64
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test invalid Base64 content (invalid characters)
    it('should not include base64-codec for content with invalid Base64 characters but include URL_ENCODER', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'SGVsbG8gV29ybGQ*' // Not valid Base64 (has *)
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test invalid Base64 content (invalid length)
    it('should not include base64-codec for content with invalid Base64 length but include URL_ENCODER', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'SGVsbG' // Length not divisible by 4
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test too short Base64-like content
    it('should not include base64-codec for very short content even if it matches Base64 format but include URL_ENCODER', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'abcd' // Valid Base64 format but too short to be likely
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test URL content
    it('should include url-encoder as first tool for valid URL content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'https://example.com/path?query=value'
      };
      const result = detectClipboardTools(options);
      
      expect(result[0]).toBe(Tool.URL_ENCODER);
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test invalid URL-like content
    it('should include URL_ENCODER for content that looks like URL but is invalid', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'http://abc' // Too short to be a valid URL
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    // Test URL-like content with spaces
    it('should include URL_ENCODER for URL-like content with spaces', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'https://example.com/path with spaces'
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.URL_ENCODER);
    });
    
    it('should include html-text-extractor for valid HTML content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: '<div><p>This is HTML content</p></div>'
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.HTML_TEXT_EXTRACTOR);
    });
    
    it('should not include html-text-extractor for non-HTML content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'This is plain text without any HTML tags'
      };
      const result = detectClipboardTools(options);
      
      expect(result).not.toContain(Tool.HTML_TEXT_EXTRACTOR);
    });
    
    // Test plain text content
    it('should include URL_ENCODER plus text-hash-generator, file-hash-compare and binary-base64-codec for any string content', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'Just a regular text string'
      };
      const result = detectClipboardTools(options);
      
      expect(result).toContain(Tool.URL_ENCODER);
      expect(result).toContain(Tool.TEXT_HASH_GENERATOR);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
    });
    
    // Test plain text with default to URL Encoder
    it('should return URL_ENCODER as a tool for plain text like "hello world"', () => {
      const options: ClipboardDetectorOptions = { 
        type: 'string', 
        content: 'hello world'
      };
      const result = detectClipboardTools(options);
      
      expect(result.length).toBeGreaterThan(0);
      expect(result).toContain(Tool.URL_ENCODER);
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
      const options = {
        type: 'string' as ClipboardType,
        content: null as unknown as string
      };
      const expected = getRegisteredTools().filter(r => r.supportedTypes.includes('string')).length;
      const result = detectClipboardTools(options);
      expect(result).toHaveLength(expected);
      expect(result).toContain(Tool.BASE64_CODEC);
      expect(result).toContain(Tool.BINARY_BASE64_CODEC);
      expect(result).toContain(Tool.FILE_HASH_COMPARE);
      expect(result).toContain(Tool.HTML_TEXT_EXTRACTOR);
      expect(result).toContain(Tool.JSON_FORMATTER);
      expect(result).toContain(Tool.TEXT_HASH_GENERATOR);
      expect(result).toContain(Tool.URL_ENCODER);
      expect(result).toContain(Tool.FILE_GENERATOR);
      expect(result).toContain(Tool.UUID_GENERATOR);
      expect(result).toContain(Tool.SPEECH_LENGTH_ESTIMATOR);
      expect(result).toContain(Tool.TEXT_TO_SLUG);
      expect(result).toContain(Tool.ETHEREUM_CONVERTER);
    });

    describe('UUID detection', () => {
      it('should detect v4 UUID', () => {
        const options = {
          type: 'string' as ClipboardType,
          content: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        };
        const result = detectClipboardTools(options);
        expect(result).toContain(Tool.UUID_GENERATOR);
      });

      it('should detect v1 UUID', () => {
        const options = {
          type: 'string' as ClipboardType,
          content: '2c5ea4c0-4067-11e9-9bdd-2b0d7b3dcb6d'
        };
        const result = detectClipboardTools(options);
        expect(result).toContain(Tool.UUID_GENERATOR);
      });

      it('should not detect invalid UUID', () => {
        const options = {
          type: 'string' as ClipboardType,
          content: 'not-a-uuid'
        };
        const result = detectClipboardTools(options);
        expect(result).not.toContain(Tool.UUID_GENERATOR);
      });
    });
  });
});                                