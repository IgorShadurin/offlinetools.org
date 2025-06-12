import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const fileHashCompareClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.FILE_HASH_COMPARE,
  supportedTypes: ['string', 'photo', 'video'],
};

registerClipboardTool(fileHashCompareClipboardRegistration);

