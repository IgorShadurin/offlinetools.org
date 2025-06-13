import {
  convertLineBreaks,
  convertCase,
  sortLines,
  processText,
  LineBreakType,
  CaseType,
  SortType,
  TextUtilityOperation,
  DEFAULT_TEXT_UTILITY_OPTIONS
} from './index';

describe('Text Utility', () => {
  describe('convertLineBreaks', () => {
    it('should convert to LF line breaks', () => {
      const input = 'line1\r\nline2\rline3\nline4';
      const result = convertLineBreaks(input, LineBreakType.LF);
      expect(result).toBe('line1\nline2\nline3\nline4');
    });

    it('should convert to CRLF line breaks', () => {
      const input = 'line1\nline2\rline3\r\nline4';
      const result = convertLineBreaks(input, LineBreakType.CRLF);
      expect(result).toBe('line1\r\nline2\r\nline3\r\nline4');
    });

    it('should handle empty input', () => {
      expect(convertLineBreaks('', LineBreakType.LF)).toBe('');
      expect(convertLineBreaks('', LineBreakType.CRLF)).toBe('');
    });

    it('should handle text without line breaks', () => {
      const input = 'single line text';
      expect(convertLineBreaks(input, LineBreakType.LF)).toBe(input);
      expect(convertLineBreaks(input, LineBreakType.CRLF)).toBe(input);
    });
  });

  describe('convertCase', () => {
    const testText = 'hello WORLD test';

    it('should convert to lowercase', () => {
      expect(convertCase(testText, CaseType.LOWER)).toBe('hello world test');
    });

    it('should convert to uppercase', () => {
      expect(convertCase(testText, CaseType.UPPER)).toBe('HELLO WORLD TEST');
    });

    it('should convert to sentence case', () => {
      const input = 'hello world. this is a test. another sentence.';
      const result = convertCase(input, CaseType.SENTENCE);
      expect(result).toBe('Hello world. This is a test. Another sentence.');
    });

    it('should convert to title case', () => {
      expect(convertCase('hello world test', CaseType.TITLE)).toBe('Hello World Test');
    });

    it('should convert to camelCase', () => {
      expect(convertCase('hello world test', CaseType.CAMEL)).toBe('helloWorldTest');
      expect(convertCase('Hello World Test', CaseType.CAMEL)).toBe('helloWorldTest');
    });

    it('should convert to PascalCase', () => {
      expect(convertCase('hello world test', CaseType.PASCAL)).toBe('HelloWorldTest');
      expect(convertCase('hello world test', CaseType.PASCAL)).toBe('HelloWorldTest');
    });

    it('should convert to snake_case', () => {
      expect(convertCase('hello world test', CaseType.SNAKE)).toBe('hello_world_test');
      expect(convertCase('Hello World Test!', CaseType.SNAKE)).toBe('hello_world_test');
    });

    it('should convert to CONSTANT_CASE', () => {
      expect(convertCase('hello world test', CaseType.CONSTANT)).toBe('HELLO_WORLD_TEST');
      expect(convertCase('Hello World Test!', CaseType.CONSTANT)).toBe('HELLO_WORLD_TEST');
    });

    it('should convert to kebab-case', () => {
      expect(convertCase('hello world test', CaseType.KEBAB)).toBe('hello-world-test');
      expect(convertCase('Hello World Test!', CaseType.KEBAB)).toBe('hello-world-test');
    });

    it('should convert to COBOL-CASE', () => {
      expect(convertCase('hello world test', CaseType.COBOL)).toBe('HELLO-WORLD-TEST');
      expect(convertCase('Hello World Test!', CaseType.COBOL)).toBe('HELLO-WORLD-TEST');
    });

    it('should convert to Train-Case', () => {
      expect(convertCase('hello world test', CaseType.TRAIN)).toBe('Hello-World-Test');
      expect(convertCase('Hello World Test!', CaseType.TRAIN)).toBe('Hello-World-Test');
    });

    it('should convert to aLtErNaTiNg cAsE', () => {
      const result = convertCase('hello', CaseType.ALTERNATING);
      expect(result).toBe('hElLo');
    });

    it('should convert to InVeRsE cAsE', () => {
      const result = convertCase('Hello World', CaseType.INVERSE);
      expect(result).toBe('hELLO wORLD');
    });

    it('should convert to rAnDoM cAsE', () => {
      const result = convertCase('hello world', CaseType.RANDOM);
      expect(result).toHaveLength(11);
      expect(result.toLowerCase()).toBe('hello world');
    });

    it('should handle empty input', () => {
      Object.values(CaseType).forEach(caseType => {
        expect(convertCase('', caseType)).toBe('');
      });
    });

    it('should handle special characters and unicode', () => {
      const input = 'héllo wörld 123!@#';
      expect(convertCase(input, CaseType.LOWER)).toBe('héllo wörld 123!@#');
      expect(convertCase(input, CaseType.UPPER)).toBe('HÉLLO WÖRLD 123!@#');
    });
  });

  describe('sortLines', () => {
    const testLines = 'zebra\napple\nbanana\ncherry';
    const testLinesWithSpaces = 'zebra animal\napple fruit\nbanana fruit\ncherry fruit';

    it('should alphabetize lines', () => {
      const result = sortLines(testLines, SortType.ALPHABETIZE);
      expect(result).toBe('apple\nbanana\ncherry\nzebra');
    });

    it('should reverse alphabetize lines', () => {
      const result = sortLines(testLines, SortType.REVERSE_ALPHABETIZE);
      expect(result).toBe('zebra\ncherry\nbanana\napple');
    });

    it('should alphabetize by last word', () => {
      const result = sortLines(testLinesWithSpaces, SortType.ALPHABETIZE_BY_LAST_WORD);
      expect(result).toBe('zebra animal\napple fruit\nbanana fruit\ncherry fruit');
    });

    it('should reverse alphabetize by last word', () => {
      const result = sortLines(testLinesWithSpaces, SortType.REVERSE_ALPHABETIZE_BY_LAST_WORD);
      expect(result).toBe('apple fruit\nbanana fruit\ncherry fruit\nzebra animal');
    });

    it('should reverse lines', () => {
      const result = sortLines(testLines, SortType.REVERSE);
      expect(result).toBe('cherry\nbanana\napple\nzebra');
    });

    it('should randomize lines', () => {
      const result = sortLines(testLines, SortType.RANDOMIZE);
      const resultLines = result.split('\n');
      const originalLines = testLines.split('\n');
      
      expect(resultLines).toHaveLength(originalLines.length);
      originalLines.forEach(line => {
        expect(resultLines).toContain(line);
      });
    });

    it('should handle empty input', () => {
      Object.values(SortType).forEach(sortType => {
        expect(sortLines('', sortType)).toBe('');
      });
    });

    it('should handle single line', () => {
      const singleLine = 'single line';
      Object.values(SortType).forEach(sortType => {
        const result = sortLines(singleLine, sortType);
        expect(result).toBe(singleLine);
      });
    });

    it('should handle lines with empty lines', () => {
      const input = 'line1\n\nline3\n\nline5';
      const result = sortLines(input, SortType.ALPHABETIZE);
      expect(result.split('\n')).toContain('');
    });
  });

  describe('processText', () => {
    it('should process line break conversion', () => {
      const input = 'line1\r\nline2\nline3';
      const result = processText(input, {
        operation: TextUtilityOperation.LINE_BREAK_CONVERSION,
        lineBreakType: LineBreakType.LF
      });
      expect(result).toBe('line1\nline2\nline3');
    });

    it('should process case conversion', () => {
      const input = 'Hello World';
      const result = processText(input, {
        operation: TextUtilityOperation.CASE_CONVERSION,
        caseType: CaseType.UPPER
      });
      expect(result).toBe('HELLO WORLD');
    });

    it('should process line sorting', () => {
      const input = 'zebra\napple\nbanana';
      const result = processText(input, {
        operation: TextUtilityOperation.LINE_SORTING,
        sortType: SortType.ALPHABETIZE
      });
      expect(result).toBe('apple\nbanana\nzebra');
    });

    it('should use default options', () => {
      const input = 'Hello World';
      const result = processText(input);
      expect(result).toBe('hello world');
    });

    it('should handle empty input', () => {
      expect(processText('')).toBe('');
    });

    it('should throw error for missing required options', () => {
      expect(() => {
        processText('test', {
          operation: TextUtilityOperation.LINE_BREAK_CONVERSION
        });
      }).toThrow('Line break type is required for line break conversion');

      expect(() => {
        processText('test', {
          operation: TextUtilityOperation.CASE_CONVERSION
        });
      }).toThrow('Case type is required for case conversion');

      expect(() => {
        processText('test', {
          operation: TextUtilityOperation.LINE_SORTING
        });
      }).toThrow('Sort type is required for line sorting');
    });

    it('should throw error for unknown operation', () => {
      expect(() => {
        processText('test', {
          operation: 'unknown' as TextUtilityOperation
        });
      }).toThrow('Unknown operation: unknown');
    });

    it('should handle unicode and special characters', () => {
      const input = 'héllo wörld 🌍\ntest line 2';
      const result = processText(input, {
        operation: TextUtilityOperation.CASE_CONVERSION,
        caseType: CaseType.UPPER
      });
      expect(result).toBe('HÉLLO WÖRLD 🌍\nTEST LINE 2');
    });
  });

  describe('DEFAULT_TEXT_UTILITY_OPTIONS', () => {
    it('should have correct default values', () => {
      expect(DEFAULT_TEXT_UTILITY_OPTIONS.operation).toBe(TextUtilityOperation.CASE_CONVERSION);
      expect(DEFAULT_TEXT_UTILITY_OPTIONS.lineBreakType).toBe(LineBreakType.LF);
      expect(DEFAULT_TEXT_UTILITY_OPTIONS.caseType).toBe(CaseType.LOWER);
      expect(DEFAULT_TEXT_UTILITY_OPTIONS.sortType).toBe(SortType.ALPHABETIZE);
    });
  });
});
