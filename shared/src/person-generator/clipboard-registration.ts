import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const personGeneratorClipboard: ClipboardToolRegistration = {
  id: Tool.PERSON_GENERATOR as Tool,
  supportedTypes: ['string'],
};

registerClipboardTool(personGeneratorClipboard);
