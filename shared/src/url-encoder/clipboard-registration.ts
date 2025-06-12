import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const urlEncoderClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.URL_ENCODER,
  supportedTypes: ['string'],
};

registerClipboardTool(urlEncoderClipboardRegistration);

