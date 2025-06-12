import type { ClipboardType, Tool } from './index';

export interface ClipboardToolRegistration {
  /** Tool identifier */
  id: Tool;
  /** Clipboard content types the tool can handle */
  supportedTypes: ClipboardType[];
  /** Optional custom detection based on clipboard text */
  detect?: (content: string) => boolean;
}

const registry: ClipboardToolRegistration[] = [];

/**
 * Register a clipboard tool so it can be suggested by the detector
 * @param registration - Tool registration details
 */
export function registerClipboardTool(registration: ClipboardToolRegistration): void {
  registry.push(registration);
}

/**
 * Get all registered clipboard tools
 * @returns Array of registrations
 */
export function getRegisteredTools(): ClipboardToolRegistration[] {
  return registry;
}

