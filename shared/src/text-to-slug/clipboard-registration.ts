import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const textToSlugClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.TEXT_TO_SLUG,
  supportedTypes: ['string'],
};

registerClipboardTool(textToSlugClipboardRegistration);

