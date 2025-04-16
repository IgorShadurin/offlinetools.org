import {
  HashAlgorithm,
  generateHash,
  generateAllHashes,
  verifyTextHash,
  textToFileHashFormat,
  DEFAULT_HASH_OPTIONS,
} from './index'
import { HashAlgorithm as FileHashAlgorithm } from '../file-hash-compare'

describe('generateHash', () => {
  const testString = 'test string'
  
  it('calculates SHA-256 hash correctly', () => {
    const hash = generateHash(testString, { algorithm: HashAlgorithm.SHA256 })
    expect(hash).toBe('d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b')
  })
  
  it('calculates SHA-224 hash correctly', () => {
    const hash = generateHash(testString, { algorithm: HashAlgorithm.SHA224 })
    expect(hash).toBe('dd8a1f5793f157323ccb28fe953bb8abb659bd61b7e9fae10be26f7a')
  })
  
  it('calculates SHA-1 hash correctly', () => {
    const hash = generateHash(testString, { algorithm: HashAlgorithm.SHA1 })
    expect(hash).toBe('661295c9cbf9d6b2f6428414504a8deed3020641')
  })
  
  it('calculates MD5 hash correctly', () => {
    const hash = generateHash(testString, { algorithm: HashAlgorithm.MD5 })
    expect(hash).toBe('6f8db599de986fab7a21625b7916589c')
  })
  
  it('calculates SHA3-256 hash correctly', () => {
    const hash = generateHash(testString, { algorithm: HashAlgorithm.SHA3_256 })
    expect(hash).toBe('77e9f353431833c316bd41dc88670d9ad21d2e5950d6f5e2346f2e8859f4fc9b')
  })
  
  it('uses SHA-256 by default', () => {
    const hash = generateHash(testString)
    expect(hash).toBe('d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b')
  })
  
  it('outputs hash in uppercase when specified', () => {
    const hash = generateHash(testString, { algorithm: HashAlgorithm.SHA256, uppercase: true })
    expect(hash).toBe('D5579C46DFCC7F18207013E65B44E4CB4E2C2298F4AC457BA8F82743F31E930B')
  })
  
  it('handles empty string', () => {
    const hash = generateHash('', { algorithm: HashAlgorithm.SHA256 })
    expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
  })
})

describe('generateAllHashes', () => {
  const testString = 'test'
  
  it('generates hashes for all algorithms', () => {
    const allHashes = generateAllHashes(testString)
    
    // Check a few key algorithms
    expect(allHashes[HashAlgorithm.SHA256]).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08')
    expect(allHashes[HashAlgorithm.MD5]).toBe('098f6bcd4621d373cade4e832627b4f6')
    expect(allHashes[HashAlgorithm.SHA1]).toBe('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3')
    
    // Make sure all algorithms are covered
    expect(Object.keys(allHashes).length).toBe(Object.keys(HashAlgorithm).length)
  })
  
  it('generates uppercase hashes when specified', () => {
    const allHashes = generateAllHashes(testString, true)
    
    expect(allHashes[HashAlgorithm.SHA256]).toBe('9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08')
    expect(allHashes[HashAlgorithm.MD5]).toBe('098F6BCD4621D373CADE4E832627B4F6')
  })
})

describe('verifyTextHash', () => {
  it('verifies correct hash', () => {
    const result = verifyTextHash(
      'test',
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      HashAlgorithm.SHA256
    )
    expect(result).toBe(true)
  })
  
  it('fails for incorrect hash', () => {
    const result = verifyTextHash(
      'test',
      'incorrect-hash',
      HashAlgorithm.SHA256
    )
    expect(result).toBe(false)
  })
  
  it('is case-insensitive for verification', () => {
    const result = verifyTextHash(
      'test',
      '9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08',
      HashAlgorithm.SHA256
    )
    expect(result).toBe(true)
  })
})

describe('textToFileHashFormat', () => {
  it('converts text hash to file hash format for SHA-256', () => {
    const hash = textToFileHashFormat('test string', HashAlgorithm.SHA256)
    expect(hash).toBe('d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b')
  })
  
  it('converts text hash to file hash format for SHA-1', () => {
    const hash = textToFileHashFormat('test string', HashAlgorithm.SHA1)
    expect(hash).toBe('661295c9cbf9d6b2f6428414504a8deed3020641')
  })
  
  it('throws error for unsupported algorithm conversion', () => {
    expect(() => {
      textToFileHashFormat('test string', HashAlgorithm.SHA3_256)
    }).toThrow('Algorithm SHA3-256 cannot be converted to file hash format')
  })
}) 