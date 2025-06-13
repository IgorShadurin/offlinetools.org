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

// Export HTML Text Extractor
export * from './html-text-extractor';

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

// Export Text to Slug
export * from './text-to-slug';

// Export Ethereum Converter
export * from './ethereum-converter';

// Clipboard tool registrations
export * from './base64-codec/clipboard-registration';
export * from './binary-base64-codec/clipboard-registration';
export * from './file-hash-compare/clipboard-registration';
export * from './html-text-extractor/clipboard-registration';
export * from './json-formatter/clipboard-registration';
export * from './text-hash-generator/clipboard-registration';
export * from './url-encoder/clipboard-registration';
export * from './file-generator/clipboard-registration';
export * from './uuid-generator/clipboard-registration';
export * from './speech-length-estimator/clipboard-registration';
export * from './text-to-slug/clipboard-registration';
export * from './ethereum-converter/clipboard-registration';
export * from './text-utility/clipboard-registration';

// Export Unit Converter
export * from './unit-converter';

// Export Text Utility
export * from './text-utility';

// Export Person Generator
export * from './person-generator';

// Clipboard registration for Person Generator
export * from './person-generator/clipboard-registration';

// Export Password Strength Meter
export * from './password-strength-meter';

// Export Markdown Editor
export * from './markdown-editor';
export * from './markdown-editor/clipboard-registration';
