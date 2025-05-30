/**
 * Separator options for slug generation
 */
export enum SeparatorType {
  /** Use dash (-) as separator */
  DASH = '-',
  /** Use underscore (_) as separator */
  UNDERSCORE = '_'
}

/**
 * Options for text to slug conversion
 */
export interface TextToSlugOptions {
  /** Type of separator to use between words */
  separator: SeparatorType;
  /** Convert to lowercase */
  lowercase: boolean;
  /** Remove numbers from the slug */
  removeNumbers: boolean;
  /** Remove common stop words */
  removeStopWords: boolean;
  /** Only allow alphanumeric characters and separators (URL-safe) */
  strict: boolean;
}

/**
 * Default options for text to slug conversion
 */
export const DEFAULT_TEXT_TO_SLUG_OPTIONS: TextToSlugOptions = {
  separator: SeparatorType.DASH,
  lowercase: true,
  removeNumbers: false,
  removeStopWords: false,
  strict: true
};

/**
 * Common English stop words to remove
 */
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they', 'have',
  'had', 'what', 'said', 'each', 'which', 'she', 'do', 'how', 'their',
  'if', 'up', 'out', 'many', 'then', 'them', 'these', 'so', 'some',
  'her', 'would', 'make', 'like', 'into', 'him', 'time', 'two', 'more',
  'go', 'no', 'way', 'could', 'my', 'than', 'first', 'been', 'call',
  'who', 'oil', 'sit', 'now', 'find', 'down', 'day', 'did', 'get',
  'come', 'made', 'may', 'part'
]);

/**
 * Character transliteration map for common Unicode characters
 */
const TRANSLITERATION_MAP: Record<string, string> = {
  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE',
  'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I',
  'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O',
  'Õ': 'O', 'Ö': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U',
  'Ý': 'Y', 'Þ': 'TH', 'ß': 'ss',
  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae',
  'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i',
  'î': 'i', 'ï': 'i', 'ð': 'd', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o',
  'õ': 'o', 'ö': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
  'ý': 'y', 'þ': 'th', 'ÿ': 'y',
  
  'Ā': 'A', 'ā': 'a', 'Ă': 'A', 'ă': 'a', 'Ą': 'A', 'ą': 'a',
  'Ć': 'C', 'ć': 'c', 'Ĉ': 'C', 'ĉ': 'c', 'Ċ': 'C', 'ċ': 'c', 'Č': 'C', 'č': 'c',
  'Ď': 'D', 'ď': 'd', 'Đ': 'D', 'đ': 'd',
  'Ē': 'E', 'ē': 'e', 'Ĕ': 'E', 'ĕ': 'e', 'Ė': 'E', 'ė': 'e', 'Ę': 'E', 'ę': 'e', 'Ě': 'E', 'ě': 'e',
  'Ĝ': 'G', 'ĝ': 'g', 'Ğ': 'G', 'ğ': 'g', 'Ġ': 'G', 'ġ': 'g', 'Ģ': 'G', 'ģ': 'g',
  'Ĥ': 'H', 'ĥ': 'h', 'Ħ': 'H', 'ħ': 'h',
  'Ĩ': 'I', 'ĩ': 'i', 'Ī': 'I', 'ī': 'i', 'Ĭ': 'I', 'ĭ': 'i', 'Į': 'I', 'į': 'i', 'İ': 'I', 'ı': 'i',
  'Ĵ': 'J', 'ĵ': 'j',
  'Ķ': 'K', 'ķ': 'k', 'ĸ': 'k',
  'Ĺ': 'L', 'ĺ': 'l', 'Ļ': 'L', 'ļ': 'l', 'Ľ': 'L', 'ľ': 'l', 'Ŀ': 'L', 'ŀ': 'l', 'Ł': 'L', 'ł': 'l',
  'Ń': 'N', 'ń': 'n', 'Ņ': 'N', 'ņ': 'n', 'Ň': 'N', 'ň': 'n', 'ŉ': 'n', 'Ŋ': 'N', 'ŋ': 'n',
  'Ō': 'O', 'ō': 'o', 'Ŏ': 'O', 'ŏ': 'o', 'Ő': 'O', 'ő': 'o', 'Œ': 'OE', 'œ': 'oe',
  'Ŕ': 'R', 'ŕ': 'r', 'Ŗ': 'R', 'ŗ': 'r', 'Ř': 'R', 'ř': 'r',
  'Ś': 'S', 'ś': 's', 'Ŝ': 'S', 'ŝ': 's', 'Ş': 'S', 'ş': 's', 'Š': 'S', 'š': 's',
  'Ţ': 'T', 'ţ': 't', 'Ť': 'T', 'ť': 't', 'Ŧ': 'T', 'ŧ': 't',
  'Ũ': 'U', 'ũ': 'u', 'Ū': 'U', 'ū': 'u', 'Ŭ': 'U', 'ŭ': 'u', 'Ů': 'U', 'ů': 'u', 'Ű': 'U', 'ű': 'u', 'Ų': 'U', 'ų': 'u',
  'Ŵ': 'W', 'ŵ': 'w',
  'Ŷ': 'Y', 'ŷ': 'y', 'Ÿ': 'Y',
  'Ź': 'Z', 'ź': 'z', 'Ż': 'Z', 'ż': 'z', 'Ž': 'Z', 'ž': 'z'
};

