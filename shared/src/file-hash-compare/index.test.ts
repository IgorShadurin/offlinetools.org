import { 
  HashAlgorithm, 
  calculateTextHash, 
  calculateFileHash, 
  compareHashes, 
  DEFAULT_HASH_OPTIONS 
} from './index'

describe('calculateTextHash', () => {
  const testString = 'test string'
  
  it('calculates SHA-256 hash correctly', () => {
    const hash = calculateTextHash(testString, { algorithm: HashAlgorithm.SHA256 })
    expect(hash).toBe('d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b')
  })
  
  it('calculates SHA-224 hash correctly', () => {
    const hash = calculateTextHash(testString, { algorithm: HashAlgorithm.SHA224 })
    expect(hash).toBe('dd8a1f5793f157323ccb28fe953bb8abb659bd61b7e9fae10be26f7a')
  })
  
  it('calculates SHA-1 hash correctly for "test"', () => {
    const hash = calculateTextHash('test', { algorithm: HashAlgorithm.SHA1 })
    expect(hash).toBe('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3')
  })

  it('calculates SHA-1 hash correctly for complex string', () => {
    const complexString = 'ergq345gq35hgq34gxq34ctgc23q45gxq45g'
    const hash = calculateTextHash(complexString, { algorithm: HashAlgorithm.SHA1 })
    expect(hash).toBe('8057df5f20fdda8a93f8aae5fe372605bc5abbc6')
  })
  
  it('calculates MD5 hash correctly for "text"', () => {
    const hash = calculateTextHash('text', { algorithm: HashAlgorithm.MD5 })
    expect(hash).toBe('1cb251ec0d568de6a929b520c4aed8d1')
  })

  it('calculates MD5 hash for complex string', () => {
    const complexString = 'w246h356hj356hj3256h2w4h562w4t6h'
    const hash = calculateTextHash(complexString, { algorithm: HashAlgorithm.MD5 })
    expect(hash).toBe('d93f6b2d0f984658e1b14cc13b32159a')
  })
  
  it('uses SHA-256 by default', () => {
    const hash = calculateTextHash(testString)
    expect(hash).toBe('d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b')
  })

  it('handles empty string', () => {
    const hash = calculateTextHash('', { algorithm: HashAlgorithm.SHA256 })
    expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
  })
})

describe('calculateFileHash', () => {
  // Create a simple ArrayBuffer for testing
  const createTestBuffer = (): ArrayBuffer => {
    const buffer = new ArrayBuffer(4)
    const view = new Uint8Array(buffer)
    view[0] = 84  // 'T'
    view[1] = 69  // 'E'
    view[2] = 83  // 'S'
    view[3] = 84  // 'T'
    return buffer
  }
  
  const testBuffer = createTestBuffer()
  
  it('calculates SHA-256 hash correctly for file content', () => {
    const hash = calculateFileHash(testBuffer, { algorithm: HashAlgorithm.SHA256 })
    expect(hash).toBe('94ee059335e587e501cc4bf90613e0814f00a7b08bc7c648fd865a2af6a22cc2')
  })
  
  it('calculates SHA-224 hash correctly for file content', () => {
    const hash = calculateFileHash(testBuffer, { algorithm: HashAlgorithm.SHA224 })
    expect(hash).toBe('917ecca24f3e6ceaf52375d8083381f1f80a21e6e49fbadc40afeb8e')
  })
  
  it('calculates SHA-1 hash correctly for file content', () => {
    const hash = calculateFileHash(testBuffer, { algorithm: HashAlgorithm.SHA1 })
    expect(hash).toBe('984816fd329622876e14907634264e6f332e9fb3')
  })
  
  it('calculates MD5 hash correctly for file content', () => {
    const hash = calculateFileHash(testBuffer, { algorithm: HashAlgorithm.MD5 })
    expect(hash).toBe('033bd94b1168d7e4f0d644c3c95e35bf')
  })
  
  it('uses SHA-256 by default for file content', () => {
    const hash = calculateFileHash(testBuffer)
    expect(hash).toBe('94ee059335e587e501cc4bf90613e0814f00a7b08bc7c648fd865a2af6a22cc2')
  })
})

describe('compareHashes', () => {
  it('correctly identifies matching hashes', () => {
    const result = compareHashes(
      'd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
      'd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b'
    )
    expect(result.match).toBe(true)
    expect(result.firstHash).toBe('d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b')
    expect(result.secondHash).toBe('d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b')
  })
  
  it('correctly identifies non-matching hashes', () => {
    const result = compareHashes(
      'd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    )
    expect(result.match).toBe(false)
    expect(result.firstHash).toBe('d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b')
    expect(result.secondHash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
  })
  
  it('compares case-sensitively', () => {
    const result = compareHashes(
      'd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b',
      'D5579C46DFCC7F18207013E65B44E4CB4E2C2298F4AC457BA8F82743F31E930B'
    )
    expect(result.match).toBe(false)
  })
}) 