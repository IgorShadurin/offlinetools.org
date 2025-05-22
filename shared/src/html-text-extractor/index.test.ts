import { 
  extractTextFromHtml, 
  HtmlTextExtractorOptions, 
  DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
  HtmlLinkHandlingOption,
  isLikelyHtml
} from './index';

describe('HTML Text Extractor', () => {
  describe('extractTextFromHtml', () => {
    const sampleHtml = `
      <html>
        <body>
          <h1>Sample Heading</h1>
          <p>This is a <strong>sample</strong> paragraph with <a href="https://example.com">a link</a>.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <img src="image.jpg" alt="Sample image">
        </body>
      </html>
    `;
    
    it('should extract text with default options', () => {
      const result = extractTextFromHtml(sampleHtml);
      
      expect(result.toLowerCase()).toContain('sample heading'.toLowerCase());
      expect(result.toLowerCase()).toContain('this is a sample paragraph with a link'.toLowerCase());
      expect(result.toLowerCase()).toContain('item 1'.toLowerCase());
      expect(result.toLowerCase()).toContain('item 2'.toLowerCase());
      expect(result.toLowerCase()).toContain('[image: sample image]'.toLowerCase());
    });
    
    it('should handle empty input', () => {
      expect(extractTextFromHtml('')).toBe('');
      expect(extractTextFromHtml(undefined as unknown as string)).toBe('');
    });
    
    it('should preserve newlines when specified', () => {
      const options: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        preserveNewlines: true
      };
      
      const result = extractTextFromHtml(sampleHtml, options);
      
      const newlines = (result.match(/\n/g) || []).length;
      expect(newlines).toBeGreaterThan(0);
    });
    
    it('should not preserve newlines when specified', () => {
      const options: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        preserveNewlines: false
      };
      
      const result = extractTextFromHtml(sampleHtml, options);
      
      const preservedResult = extractTextFromHtml(sampleHtml, {
        ...options,
        preserveNewlines: true
      });
      
      expect(result.split('\n').length).toBeLessThan(preservedResult.split('\n').length);
    });
    
    it('should handle links according to specified option (Remove)', () => {
      const options: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        linkHandling: HtmlLinkHandlingOption.Remove
      };
      
      const result = extractTextFromHtml(
        '<p>This is a <a href="https://example.com">link</a>.</p>',
        options
      );
      
      expect(result).toContain('This is a link');
      expect(result).not.toContain('example.com');
    });
    
    it('should handle links according to specified option (KeepText)', () => {
      const options: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        linkHandling: HtmlLinkHandlingOption.KeepText
      };
      
      const result = extractTextFromHtml(
        '<p>This is a <a href="https://example.com">link</a>.</p>',
        options
      );
      
      expect(result).toContain('This is a link');
      expect(result).not.toContain('example.com');
    });
    
    it('should handle links according to specified option (ShowAsMarkdown)', () => {
      const options: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        linkHandling: HtmlLinkHandlingOption.ShowAsMarkdown
      };
      
      const result = extractTextFromHtml(
        '<p>This is a <a href="https://example.com">link</a>.</p>',
        options
      );
      
      expect(result).toContain('link(https://example.com)');
    });
    
    it('should handle images according to specified options', () => {
      const withImages: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        removeImages: false
      };
      
      const withoutImages: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        removeImages: true
      };
      
      const withoutAlt: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        removeImages: true,
        includeImageAlt: false
      };
      
      const imgHtml = '<p>Text before <img src="image.jpg" alt="Alt text"> text after</p>';
      
      const resultWithImages = extractTextFromHtml(imgHtml, withImages);
      const resultWithoutImages = extractTextFromHtml(imgHtml, withoutImages);
      const resultWithoutAlt = extractTextFromHtml(imgHtml, withoutAlt);
      
      expect(resultWithoutImages).toContain('[Image: Alt text]');
      expect(resultWithoutAlt).not.toContain('[Image: Alt text]');
    });
    
    it('should apply wordwrap when specified', () => {
      const options: HtmlTextExtractorOptions = {
        ...DEFAULT_HTML_TEXT_EXTRACTOR_OPTIONS,
        wordwrap: 20
      };
      
      const longTextHtml = '<p>This is a very long text that should be wrapped at 20 characters if the wordwrap option is working correctly</p>';
      
      const result = extractTextFromHtml(longTextHtml, options);
      
      const lines = result.split('\n');
      const longLines = lines.filter(line => line.length > options.wordwrap);
      
      expect(longLines.length).toBe(0);
    });
    
    it('should throw an error for invalid input that causes error', () => {
      const originalConvert = require('html-to-text').convert;
      require('html-to-text').convert = jest.fn().mockImplementation(() => {
        throw new Error('Test error');
      });
      
      expect(() => {
        extractTextFromHtml('<invalid>html</with unclosed tags');
      }).toThrow('HTML text extraction failed');
      
      require('html-to-text').convert = originalConvert;
    });
  });
  
  describe('isLikelyHtml', () => {
    it('should return true for valid HTML content', () => {
      expect(isLikelyHtml('<div>This is HTML</div>')).toBe(true);
      expect(isLikelyHtml('<p>Paragraph with <strong>bold</strong> text</p>')).toBe(true);
      expect(isLikelyHtml('<html><body><h1>Heading</h1></body></html>')).toBe(true);
    });
    
    it('should return false for non-HTML content', () => {
      expect(isLikelyHtml('This is plain text')).toBe(false);
      expect(isLikelyHtml('{ "key": "value" }')).toBe(false);
      expect(isLikelyHtml('')).toBe(false);
      expect(isLikelyHtml(null as unknown as string)).toBe(false);
    });
    
    it('should return true for content with HTML entities', () => {
      expect(isLikelyHtml('Text with &nbsp; entity')).toBe(true);
      expect(isLikelyHtml('Text with &#8212; numeric entity')).toBe(true);
    });
    
    it('should return true for content with common HTML tags', () => {
      expect(isLikelyHtml('<div>Content</div>')).toBe(true);
      expect(isLikelyHtml('<span>Content</span>')).toBe(true);
      expect(isLikelyHtml('<p>Content</p>')).toBe(true);
      expect(isLikelyHtml('<a href="#">Link</a>')).toBe(true);
      expect(isLikelyHtml('<img src="image.jpg">')).toBe(true);
      expect(isLikelyHtml('<h1>Heading</h1>')).toBe(true);
    });
  });
});
