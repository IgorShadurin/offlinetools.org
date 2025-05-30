import { textToSlug, SeparatorType, TextToSlugOptions, DEFAULT_TEXT_TO_SLUG_OPTIONS } from './index';

describe('Text to Slug', () => {
  describe('textToSlug', () => {
    it('should correctly convert basic text to slug', () => {
      const result = textToSlug('Hello World');
      expect(result).toBe('hello-world');
    });

    it('should handle text with multiple spaces', () => {
      const result = textToSlug('Hello    World   Test');
      expect(result).toBe('hello-world-test');
    });

    it('should handle text with special characters', () => {
      const result = textToSlug('Hello, World! How are you?');
      expect(result).toBe('hello-world-how-are-you');
    });

    it('should use dash separator by default', () => {
      const result = textToSlug('Hello World');
      expect(result).toBe('hello-world');
    });

    it('should use underscore separator when specified', () => {
      const options: TextToSlugOptions = { 
        ...DEFAULT_TEXT_TO_SLUG_OPTIONS,
        separator: SeparatorType.UNDERSCORE 
      };
      const result = textToSlug('Hello World', options);
      expect(result).toBe('hello_world');
    });

    it('should convert to lowercase by default', () => {
      const result = textToSlug('Hello WORLD Test');
      expect(result).toBe('hello-world-test');
    });

    it('should preserve case when lowercase is false', () => {
      const options: TextToSlugOptions = { 
        ...DEFAULT_TEXT_TO_SLUG_OPTIONS,
        lowercase: false 
      };
      const result = textToSlug('Hello WORLD Test', options);
      expect(result).toBe('Hello-WORLD-Test');
    });

    it('should keep numbers by default', () => {
      const result = textToSlug('Version 2.0 Release');
      expect(result).toBe('version-20-release');
    });

    it('should remove numbers when specified', () => {
      const options: TextToSlugOptions = { 
        ...DEFAULT_TEXT_TO_SLUG_OPTIONS,
        removeNumbers: true 
      };
      const result = textToSlug('Version 2.0 Release', options);
      expect(result).toBe('version-release');
    });

    it('should keep stop words by default', () => {
      const result = textToSlug('The Quick Brown Fox');
      expect(result).toBe('the-quick-brown-fox');
    });

    it('should remove stop words when specified', () => {
      const options: TextToSlugOptions = { 
        ...DEFAULT_TEXT_TO_SLUG_OPTIONS,
        removeStopWords: true 
      };
      const result = textToSlug('The Quick Brown Fox', options);
      expect(result).toBe('quick-brown-fox');
    });

    it('should remove common stop words correctly', () => {
      const options: TextToSlugOptions = { 
        ...DEFAULT_TEXT_TO_SLUG_OPTIONS,
        removeStopWords: true 
      };
      const result = textToSlug('A Guide to the Best Practices', options);
      expect(result).toBe('guide-best-practices');
    });

    it('should apply strict mode by default', () => {
      const result = textToSlug('Hello & World @ 2024!');
      expect(result).toBe('hello-world-2024');
    });

    it('should allow more characters when strict is false', () => {
      const options: TextToSlugOptions = { 
        ...DEFAULT_TEXT_TO_SLUG_OPTIONS,
        strict: false 
      };
      const result = textToSlug('Hello & World', options);
      expect(result).toBe('hello-and-world');
    });

    it('should handle Unicode characters correctly', () => {
      const result = textToSlug('Café & Restaurant');
      expect(result).toBe('cafe-restaurant');
    });

    it('should handle accented characters', () => {
      const result = textToSlug('Élégant Résumé');
      expect(result).toBe('elegant-resume');
    });

    it('should handle German umlauts', () => {
      const result = textToSlug('Müller & Söhne');
      expect(result).toBe('muller-sohne');
    });

    it('should handle Spanish characters', () => {
      const result = textToSlug('Niño y Niña');
      expect(result).toBe('nino-y-nina');
    });

    it('should handle currency symbols', () => {
      const result = textToSlug('Price: $100 €50 £30');
      expect(result).toBe('price-usd100-eur50-gbp30');
    });

    it('should handle mixed Unicode and ASCII', () => {
      const result = textToSlug('こんにちは World 世界');
      expect(result).toBe('world');
    });

    it('should return empty string for empty input', () => {
      expect(textToSlug('')).toBe('');
      expect(textToSlug('   ')).toBe('');
    });

    it('should return empty string for undefined input', () => {
      expect(textToSlug(undefined as unknown as string)).toBe('');
      expect(textToSlug(null as unknown as string)).toBe('');
    });

    it('should handle single character input', () => {
      const result = textToSlug('A');
      expect(result).toBe('a');
    });

    it('should handle input with only special characters', () => {
      const result = textToSlug('!@#$%^&*()');
      expect(result).toBe('');
    });

    it('should handle input with only numbers when removeNumbers is true', () => {
      const options: TextToSlugOptions = { 
        ...DEFAULT_TEXT_TO_SLUG_OPTIONS,
        removeNumbers: true 
      };
      const result = textToSlug('123 456 789', options);
      expect(result).toBe('');
    });

    it('should handle input with only stop words when removeStopWords is true', () => {
      const options: TextToSlugOptions = { 
        ...DEFAULT_TEXT_TO_SLUG_OPTIONS,
        removeStopWords: true 
      };
      const result = textToSlug('the and or but', options);
      expect(result).toBe('or');
    });

    it('should clean up multiple consecutive separators', () => {
      const result = textToSlug('Hello---World___Test');
      expect(result).toBe('hello-world-test');
    });

    it('should remove leading and trailing separators', () => {
      const result = textToSlug('---Hello World---');
      expect(result).toBe('hello-world');
    });

    it('should handle complex text with all options enabled', () => {
      const options: TextToSlugOptions = {
        separator: SeparatorType.UNDERSCORE,
        lowercase: true,
        removeNumbers: true,
        removeStopWords: true,
        strict: true
      };
      const result = textToSlug('The Ultimate Guide to Web Development in 2024!', options);
      expect(result).toBe('ultimate_guide_web_development');
    });

    it('should handle real-world blog title example', () => {
      const result = textToSlug('How to Build a Modern Web Application with React & TypeScript');
      expect(result).toBe('how-to-build-a-modern-web-application-with-react-typescript');
    });

    it('should handle product name example', () => {
      const result = textToSlug("User's Guide (Version 2.1) - Updated!");
      expect(result).toBe('users-guide-version-21-updated');
    });

    it('should handle non-string input gracefully', () => {
      expect(textToSlug(123 as unknown as string)).toBe('');
      expect(textToSlug({} as unknown as string)).toBe('');
      expect(textToSlug([] as unknown as string)).toBe('');
    });

    it('should use default options when none provided', () => {
      const result = textToSlug('Hello World 123!');
      expect(result).toBe('hello-world-123');
    });

    it('should allow partial options override', () => {
      const options = { separator: SeparatorType.UNDERSCORE };
      const result = textToSlug('Hello World', options as TextToSlugOptions);
      expect(result).toBe('hello_world');
    });
  });
});
