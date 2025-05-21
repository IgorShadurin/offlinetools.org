import { testRegex, isValidRegex, RegexFlag, RegexTesterOptions } from './index';

describe('RegexTester', () => {
  describe('testRegex', () => {
    it('should correctly find matches for a basic pattern', () => {
      const pattern = 'test';
      const testString = 'this is a test string with test word';
      const options: RegexTesterOptions = { flags: [RegexFlag.GLOBAL] };
      
      const matches = testRegex(pattern, testString, options);
      
      expect(matches).toHaveLength(2);
      expect(matches[0].text).toBe('test');
      expect(matches[0].index).toBe(10);
      expect(matches[1].text).toBe('test');
      expect(matches[1].index).toBe(23);
    });
    
    it('should correctly handle capture groups', () => {
      const pattern = '(\\w+)=(\\d+)';
      const testString = 'key1=123 key2=456';
      const options: RegexTesterOptions = { flags: [RegexFlag.GLOBAL] };
      
      const matches = testRegex(pattern, testString, options);
      
      expect(matches).toHaveLength(2);
      
      expect(matches[0].text).toBe('key1=123');
      expect(matches[0].groups).toHaveLength(2);
      expect(matches[0].groups[0].text).toBe('key1');
      expect(matches[0].groups[1].text).toBe('123');
      
      expect(matches[1].text).toBe('key2=456');
      expect(matches[1].groups).toHaveLength(2);
      expect(matches[1].groups[0].text).toBe('key2');
      expect(matches[1].groups[1].text).toBe('456');
    });
    
    it('should respect case-insensitive flag', () => {
      const pattern = 'test';
      const testString = 'Test TEST test';
      
      const matchesCase = testRegex(pattern, testString, { flags: [RegexFlag.GLOBAL] });
      expect(matchesCase).toHaveLength(1);
      
      const matchesNoCase = testRegex(pattern, testString, { 
        flags: [RegexFlag.GLOBAL, RegexFlag.CASE_INSENSITIVE] 
      });
      expect(matchesNoCase).toHaveLength(3);
    });
    
    it('should respect multiline flag', () => {
      const pattern = '^line';
      const testString = 'first line\nline second\nline third';
      
      const matchesNoMulti = testRegex(pattern, testString, { flags: [RegexFlag.GLOBAL] });
      expect(matchesNoMulti).toHaveLength(1);
      
      const matchesMulti = testRegex(pattern, testString, { 
        flags: [RegexFlag.GLOBAL, RegexFlag.MULTILINE] 
      });
      expect(matchesMulti).toHaveLength(3);
    });
    
    it('should return empty array for empty inputs', () => {
      expect(testRegex('', 'test string')).toHaveLength(0);
      expect(testRegex('test', '')).toHaveLength(0);
    });
    
    it('should throw an error for invalid regex patterns', () => {
      expect(() => {
        testRegex('(unclosed', 'test string');
      }).toThrow('Invalid regex');
      
      expect(() => {
        testRegex('[a-z', 'test string');
      }).toThrow('Invalid regex');
    });
  });
  
  describe('isValidRegex', () => {
    it('should return true for valid regex patterns', () => {
      expect(isValidRegex('test')).toBe(true);
      expect(isValidRegex('\\d+')).toBe(true);
      expect(isValidRegex('[a-zA-Z]+')).toBe(true);
      expect(isValidRegex('(\\w+)\\s(\\w+)')).toBe(true);
    });
    
    it('should return false for invalid regex patterns', () => {
      expect(isValidRegex('(')).toBe(false);
      expect(isValidRegex('[')).toBe(false);
      expect(isValidRegex('\\k')).toBe(false);
      expect(isValidRegex('?*+')).toBe(false);
    });
    
    it('should handle patterns with slashes correctly', () => {
      expect(isValidRegex('/test/')).toBe(true);
      expect(isValidRegex('/\\d+/g')).toBe(true);
      expect(isValidRegex('/[a-z/gi')).toBe(false);
    });
  });
});
