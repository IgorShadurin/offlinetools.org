import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isLikelyUuid(content: string): boolean {
  return UUID_REGEX.test(content);
}

export const uuidGeneratorClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.UUID_GENERATOR,
  supportedTypes: ['string'],
  detect: isLikelyUuid,
};

registerClipboardTool(uuidGeneratorClipboardRegistration);

