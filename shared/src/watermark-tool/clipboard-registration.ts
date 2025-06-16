import { ClipboardType, Tool, ClipboardToolRegistration } from '../clipboard-detector';

export function registerWatermarkToolClipboard(): ClipboardToolRegistration {
  return {
    id: Tool.WATERMARK_TOOL,
    supportedTypes: ['photo' as const],
    detect: (content: string): boolean => {
      const lowerContent = content.toLowerCase();
      return lowerContent.includes('.jpg') || 
             lowerContent.includes('.jpeg') || 
             lowerContent.includes('.png') || 
             lowerContent.includes('.webp') || 
             lowerContent.includes('.gif') ||
             lowerContent.includes('image/');
    },
  };
}
