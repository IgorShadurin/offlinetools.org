import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const speechLengthEstimatorClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.SPEECH_LENGTH_ESTIMATOR,
  supportedTypes: ['string'],
};

registerClipboardTool(speechLengthEstimatorClipboardRegistration);

