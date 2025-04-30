import {
  FileSizeUnit,
  FileContentType,
  DEFAULT_FILE_GENERATOR_OPTIONS,
  convertToBytes,
  validateHexString,
  generateFileContent,
} from './index';

describe('File Generator', () => {
  describe('convertToBytes', () => {
    it('should correctly convert bytes', () => {
      expect(convertToBytes(1024, FileSizeUnit.Bytes)).toBe(1024);
    });

    it('should correctly convert kilobytes to bytes', () => {
      expect(convertToBytes(1, FileSizeUnit.KB)).toBe(1024);
      expect(convertToBytes(2, FileSizeUnit.KB)).toBe(2048);
    });

    it('should correctly convert megabytes to bytes', () => {
      expect(convertToBytes(1, FileSizeUnit.MB)).toBe(1048576);
      expect(convertToBytes(2, FileSizeUnit.MB)).toBe(2097152);
    });
  });

  describe('validateHexString', () => {
    it('should accept valid hex strings', () => {
      expect(validateHexString('00')).toBe('00');
      expect(validateHexString('ff')).toBe('ff');
      expect(validateHexString('FF')).toBe('FF');
      expect(validateHexString('deadbeef')).toBe('deadbeef');
    });

    it('should remove non-hex characters', () => {
      expect(validateHexString('de ad be ef')).toBe('deadbeef');
      expect(validateHexString('AB-CD-EF')).toBe('ABCDEF');
    });

    it('should throw error for empty hex string', () => {
      expect(() => validateHexString('')).toThrow('Hex string cannot be empty');
    });

    it('should throw error for odd-length hex string', () => {
      expect(() => validateHexString('0')).toThrow('Hex string must have an even number of digits');
      expect(() => validateHexString('ABC')).toThrow('Hex string must have an even number of digits');
    });
  });

  describe('generateFileContent', () => {
    /**
     * Helper function to convert a Blob to Uint8Array
     */
    async function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
      const arrayBuffer = await blob.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    }

    it('should generate random content of correct size', async () => {
      const options = {
        ...DEFAULT_FILE_GENERATOR_OPTIONS,
        size: 1024,
        unit: FileSizeUnit.Bytes,
        contentType: FileContentType.Random,
      };
      
      const blob = await generateFileContent(options);
      const content = await blobToUint8Array(blob);
      expect(content.length).toBe(1024);
      
      // Test randomness (this is probabilistic but should almost always pass)
      // Check that not all bytes are the same
      let allSame = true;
      const firstByte = content[0];
      for (let i = 1; i < content.length; i++) {
        if (content[i] !== firstByte) {
          allSame = false;
          break;
        }
      }
      expect(allSame).toBe(false);
    });

    it('should generate zeros content of correct size', async () => {
      const options = {
        ...DEFAULT_FILE_GENERATOR_OPTIONS,
        size: 512,
        unit: FileSizeUnit.Bytes,
        contentType: FileContentType.Zeros,
      };
      
      const blob = await generateFileContent(options);
      const content = await blobToUint8Array(blob);
      expect(content.length).toBe(512);
      
      // Verify all bytes are zero
      for (let i = 0; i < content.length; i++) {
        expect(content[i]).toBe(0);
      }
    });

    it('should generate custom hex content of correct size', async () => {
      const options = {
        ...DEFAULT_FILE_GENERATOR_OPTIONS,
        size: 16,
        unit: FileSizeUnit.Bytes,
        contentType: FileContentType.CustomHex,
        customHexValue: 'ABCD',
      };
      
      const blob = await generateFileContent(options);
      const content = await blobToUint8Array(blob);
      expect(content.length).toBe(16);
      
      // Verify the pattern repeats correctly
      for (let i = 0; i < content.length; i += 2) {
        expect(content[i]).toBe(0xAB);
        expect(content[i + 1]).toBe(0xCD);
      }
    });

    it('should throw error for negative size', async () => {
      const options = {
        ...DEFAULT_FILE_GENERATOR_OPTIONS,
        size: -1,
        unit: FileSizeUnit.KB,
      };
      
      await expect(generateFileContent(options)).rejects.toThrow('File size must be greater than 0');
    });

    it('should throw error for zero size', async () => {
      const options = {
        ...DEFAULT_FILE_GENERATOR_OPTIONS,
        size: 0,
        unit: FileSizeUnit.KB,
      };
      
      await expect(generateFileContent(options)).rejects.toThrow('File size must be greater than 0');
    });

    it('should throw error for missing custom hex value', async () => {
      const options = {
        ...DEFAULT_FILE_GENERATOR_OPTIONS,
        contentType: FileContentType.CustomHex,
        // No customHexValue
      };
      
      await expect(generateFileContent(options)).rejects.toThrow('Custom hex value is required');
    });

    it('should throw error for invalid custom hex value', async () => {
      const options = {
        ...DEFAULT_FILE_GENERATOR_OPTIONS,
        contentType: FileContentType.CustomHex,
        customHexValue: 'Z', // Invalid hex character
      };
      
      // After the validateHexString function runs, this will become an empty string
      // which will then throw "Hex string cannot be empty"
      await expect(generateFileContent(options)).rejects.toThrow('Hex string cannot be empty');
    });

    it('should throw error for very large sizes', async () => {
      const options = {
        ...DEFAULT_FILE_GENERATOR_OPTIONS,
        size: 11,
        unit: FileSizeUnit.GB,
      };
      
      await expect(generateFileContent(options)).rejects.toThrow('File size exceeds the maximum limit');
    });
  });
}); 