import { sha256 } from 'js-sha256'

/**
 * Sample function that adds two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export function test1(a: number, b: number): number {
    return a + b;
}

/**
 * Sample function that creates a SHA-256 hash
 * @returns The SHA-256 hash of a message
 */
export function test2(): string {
    return sha256('Message to hash');
}

// Export JSON formatter
export * from './json-formatter';

// Export Base64 codec
export * from './base64-codec';

// Export Binary Base64 codec
export * from './binary-base64-codec';

// Export URL encoder/decoder
export * from './url-encoder';

// Export File Hash Compare
export * from './file-hash-compare';

// Export Clipboard Detector
export * from './clipboard-detector';

// Export File Generator
export * from './file-generator';

// Export Text Hash Generator with renamed exports to avoid conflicts
import {
  HashAlgorithm as TextHashAlgorithm,
  DEFAULT_HASH_OPTIONS as TEXT_HASH_DEFAULT_OPTIONS,
  HASH_ALGORITHM_GROUPS,
  generateHash,
  generateAllHashes,
  verifyTextHash,
  textToFileHashFormat,
  type HashGeneratorOptions,
} from './text-hash-generator';

export {
  TextHashAlgorithm,
  TEXT_HASH_DEFAULT_OPTIONS,
  HASH_ALGORITHM_GROUPS,
  generateHash,
  generateAllHashes,
  verifyTextHash,
  textToFileHashFormat,
  type HashGeneratorOptions,
};

// Export UUID Generator
export * from './uuid-generator';


// Export Speech Length Estimator
export * from './speech-length-estimator';
