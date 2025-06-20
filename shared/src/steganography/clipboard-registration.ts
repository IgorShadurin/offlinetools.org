import { ClipboardType, Tool, ClipboardToolRegistration } from '../clipboard-detector';

export function registerSteganographyClipboard(): ClipboardToolRegistration {
  return {
    id: Tool.STEGANOGRAPHY,
    supportedTypes: ['string' as const, 'photo' as const],
    detect: (content: string): boolean => {
      const lowerContent = content.toLowerCase();
      
      if (lowerContent.includes('.jpg') || 
          lowerContent.includes('.jpeg') || 
          lowerContent.includes('.png') || 
          lowerContent.includes('.webp') || 
          lowerContent.includes('.gif') ||
          lowerContent.includes('image/')) {
        return true;
      }
      
      return content.trim().length > 0 && content.trim().length < 10000;
    },
  };
}
