import { sha256, sha224 } from 'js-sha256'
import { md5 } from 'js-md5'
import { sha1 } from 'js-sha1'
import { sha3_224, sha3_256, sha3_384, sha3_512, keccak224, keccak256, keccak384, keccak512 } from 'js-sha3'
import { calculateTextHash, HashAlgorithm as FileHashAlgorithm } from '../file-hash-compare'

/**
 * Available hash algorithms for text hashing
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
  /** SHA3-224 algorithm */
  SHA3_224 = 'SHA3-224',
  /** SHA3-256 algorithm */
  SHA3_256 = 'SHA3-256',
  /** SHA3-384 algorithm */
  SHA3_384 = 'SHA3-384',
  /** SHA3-512 algorithm */
  SHA3_512 = 'SHA3-512',
  /** Keccak-224 algorithm */
  KECCAK_224 = 'Keccak-224',
  /** Keccak-256 algorithm */
  KECCAK_256 = 'Keccak-256',
  /** Keccak-384 algorithm */
  KECCAK_384 = 'Keccak-384',
  /** Keccak-512 algorithm */
  KECCAK_512 = 'Keccak-512',
}

/**
 * Options for hash generation
 */
export interface HashGeneratorOptions {
  /** Hash algorithm to use */
  algorithm: HashAlgorithm;
  /** Whether to output hash in uppercase */
  uppercase: boolean;
}

/**
 * Default hash generator options
 */
export const DEFAULT_HASH_OPTIONS: HashGeneratorOptions = {
  algorithm: HashAlgorithm.SHA256,
  uppercase: false,
};

/**
 * Groups of hash algorithms for UI presentation
 */
export const HASH_ALGORITHM_GROUPS = [
  {
    name: 'SHA-2 Family',
    algorithms: [
      HashAlgorithm.SHA256,
      HashAlgorithm.SHA224,
    ],
  },
  {
    name: 'SHA-3 Family',
    algorithms: [
      HashAlgorithm.SHA3_256,
      HashAlgorithm.SHA3_224,
      HashAlgorithm.SHA3_384,
      HashAlgorithm.SHA3_512,
    ],
  },
  {
    name: 'Keccak Family',
    algorithms: [
      HashAlgorithm.KECCAK_256,
      HashAlgorithm.KECCAK_224,
      HashAlgorithm.KECCAK_384,
      HashAlgorithm.KECCAK_512,
    ],
  },
  {
    name: 'Legacy Algorithms',
    algorithms: [
      HashAlgorithm.SHA1,
      HashAlgorithm.MD5,
    ],
  },
];

/**
 * Generate hash for the provided text using the specified algorithm
 * @param text - The text to generate hash for
 * @param options - Hash generation options
 * @returns The calculated hash string
 */
export function generateHash(
  text: string,
  options: Partial<HashGeneratorOptions> = {}
): string {
  const mergedOptions: HashGeneratorOptions = {
    ...DEFAULT_HASH_OPTIONS,
    ...options,
  };

  let hash = '';

  switch (mergedOptions.algorithm) {
    case HashAlgorithm.SHA256:
      hash = sha256(text);
      break;
    case HashAlgorithm.SHA224:
      hash = sha224(text);
      break;
    case HashAlgorithm.SHA1:
      hash = sha1(text);
      break;
    case HashAlgorithm.MD5:
      hash = md5(text);
      break;
    case HashAlgorithm.SHA3_224:
      hash = sha3_224(text);
      break;
    case HashAlgorithm.SHA3_256:
      hash = sha3_256(text);
      break;
    case HashAlgorithm.SHA3_384:
      hash = sha3_384(text);
      break;
    case HashAlgorithm.SHA3_512:
      hash = sha3_512(text);
      break;
    case HashAlgorithm.KECCAK_224:
      hash = keccak224(text);
      break;
    case HashAlgorithm.KECCAK_256:
      hash = keccak256(text);
      break;
    case HashAlgorithm.KECCAK_384:
      hash = keccak384(text);
      break;
    case HashAlgorithm.KECCAK_512:
      hash = keccak512(text);
      break;
    default:
      hash = sha256(text); // Default to SHA-256
  }

  return mergedOptions.uppercase ? hash.toUpperCase() : hash;
}

/**
 * Generate all hashes for the provided text
 * @param text - The text to generate all hashes for
 * @param uppercase - Whether to output hashes in uppercase
 * @returns Object with all hash algorithms and their results
 */
export function generateAllHashes(
  text: string,
  uppercase = false
): Record<HashAlgorithm, string> {
  const results: Partial<Record<HashAlgorithm, string>> = {};
  
  // Generate hash for each algorithm
  Object.values(HashAlgorithm).forEach((algorithm) => {
    results[algorithm as HashAlgorithm] = generateHash(text, {
      algorithm: algorithm as HashAlgorithm,
      uppercase,
    });
  });

  return results as Record<HashAlgorithm, string>;
}

/**
 * Map from text-hash-generator algorithm to file-hash-compare algorithm
 */
export const hashAlgorithmMap: Partial<Record<HashAlgorithm, FileHashAlgorithm>> = {
  [HashAlgorithm.SHA256]: FileHashAlgorithm.SHA256,
  [HashAlgorithm.SHA224]: FileHashAlgorithm.SHA224,
  [HashAlgorithm.SHA1]: FileHashAlgorithm.SHA1,
  [HashAlgorithm.MD5]: FileHashAlgorithm.MD5,
};

/**
 * Verify if text produces the expected hash
 * @param text - The input text
 * @param expectedHash - The expected hash to verify against
 * @param algorithm - The hash algorithm to use
 * @returns Boolean indicating whether the text produces the expected hash
 */
export function verifyTextHash(
  text: string,
  expectedHash: string,
  algorithm = HashAlgorithm.SHA256
): boolean {
  const generatedHash = generateHash(text, { algorithm });
  return generatedHash.toLowerCase() === expectedHash.toLowerCase();
}

/**
 * Convert text hash to comparable file hash
 * @param text - The text to hash
 * @param algorithm - The hash algorithm to use
 * @returns The hash in format compatible with file-hash-compare
 */
export function textToFileHashFormat(
  text: string,
  algorithm = HashAlgorithm.SHA256
): string {
  const mappedAlgorithm = hashAlgorithmMap[algorithm];
  if (!mappedAlgorithm) {
    throw new Error(`Algorithm ${algorithm} cannot be converted to file hash format`);
  }
  
  return calculateTextHash(text, { algorithm: mappedAlgorithm });
} 