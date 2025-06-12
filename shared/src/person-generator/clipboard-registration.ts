import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const personGeneratorClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.PERSON_GENERATOR,
  supportedTypes: ['string'],
};

registerClipboardTool(personGeneratorClipboardRegistration);
