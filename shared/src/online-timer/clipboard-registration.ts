import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

export const onlineTimerClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.ONLINE_TIMER,
  supportedTypes: [],
  detect: () => false,
};

registerClipboardTool(onlineTimerClipboardRegistration);
