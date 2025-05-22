import { v1, v4, v5, v6, v7, NIL, MAX, validate, version as uuidVersion } from 'uuid';

/**
 * Available UUID versions
 */
export enum UUIDVersion {
  /** RFC version 1 (timestamp) UUID */
  V1 = 'v1',
  /** RFC version 4 (random) UUID */
  V4 = 'v4',
  /** RFC version 5 (namespace w/ SHA-1) UUID */
  V5 = 'v5',
  /** RFC version 6 (timestamp, reordered) UUID */
  V6 = 'v6',
  /** RFC version 7 (random with timestamp) UUID */
  V7 = 'v7',
  /** Nil UUID (all zeros) */
  NIL = 'nil',
  /** Max UUID (all ones) */
  MAX = 'max',
}

/**
 * Available namespace options for v5 UUIDs
 */
export enum UUIDNamespace {
  /** URL namespace */
  URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  /** DNS namespace */
  DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  /** Custom namespace (can be any valid UUID) */
  CUSTOM = 'custom',
}

/**
 * Options for UUID generation
 */
export interface UUIDGeneratorOptions {
  /** UUID version to generate */
  version: UUIDVersion;
  /** Whether to output UUID in uppercase */
  uppercase: boolean;
  /** Whether to include hyphens in the output */
  hyphens: boolean;
  /** Name string for v5 namespace UUIDs */
  name?: string;
  /** Namespace for v5 UUIDs */
  namespace?: string;
  /** Custom namespace for v5 UUIDs */
  customNamespace?: string;
}

/**
 * Default UUID generator options
 */
export const DEFAULT_UUID_OPTIONS: UUIDGeneratorOptions = {
  version: UUIDVersion.V4,
  uppercase: false,
  hyphens: true,
  name: '',
  namespace: UUIDNamespace.URL,
};

/**
 * Generate a UUID based on the specified options
 * @param options - UUID generation options
 * @returns The generated UUID string
 * @throws Error if generation fails or options are invalid
 */
export function generateUUID(
  options: Partial<UUIDGeneratorOptions> = {}
): string {
  try {
    const mergedOptions: UUIDGeneratorOptions = {
      ...DEFAULT_UUID_OPTIONS,
      ...options,
    };

    let uuid = '';

    switch (mergedOptions.version) {
      case UUIDVersion.V1:
        uuid = v1();
        break;
      case UUIDVersion.V4:
        uuid = v4();
        break;
      case UUIDVersion.V5:
        if (!mergedOptions.name) {
          throw new Error('Name is required for v5 UUIDs');
        }

        let namespaceUUID = '';
        if (mergedOptions.namespace === UUIDNamespace.CUSTOM) {
          if (!mergedOptions.customNamespace) {
            throw new Error('Custom namespace is required when namespace is set to CUSTOM');
          }
          namespaceUUID = mergedOptions.customNamespace;
        } else {
          namespaceUUID = mergedOptions.namespace || UUIDNamespace.URL;
        }

        uuid = v5(mergedOptions.name, namespaceUUID);
        break;
      case UUIDVersion.V6:
        uuid = v6();
        break;
      case UUIDVersion.V7:
        uuid = v7();
        break;
      case UUIDVersion.NIL:
        uuid = NIL;
        break;
      case UUIDVersion.MAX:
        uuid = MAX;
        break;
      default:
        uuid = v4(); // Default to v4
    }

    if (!mergedOptions.hyphens) {
      uuid = uuid.replace(/-/g, '');
    }
    
    if (mergedOptions.uppercase) {
      uuid = uuid.toUpperCase();
    }

    return uuid;
  } catch (error) {
    throw new Error(`UUID generation failed: ${(error as Error).message}`);
  }
}

/**
 * Generate multiple UUIDs with the specified options
 * @param count - Number of UUIDs to generate
 * @param options - UUID generation options
 * @returns Array of generated UUIDs
 * @throws Error if generation fails or options are invalid
 */
export function generateMultipleUUIDs(
  count: number,
  options: Partial<UUIDGeneratorOptions> = {}
): string[] {
  try {
    if (count <= 0) {
      return [];
    }

    const uuids: string[] = [];
    for (let i = 0; i < count; i++) {
      uuids.push(generateUUID(options));
    }

    return uuids;
  } catch (error) {
    throw new Error(`Multiple UUID generation failed: ${(error as Error).message}`);
  }
}

/**
 * Validate if a string is a valid UUID
 * @param uuid - The string to validate
 * @returns Whether the string is a valid UUID
 */
export function validateUUID(uuid: string): boolean {
  return validate(uuid);
}

/**
 * Get the version of a UUID
 * @param uuid - The UUID to check
 * @returns The version number of the UUID
 * @throws Error if the UUID is invalid
 */
export function getUUIDVersion(uuid: string): number {
  if (!validateUUID(uuid)) {
    throw new Error('Invalid UUID format');
  }
  return uuidVersion(uuid);
}

/**
 * Format a UUID with the specified options
 * @param uuid - The UUID to format
 * @param options - Formatting options
 * @returns The formatted UUID
 * @throws Error if the UUID is invalid
 */
export function formatUUID(
  uuid: string,
  options: Pick<UUIDGeneratorOptions, 'uppercase' | 'hyphens'> = { 
    uppercase: false, 
    hyphens: true 
  }
): string {
  const uuidWithoutHyphens = uuid.replace(/-/g, '');
  
  if (!/^[0-9a-f]{32}$/i.test(uuidWithoutHyphens)) {
    throw new Error('Invalid UUID format');
  }

  let formatted = uuid;
  
  if (!options.hyphens) {
    formatted = formatted.replace(/-/g, '');
  } else if (!formatted.includes('-') && formatted.length === 32) {
    formatted = `${formatted.substring(0, 8)}-${formatted.substring(8, 12)}-${formatted.substring(12, 16)}-${formatted.substring(16, 20)}-${formatted.substring(20)}`;
  }
  
  if (options.uppercase) {
    formatted = formatted.toUpperCase();
  } else {
    formatted = formatted.toLowerCase();
  }
  
  return formatted;
}
