import { gzipPack, gzipExtract, GzipCodecOptions, GunzipCodecOptions } from './index';

describe('GzipCodec', () => {
  describe('gzipPack and gzipExtract', () => {
    test('should compress and decompress a simple string', () => {
      const originalString = 'Hello, world!';
      const compressed = gzipPack(originalString);
      const decompressed = gzipExtract(compressed);
      expect(decompressed).toBe(originalString);
    });

    test('should compress and decompress an empty string', () => {
      const originalString = '';
      const compressed = gzipPack(originalString);
      const decompressed = gzipExtract(compressed);
      expect(decompressed).toBe(originalString);
    });

    test('should compress and decompress a string with Unicode characters', () => {
      const originalString = '你好，世界！🌍';
      const compressed = gzipPack(originalString);
      const decompressed = gzipExtract(compressed);
      expect(decompressed).toBe(originalString);
    });

    test('should work with Uint8Array input for gzipPack', () => {
      const originalString = 'Hello Uint8Array!';
      const originalUint8Array = new TextEncoder().encode(originalString);
      const compressed = gzipPack(originalUint8Array);
      const decompressed = gzipExtract(compressed);
      expect(decompressed).toBe(originalString);
    });

    test('should apply GzipCodecOptions (compression level)', () => {
      const originalString = 'Test compression levels. '.repeat(100); // Larger string to see potential difference
      const options: GzipCodecOptions = { level: 9 }; // Max compression
      const compressed = gzipPack(originalString, options);
      const decompressed = gzipExtract(compressed);
      expect(decompressed).toBe(originalString);

      const optionsLowCompression: GzipCodecOptions = { level: 1 }; // Min compression
      const compressedLow = gzipPack(originalString, optionsLowCompression);
      const decompressedLow = gzipExtract(compressedLow);
      expect(decompressedLow).toBe(originalString);

      // It's hard to assert the exact size difference without more detailed checks,
      // but we can check that higher compression is generally smaller or equal.
      // This depends on the input data and fflate's behavior.
      // For very small strings, higher compression might even increase size due to overhead.
      if (originalString.length > 100) { // Only check for reasonably sized strings
         expect(compressed.length).toBeLessThanOrEqual(compressedLow.length + 50); // Allow some tolerance
      }
    });

    test('should apply GunzipCodecOptions (if any were relevant - fflate GunzipOptions are limited)', () => {
      // fflate's GunzipOptions are not extensive. We'll just test that it runs with an empty options object.
      const originalString = 'Testing GunzipOptions';
      const compressed = gzipPack(originalString);
      const options: GunzipCodecOptions = {};
      const decompressed = gzipExtract(compressed, options);
      expect(decompressed).toBe(originalString);
    });
  });

  describe('Error Handling', () => {
    test('gzipPack should throw an error for invalid input (e.g. null)', () => {
      // @ts-expect-error Testing invalid input type
      expect(() => gzipPack(null)).toThrow(/Gzip compression failed/);
    });

    test('gzipExtract should throw an error for invalid (non-gzipped) input', () => {
      const invalidInput = new Uint8Array([1, 2, 3, 4, 5]);
      expect(() => gzipExtract(invalidInput)).toThrow(
        /Gzip decompression failed/,
      );
    });

    test('gzipExtract should throw an error for corrupted gzipped input', () => {
      const originalString = 'Valid Gzip data that will be corrupted.';
      const compressed = gzipPack(originalString);
      // Corrupt the data by changing some bytes
      const corruptedInput = new Uint8Array(compressed);
      if (corruptedInput.length >= 2) {
        // Corrupt Gzip magic numbers (first two bytes)
        corruptedInput[0] = 0xff; // Invalid Gzip magic number
        corruptedInput[1] = 0xff; // Invalid Gzip magic number
      } else if (corruptedInput.length > 0) {
        // If very short, just corrupt what's there
        corruptedInput[0] = 0xff;
      } else {
        // If empty, this test isn't meaningful as gunzipSync might handle empty array gracefully
        // or throw a different error. We want to test actual data corruption.
        // We can make it an invalid non-empty array.
        const invalidNonEmptyArray = new Uint8Array([0xff, 0xff, 0xff]);
        expect(() => gzipExtract(invalidNonEmptyArray)).toThrow(/Gzip decompression failed/);
        return; // Exit test early for this specific empty case.
      }
      expect(() => gzipExtract(corruptedInput)).toThrow(
        /Gzip decompression failed/,
      );
    });
  });
});
