import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const fileGeneratorClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.FILE_GENERATOR,
  supportedTypes: ['string', 'photo', 'video'],
};

registerClipboardTool(fileGeneratorClipboardRegistration);

