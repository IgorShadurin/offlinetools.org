import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const markdownEditorClipboard: ClipboardToolRegistration = {
  id: Tool.MARKDOWN_EDITOR,
  supportedTypes: ['string'],
  detect: (content: unknown): boolean => {
    if (typeof content === 'string') {
      // Basic detection: does it contain common markdown syntax?
      // e.g., #, *, -, [], (), ```
      // This regex looks for these patterns at the beginning of a line or string.
      return /^(#\s|\*\s|- \s|\[.*\]\(.*\)|```)/m.test(content);
    }
    return false;
  }
};

registerClipboardTool(markdownEditorClipboard);
