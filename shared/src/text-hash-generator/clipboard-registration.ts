import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const textHashGeneratorClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.TEXT_HASH_GENERATOR,
  supportedTypes: ['string'],
};

registerClipboardTool(textHashGeneratorClipboardRegistration);

