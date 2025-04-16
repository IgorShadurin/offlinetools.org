import { formatJson, JsonIndentationType } from './index';

describe('formatJson', () => {
  const sampleJson = {
    name: 'JSON Formatter',
    version: '1.0.0',
    features: ['formatting', 'validation'],
    config: {
      defaultIndentation: '2 spaces',
      supportedIndentations: [
        '2 spaces',
        '4 spaces',
        '1 tab',
        'Minified'
      ]
    }
  };
  
  const sampleJsonString = JSON.stringify(sampleJson);

  it('should format JSON with 2 spaces by default', () => {
    const formatted = formatJson(sampleJsonString);
    
    // Check that it's properly formatted with 2 spaces
    const lines = formatted.split('\n');
    expect(lines[1].startsWith('  "')).toBe(true);
    expect(lines[2].startsWith('  "')).toBe(true);
    
    // Make sure parsing the formatted JSON returns the original object
    expect(JSON.parse(formatted)).toEqual(sampleJson);
  });

  it('should format JSON with 4 spaces', () => {
    const formatted = formatJson(sampleJsonString, { 
      indentation: JsonIndentationType.FourSpaces 
    });
    
    // Check that it's properly formatted with 4 spaces
    const lines = formatted.split('\n');
    expect(lines[1].startsWith('    "')).toBe(true);
    expect(lines[2].startsWith('    "')).toBe(true);
    
    // Make sure parsing the formatted JSON returns the original object
    expect(JSON.parse(formatted)).toEqual(sampleJson);
  });

  it('should format JSON with tabs', () => {
    const formatted = formatJson(sampleJsonString, { 
      indentation: JsonIndentationType.OneTab 
    });
    
    // Check that it's properly formatted with tabs
    const lines = formatted.split('\n');
    expect(lines[1].startsWith('\t"')).toBe(true);
    expect(lines[2].startsWith('\t"')).toBe(true);
    
    // Make sure parsing the formatted JSON returns the original object
    expect(JSON.parse(formatted)).toEqual(sampleJson);
  });

  it('should minify JSON', () => {
    const formatted = formatJson(sampleJsonString, { 
      indentation: JsonIndentationType.Minified 
    });
    
    // Check that it's properly minified (no newlines)
    expect(formatted).not.toContain('\n');
    
    // Make sure parsing the formatted JSON returns the original object
    expect(JSON.parse(formatted)).toEqual(sampleJson);
  });

  it('should throw an error for invalid JSON', () => {
    const invalidJson = '{ "name": "Invalid JSON" "version": "1.0.0" }';
    
    expect(() => {
      formatJson(invalidJson);
    }).toThrow('Invalid JSON');
  });
}); 