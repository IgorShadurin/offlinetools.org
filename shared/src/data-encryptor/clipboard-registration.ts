import { registerClipboardTool, Tool } from '../clipboard-detector';

const ENCRYPTED_DATA_REGEX = /^[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*:[A-Za-z0-9+/]+=*$/;

function isLikelyEncryptedData(content: string): boolean {
  if (!ENCRYPTED_DATA_REGEX.test(content.trim())) {
    return false;
  }
  
  const parts = content.trim().split(':');
  if (parts.length !== 3) {
    return false;
  }
  
  try {
    parts.forEach(part => {
      if (!part || part.length < 4) return false;
      atob(part);
    });
    return true;
  } catch {
    return false;
  }
}

export function registerDataEncryptorClipboard(): void {
  registerClipboardTool({
    id: Tool.DATA_ENCRYPTOR,
    supportedTypes: ['string'],
    detect: isLikelyEncryptedData,
  });
}
