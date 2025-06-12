import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const binaryBase64ClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.BINARY_BASE64_CODEC,
  supportedTypes: ['string', 'photo', 'video'],
};

registerClipboardTool(binaryBase64ClipboardRegistration);

