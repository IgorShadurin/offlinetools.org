import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const textUtilityClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.TEXT_UTILITY,
  supportedTypes: ['string'],
};

registerClipboardTool(textUtilityClipboardRegistration);
