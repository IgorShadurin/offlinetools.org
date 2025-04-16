import { encodeBase64, decodeBase64, Base64Options } from './index';

describe('encodeBase64', () => {
  // Test with valid inputs
  it('should correctly encode strings to Base64', () => {
    expect(encodeBase64('Hello, World!')).toBe('SGVsbG8sIFdvcmxkIQ==');
    expect(encodeBase64('test')).toBe('dGVzdA==');
    expect(encodeBase64('')).toBe('');
  });

  // Test with special characters
  it('should handle special characters', () => {
    expect(encodeBase64('äöü')).toBe('w6TDtsO8');
    expect(encodeBase64('!@#$%^&*()')).toBe('IUAjJCVeJiooKQ==');
  });

  // Test URL-safe option
  it('should respect URL-safe option', () => {
    const options: Base64Options = { urlSafe: true };
    // Using a known string that produces Base64 with + and / characters
    const input = ">>>???"; // This produces "Pj4+Pz8/" which has / characters
    
    const normal = encodeBase64(input);
    const urlSafe = encodeBase64(input, options);
    
    expect(normal).not.toBe(urlSafe);
    expect(normal.includes('/')).toBe(true); // Check for /
    expect(urlSafe.includes('/')).toBe(false);
    expect(urlSafe.includes('_')).toBe(true); // Check for _ instead
  });
});

describe('decodeBase64', () => {
  // Test with valid Base64
  it('should correctly decode Base64 to strings', () => {
    expect(decodeBase64('SGVsbG8sIFdvcmxkIQ==')).toBe('Hello, World!');
    expect(decodeBase64('dGVzdA==')).toBe('test');
    expect(decodeBase64('')).toBe('');
  });

  // Test with special characters
  it('should handle special characters', () => {
    expect(decodeBase64('w6TDtsO8')).toBe('äöü');
    expect(decodeBase64('IUAjJCVeJiooKQ==')).toBe('!@#$%^&*()');
  });

  // Test URL-safe option
  it('should respect URL-safe option', () => {
    const options: Base64Options = { urlSafe: true };
    // Create a URL-safe encoded string with - and _ characters
    const normal = 'ab+/cd==';
    const urlSafe = 'ab-_cd==';
    
    // Should decode the same when the right option is set
    expect(decodeBase64(normal)).toBe(decodeBase64(urlSafe, options));
  });

  // Test error handling
  it('should throw an error for invalid Base64', () => {
    expect(() => {
      decodeBase64('###'); // Invalid characters
    }).toThrow('Base64 decoding failed');
    
    // Test other invalid Base64 values
    expect(() => {
      decodeBase64('ab!def'); // Invalid characters
    }).toThrow('Base64 decoding failed');
  });
}); 