/**
 * Currency symbols that should always be converted to words
 */
const CURRENCY_SYMBOL_MAP: Record<string, string> = {
  '€': 'eur', '£': 'gbp', '$': 'usd', '¥': 'jpy', '₹': 'inr'
};

/**
 * Symbol to word conversions for non-strict mode
 */
const SYMBOL_TO_WORD_MAP: Record<string, string> = {
  '&': 'and', '@': 'at', '%': 'percent', '#': 'hash', '+': 'plus',
  '=': 'equals', '<': 'lt', '>': 'gt'
};

/**
 * Transliterate Unicode characters to ASCII equivalents
 * @param text - Text to transliterate
 * @param includeSymbols - Whether to convert symbols to words (for non-strict mode)
 * @returns Transliterated text
 */
function transliterate(text: string, includeSymbols: boolean = false): string {
  return text.split('').map(char => {
    if (TRANSLITERATION_MAP[char]) {
      return TRANSLITERATION_MAP[char];
    }
    if (includeSymbols && SYMBOL_TO_WORD_MAP[char]) {
      return ` ${SYMBOL_TO_WORD_MAP[char]} `;
    }
    return char;
  }).join('');
}

/**
 * Convert text to URL-friendly slug
 * @param input - The text to convert to a slug
 * @param options - Configuration options for slug generation
 * @returns The generated slug
 * @throws Error if input processing fails
 */
export function textToSlug(
  input: string,
  options: TextToSlugOptions = DEFAULT_TEXT_TO_SLUG_OPTIONS
): string {
  try {
    if (!input || typeof input !== 'string') {
      return '';
    }

    const mergedOptions = { ...DEFAULT_TEXT_TO_SLUG_OPTIONS, ...options };

    let result = input.trim();

    if (mergedOptions.lowercase) {
      result = result.toLowerCase();
    }

    result = transliterate(result);

    result = result.replace(/(\w)'s\b/g, '$1s');
    result = result.replace(/(\w)'\b/g, '$1');

    // Convert currency symbols to words, but only if there are other alphanumeric characters
    const hasMeaningfulContent = /[a-zA-Z0-9]/.test(result.replace(/[€£$¥₹]/g, ''));
    if (hasMeaningfulContent) {
      result = result.replace(/[€£$¥₹]/g, (match) => CURRENCY_SYMBOL_MAP[match] || match);
    }

    // Convert other symbols to words only in non-strict mode
    if (!mergedOptions.strict) {
      result = result.split('').map(char => {
        return SYMBOL_TO_WORD_MAP[char] ? ` ${SYMBOL_TO_WORD_MAP[char]} ` : char;
      }).join('');
    }

    result = result.replace(/[^a-zA-Z0-9\s.]/g, ' ');

    if (mergedOptions.removeNumbers) {
      result = result.replace(/\d+\.?\d*/g, '');
    }

    let words = result.split(/\s+/).filter(word => word.length > 0);

    if (mergedOptions.removeStopWords) {
      words = words.filter(word => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        return !STOP_WORDS.has(cleanWord);
      });
    }

    result = words.join(mergedOptions.separator);

    const separatorChar = mergedOptions.separator;
    const cleanupPattern = new RegExp(`[^a-zA-Z0-9${separatorChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`, 'g');
    result = result.replace(cleanupPattern, '');

    const separatorPattern = new RegExp(`\\${mergedOptions.separator}+`, 'g');
    result = result.replace(separatorPattern, mergedOptions.separator);

    const trimPattern = new RegExp(`^\\${mergedOptions.separator}+|\\${mergedOptions.separator}+$`, 'g');
    result = result.replace(trimPattern, '');

    return result;
  } catch (error) {
    throw new Error(`Text to slug conversion failed: ${(error as Error).message}`);
  }
}
