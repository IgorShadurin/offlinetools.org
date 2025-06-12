import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';
import { isLikelyHtml } from './index';

export const htmlTextExtractorClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.HTML_TEXT_EXTRACTOR,
  supportedTypes: ['string'],
  detect: isLikelyHtml,
};

registerClipboardTool(htmlTextExtractorClipboardRegistration);

