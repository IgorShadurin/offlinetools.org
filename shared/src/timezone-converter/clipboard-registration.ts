import { registerClipboardTool } from '../clipboard-detector/registry';
import { Tool } from '../clipboard-detector';

function detectTimezoneContent(content: string): boolean {
  const timePatterns = [
    /\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|am|pm)/i,
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
    /\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}/,
    /\d{1,2}-\d{1,2}-\d{4}\s+\d{1,2}:\d{2}/,
    /(?:UTC|GMT)[+-]\d{1,2}(?::\d{2})?/i,
    /\b(?:EST|CST|MST|PST|EDT|CDT|MDT|PDT|GMT|UTC|CET|JST|IST)\b/i,
  ];
  
  return timePatterns.some(pattern => pattern.test(content));
}

registerClipboardTool({
  id: Tool.TIMEZONE_CONVERTER,
  supportedTypes: ['string'],
  detect: detectTimezoneContent,
});
