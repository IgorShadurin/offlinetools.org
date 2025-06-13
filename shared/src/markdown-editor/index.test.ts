/**
 * @jest-environment jsdom
 */
import { renderMarkdown, loadMarkdownFile, saveMarkdownFile } from './index';
import { marked } from 'marked';

// Automatically mock all functions in 'marked'
jest.mock('marked');

describe('Markdown Editor', () => {
  describe('renderMarkdown', () => {
    // marked.parse is now an auto-mocked function
    const mockMarkedParse = marked.parse as unknown as jest.Mock;

    beforeEach(() => {
      // Reset the mock before each test
      mockMarkedParse.mockReset();
    });

    it('should render basic Markdown to HTML', () => {
      mockMarkedParse.mockImplementation((md: string) => `<p>${md}</p>`);
      expect(renderMarkdown('# Hello')).toBe('<p># Hello</p>');
      expect(renderMarkdown('**bold**')).toBe('<p>**bold**</p>');
      expect(renderMarkdown('*italic*')).toBe('<p>*italic*</p>');
      expect(renderMarkdown('[link](http://example.com)')).toBe('<p>[link](http://example.com)</p>');
      expect(renderMarkdown('```\ncode\n```')).toBe('<p>```\ncode\n```</p>');
      expect(renderMarkdown('- list item')).toBe('<p>- list item</p>');
    });

    it('should return an empty string for empty or undefined input', () => {
      mockMarkedParse.mockImplementation((md: string) => `<p>${md}</p>`); // ensure it's mocked for this test too
      expect(renderMarkdown('')).toBe('');
      // @ts-expect-error testing undefined input
      expect(renderMarkdown(undefined)).toBe('');
    });

    it('should handle Markdown with special characters', () => {
      mockMarkedParse.mockImplementation((md: string) => `<p>${md}</p>`);
      const specialChars = '<>&"\'`';
      expect(renderMarkdown(specialChars)).toBe(`<p>${specialChars}</p>`);
    });

    it('should throw a descriptive error if marked.parse() fails', () => {
      const MOCK_ERROR_MESSAGE = 'Marked failed';
      mockMarkedParse.mockImplementation(() => {
        throw new Error(MOCK_ERROR_MESSAGE);
      });
      expect(() => renderMarkdown('some markdown')).toThrow(`Failed to render Markdown: ${MOCK_ERROR_MESSAGE}`);
    });

     it('should use custom options if provided', () => {
      const options: import('marked').MarkedOptions = { gfm: false };
      mockMarkedParse.mockImplementation((md: string, opts: import('marked').MarkedOptions | undefined) => {
        if (opts && opts.gfm === false) return 'custom';
        return 'default';
      });
      expect(renderMarkdown('markdown', options)).toBe('custom');
      expect(mockMarkedParse).toHaveBeenCalledWith('markdown', options);
    });
  });

  describe('loadMarkdownFile', () => {
    let mockFile: File;
    let mockReaderInstance: FileReader; // Renamed to avoid conflict with mockReader constructor
    let readAsTextSpy: jest.SpyInstance;

    beforeEach(() => {
      mockFile = new File(['# Test Content'], 'test.md', { type: 'text/markdown' });
      // Mock the FileReader instance
      mockReaderInstance = {
        onload: null,
        onerror: null,
        readAsText: jest.fn(),
        result: null, // This will be set by the mock implementation of readAsText or direct assignment in test
        // target: null, // target is part of the event, not reader itself for onload/onerror
        error: null, // This will be set for error cases
      } as unknown as FileReader;

      readAsTextSpy = jest.spyOn(mockReaderInstance, 'readAsText');
      jest.spyOn(global, 'FileReader').mockImplementation(() => mockReaderInstance);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should read a file and resolve with its content', async () => {
      const promise = loadMarkdownFile(mockFile);

      // Simulate successful file read by setting result and calling onload
      if (mockReaderInstance.onload) {
        // @ts-ignore
        mockReaderInstance.onload({ target: { result: '# Test Content' } } as ProgressEvent<FileReader>);
      }

      await expect(promise).resolves.toBe('# Test Content');
      expect(readAsTextSpy).toHaveBeenCalledWith(mockFile);
    });

    it('should reject if file reading fails', async () => {
      const promise = loadMarkdownFile(mockFile);
      const mockError = new DOMException('Test error');

      // Simulate file read error by setting error and calling onerror
      if (mockReaderInstance.onerror) {
        // @ts-ignore
        mockReaderInstance.onerror({ target: { error: mockError } } as ProgressEvent<FileReader>);
      }

      await expect(promise).rejects.toThrow(`Failed to read file: ${mockError.message}`);
      expect(readAsTextSpy).toHaveBeenCalledWith(mockFile);
    });

    it('should reject if no file is provided', async () => {
      // @ts-expect-error testing undefined input
      await expect(loadMarkdownFile(undefined)).rejects.toThrow('No file provided.');
    });

    it('should reject if event.target.result is null', async () => {
        const promise = loadMarkdownFile(mockFile);
        if (mockReaderInstance.onload) {
            // @ts-ignore
            mockReaderInstance.onload({ target: { result: null } });
        }
        await expect(promise).rejects.toThrow('Failed to read file content.');
    });
  });

  describe('saveMarkdownFile', () => {
    let realURL: typeof global.URL; // To store the original global.URL
    let mockAppendChild: jest.SpyInstance;
    let mockRemoveChild: jest.SpyInstance;
    let mockClick: jest.SpyInstance;
    let mockAnchorElement: HTMLAnchorElement;

    beforeEach(() => {
      realURL = global.URL; // Backup the original global.URL
      // Create a fresh mock URL object for each test in this suite
      global.URL = {
        createObjectURL: jest.fn().mockReturnValue('mock-url'),
        revokeObjectURL: jest.fn(),
      } as any; // Cast to any as we are not fully replicating the URL interface

      mockAnchorElement = {
        href: '',
        download: '',
        click: jest.fn(),
        setAttribute: jest.fn(),
        removeAttribute: jest.fn(),
      } as unknown as HTMLAnchorElement;
      mockClick = jest.spyOn(mockAnchorElement, 'click');
      jest.spyOn(document, 'createElement').mockReturnValue(mockAnchorElement); // This is fine
      mockAppendChild = jest.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
      mockRemoveChild = jest.spyOn(document.body, 'removeChild').mockImplementation((node) => node);
    });

    afterEach(() => {
      global.URL = realURL; // Restore the original global.URL
      jest.restoreAllMocks(); // This will restore spies on document.createElement, document.body.appendChild etc.
    });

    it('should create a Blob, simulate download, and revoke URL', () => {
      const markdown = '# Hello World';
      const filename = 'test.md';

      saveMarkdownFile(markdown, filename);

      expect(Blob).toHaveBeenCalledWith([markdown], { type: 'text/markdown;charset=utf-8' });
      expect(global.URL.createObjectURL).toHaveBeenCalled(); // Check the mocked global.URL
      expect(mockAnchorElement.href).toBe('mock-url');
      expect(mockAnchorElement.download).toBe(filename);
      expect(mockAppendChild).toHaveBeenCalledWith(mockAnchorElement);
      expect(mockClick).toHaveBeenCalled();
      expect(mockRemoveChild).toHaveBeenCalledWith(mockAnchorElement);
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
    });

    it('should handle errors during file saving', () => {
      const MOCK_SAVE_ERROR = 'Save failed';
      (global.URL.createObjectURL as jest.Mock).mockImplementation(() => {
        throw new Error(MOCK_SAVE_ERROR);
      });
      expect(() => saveMarkdownFile('md', 'file.md')).toThrow(`Failed to save Markdown file: ${MOCK_SAVE_ERROR}`);
    });

    it('should warn if not in a browser environment and not attempt to save', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}); // .mockImplementation is important to suppress original console output
      const mockCreateElement = jest.spyOn(document, 'createElement');

      // Simulate non-browser by deleting critical browser globals for this test scope
      const originalWindow = global.window; // These are JSDOM's window/document
      const originalDocument = global.document;
      const originalMockedURL = global.URL; // This is our mocked URL from beforeEach

      // @ts-ignore
      delete global.window;
      // @ts-ignore
      delete global.document;
      // @ts-ignore
      delete global.URL;

      saveMarkdownFile('# test', 'test.md');
      expect(consoleWarnSpy).toHaveBeenCalledWith('saveMarkdownFile is intended for browser environments only.');
      expect(mockCreateElement).not.toHaveBeenCalled();

      // Restore globals for subsequent tests / afterEach of the describe block
      global.window = originalWindow;
      global.document = originalDocument;
      global.URL = originalMockedURL; // Restore the mocked URL for this describe block's context

      consoleWarnSpy.mockRestore();
      mockCreateElement.mockRestore();
    });
  });
});

// Mock Blob globally
global.Blob = jest.fn().mockImplementation((content, options) => ({
  content,
  options,
  size: content.join('').length,
  type: options.type,
})) as jest.Mock;
