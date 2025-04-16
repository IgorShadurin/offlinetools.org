import { sha256, sha224 } from 'js-sha256'
import { md5 } from 'js-md5'
import { sha1 } from 'js-sha1'

/**
 * Available hash algorithms for file/text comparison
 */
export enum HashAlgorithm {
  /** SHA-256 algorithm */
  SHA256 = 'SHA-256',
  /** SHA-224 algorithm */
  SHA224 = 'SHA-224',
  /** SHA-1 algorithm */
  SHA1 = 'SHA-1',
  /** MD5 algorithm */
  MD5 = 'MD5',
}

/**
 * Options for hash calculation
 */
export interface HashOptions {
  /** Hash algorithm to use */
  algorithm: HashAlgorithm;
}

/**
 * Default hash options (SHA-256)
 */
export const DEFAULT_HASH_OPTIONS: HashOptions = {
  algorithm: HashAlgorithm.SHA256,
};

/**
 * Result of a hash comparison
 */
export interface HashComparisonResult {
  /** First hash value */
  firstHash: string;
  /** Second hash value */
  secondHash: string;
  /** Whether the hashes match */
  match: boolean;
}

/**
 * Calculate the hash of a string using the specified algorithm
 * @param text - The text to hash
 * @param options - Hash calculation options
 * @returns The calculated hash string
 */
export function calculateTextHash(
  text: string,
  options: HashOptions = DEFAULT_HASH_OPTIONS
): string {
  switch (options.algorithm) {
    case HashAlgorithm.SHA256:
      return sha256(text);
    case HashAlgorithm.SHA224:
      return sha224(text);
    case HashAlgorithm.SHA1:
      return sha1(text);
    case HashAlgorithm.MD5:
      return md5(text);
    default:
      return sha256(text); // Default to SHA-256
  }
}

/**
 * Calculate the hash of a file using the specified algorithm
 * @param fileContent - The array buffer containing file data
 * @param options - Hash calculation options
 * @returns The calculated hash string
 */
export function calculateFileHash(
  fileContent: ArrayBuffer,
  options: HashOptions = DEFAULT_HASH_OPTIONS
): string {
  switch (options.algorithm) {
    case HashAlgorithm.SHA256:
      return sha256(fileContent);
    case HashAlgorithm.SHA224:
      return sha224(fileContent);
    case HashAlgorithm.SHA1:
      return sha1(fileContent);
    case HashAlgorithm.MD5:
      return md5(fileContent);
    default:
      return sha256(fileContent); // Default to SHA-256
  }
}

/**
 * Compare two hash strings
 * @param firstHash - First hash string
 * @param secondHash - Second hash string
 * @returns Hash comparison result object
 */
export function compareHashes(
  firstHash: string,
  secondHash: string
): HashComparisonResult {
  return {
    firstHash,
    secondHash,
    match: firstHash === secondHash,
  };
} 