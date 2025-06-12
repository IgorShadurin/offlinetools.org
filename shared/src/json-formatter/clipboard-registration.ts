import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

const JSON_REGEX = /^\s*(\{|\[)[\s\S]*(\}|\])\s*$/;

function isLikelyJson(content: string): boolean {
  if (!JSON_REGEX.test(content)) {
    return false;
  }
  try {
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
}

export const jsonFormatterClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.JSON_FORMATTER,
  supportedTypes: ['string'],
  detect: isLikelyJson,
};

registerClipboardTool(jsonFormatterClipboardRegistration);

