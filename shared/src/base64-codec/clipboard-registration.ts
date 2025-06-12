import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

const BASE64_REGEX = /^[A-Za-z0-9+/=]+$/;

function isLikelyBase64(content: string): boolean {
  if (!content || !BASE64_REGEX.test(content)) {
    return false;
  }
  if (content.length % 4 !== 0) {
    return false;
  }
  if (content.length < 8) {
    return false;
  }
  return true;
}

export const base64ClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.BASE64_CODEC,
  supportedTypes: ['string'],
  detect: isLikelyBase64,
};

registerClipboardTool(base64ClipboardRegistration);

