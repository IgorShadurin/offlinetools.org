/**
 * Line break conversion options
 */
export enum LineBreakType {
  /** Unix line breaks (\n) */
  LF = 'LF',
  /** Windows line breaks (\r\n) */
  CRLF = 'CRLF'
}

/**
 * Case conversion options
 */
export enum CaseType {
  LOWER = 'lower case',
  UPPER = 'UPPER CASE',
  SENTENCE = 'Sentence case',
  TITLE = 'Title Case',
  CAMEL = 'camelCase',
  PASCAL = 'PascalCase',
  SNAKE = 'snake_case',
  CONSTANT = 'CONSTANT_CASE',
  KEBAB = 'kebab-case',
  COBOL = 'COBOL-CASE',
  TRAIN = 'Train-Case',
  ALTERNATING = 'aLtErNaTiNg cAsE',
  INVERSE = 'InVeRsE cAsE',
  RANDOM = 'rAnDoM cAsE'
}

/**
 * Line sorting options
 */
export enum SortType {
  ALPHABETIZE = 'Alphabetize',
  REVERSE_ALPHABETIZE = 'Reverse alphabetize',
  ALPHABETIZE_BY_LAST_WORD = 'Alphabetize by last word',
  REVERSE_ALPHABETIZE_BY_LAST_WORD = 'Reverse alphabetize by last word',
  REVERSE = 'Reverse',
  RANDOMIZE = 'Randomize'
}

/**
 * Text utility operation types
 */
export enum TextUtilityOperation {
  LINE_BREAK_CONVERSION = 'line-break-conversion',
  CASE_CONVERSION = 'case-conversion',
  LINE_SORTING = 'line-sorting'
}

/**
 * Options for text utility operations
 */
export interface TextUtilityOptions {
  /** Type of operation to perform */
  operation: TextUtilityOperation;
  /** Line break type for conversion */
  lineBreakType?: LineBreakType;
  /** Case type for conversion */
  caseType?: CaseType;
  /** Sort type for line sorting */
  sortType?: SortType;
}

/**
 * Default text utility options
 */
export const DEFAULT_TEXT_UTILITY_OPTIONS: TextUtilityOptions = {
  operation: TextUtilityOperation.CASE_CONVERSION,
  lineBreakType: LineBreakType.LF,
  caseType: CaseType.LOWER,
  sortType: SortType.ALPHABETIZE
};

/**
 * Convert line breaks in text
 * @param text - The text to convert
 * @param targetType - The target line break type
 * @returns Text with converted line breaks
 */
export function convertLineBreaks(text: string, targetType: LineBreakType): string {
  if (!text) return '';
  
  try {
    const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    switch (targetType) {
      case LineBreakType.LF:
        return normalized;
      case LineBreakType.CRLF:
        return normalized.replace(/\n/g, '\r\n');
      default:
        return normalized;
    }
  } catch (error) {
    throw new Error(`Line break conversion failed: ${(error as Error).message}`);
  }
}

/**
 * Convert text case
 * @param text - The text to convert
 * @param caseType - The target case type
 * @returns Text with converted case
 */
export function convertCase(text: string, caseType: CaseType): string {
  if (!text) return '';
  
  try {
    switch (caseType) {
      case CaseType.LOWER:
        return text.toLowerCase();
      
      case CaseType.UPPER:
        return text.toUpperCase();
      
      case CaseType.SENTENCE:
        return text.toLowerCase().replace(/(^\w|\.\s+\w)/g, match => match.toUpperCase());
      
      case CaseType.TITLE:
        return text.toLowerCase().replace(/\b\w/g, match => match.toUpperCase());
      
      case CaseType.CAMEL:
        return text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
          .replace(/^[A-Z]/, match => match.toLowerCase());
      
      case CaseType.PASCAL:
        return text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
          .replace(/^[a-z]/, match => match.toUpperCase());
      
      case CaseType.SNAKE:
        return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
      
      case CaseType.CONSTANT:
        return text.toUpperCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
      
      case CaseType.KEBAB:
        return text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      
      case CaseType.COBOL:
        return text.toUpperCase().replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      
      case CaseType.TRAIN:
        return text.toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .replace(/\b\w/g, match => match.toUpperCase());
      
      case CaseType.ALTERNATING:
        return text.split('').map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join('');
      
      case CaseType.INVERSE:
        return text.split('').map(char => 
          char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
        ).join('');
      
      case CaseType.RANDOM:
        return text.split('').map(char => 
          Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
        ).join('');
      
      default:
        return text;
    }
  } catch (error) {
    throw new Error(`Case conversion failed: ${(error as Error).message}`);
  }
}

/**
 * Sort lines in text
 * @param text - The text with lines to sort
 * @param sortType - The sorting method to use
 * @returns Text with sorted lines
 */
export function sortLines(text: string, sortType: SortType): string {
  if (!text) return '';
  
  try {
    const lines = text.split('\n');
    
    switch (sortType) {
      case SortType.ALPHABETIZE:
        return lines.sort((a, b) => a.localeCompare(b)).join('\n');
      
      case SortType.REVERSE_ALPHABETIZE:
        return lines.sort((a, b) => b.localeCompare(a)).join('\n');
      
      case SortType.ALPHABETIZE_BY_LAST_WORD:
        return lines.sort((a, b) => {
          const lastWordA = a.trim().split(/\s+/).pop() || '';
          const lastWordB = b.trim().split(/\s+/).pop() || '';
          return lastWordA.localeCompare(lastWordB);
        }).join('\n');
      
      case SortType.REVERSE_ALPHABETIZE_BY_LAST_WORD:
        return lines.sort((a, b) => {
          const lastWordA = a.trim().split(/\s+/).pop() || '';
          const lastWordB = b.trim().split(/\s+/).pop() || '';
          return lastWordB.localeCompare(lastWordA);
        }).join('\n');
      
      case SortType.REVERSE:
        return lines.reverse().join('\n');
      
      case SortType.RANDOMIZE:
        const shuffled = [...lines];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.join('\n');
      
      default:
        return text;
    }
  } catch (error) {
    throw new Error(`Line sorting failed: ${(error as Error).message}`);
  }
}

/**
 * Process text with the specified utility operation
 * @param text - The input text to process
 * @param options - Processing options
 * @returns The processed text
 * @throws Error if processing fails
 */
export function processText(
  text: string,
  options: TextUtilityOptions = DEFAULT_TEXT_UTILITY_OPTIONS
): string {
  try {
    if (!text) return '';
    
    const mergedOptions = { ...DEFAULT_TEXT_UTILITY_OPTIONS, ...options };
    
    switch (mergedOptions.operation) {
      case TextUtilityOperation.LINE_BREAK_CONVERSION:
        if (!options.lineBreakType) {
          throw new Error('Line break type is required for line break conversion');
        }
        return convertLineBreaks(text, options.lineBreakType);
      
      case TextUtilityOperation.CASE_CONVERSION:
        if (!options.caseType) {
          throw new Error('Case type is required for case conversion');
        }
        return convertCase(text, options.caseType);
      
      case TextUtilityOperation.LINE_SORTING:
        if (!options.sortType) {
          throw new Error('Sort type is required for line sorting');
        }
        return sortLines(text, options.sortType);
      
      default:
        throw new Error(`Unknown operation: ${mergedOptions.operation}`);
    }
  } catch (error) {
    throw new Error(`Text processing failed: ${(error as Error).message}`);
  }
}
