import { registerClipboardTool, type ClipboardToolRegistration, Tool } from '../clipboard-detector';

const ETHEREUM_ADDRESS_REGEX = /^(0x)?[0-9a-f]{40}$/i;
const ETHEREUM_VALUE_REGEX = /^[0-9]{10,78}$/;

function isLikelyEthereum(content: string): boolean {
  if (ETHEREUM_ADDRESS_REGEX.test(content)) {
    return true;
  }
  if (ETHEREUM_VALUE_REGEX.test(content)) {
    return true;
  }
  const lower = content.toLowerCase();
  return lower.includes('eth') || lower.includes('wei') || lower.includes('gwei') || lower.includes('ether');
}

export const ethereumConverterClipboardRegistration: ClipboardToolRegistration = {
  id: Tool.ETHEREUM_CONVERTER,
  supportedTypes: ['string'],
  detect: isLikelyEthereum,
};

registerClipboardTool(ethereumConverterClipboardRegistration);

