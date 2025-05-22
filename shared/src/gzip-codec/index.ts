import {
  gzipSync,
  gunzipSync,
  strToU8,
  strFromU8,
  GzipOptions,
  GunzipOptions,
} from 'fflate';

/**
 * Options for Gzip codec.
 * Currently, this is a placeholder and directly uses fflate's GzipOptions.
 */
export interface GzipCodecOptions extends GzipOptions {}

/**
 * Options for Gunzip codec.
 * Currently, this is a placeholder and directly uses fflate's GunzipOptions.
 */
export interface GunzipCodecOptions extends GunzipOptions {}

/**
 * Compresses a string or Uint8Array using Gzip.
 *
 * @param input The string or Uint8Array to compress.
 * @param options Gzip options from fflate.
 * @returns The compressed data as a Uint8Array.
 * @throws Will throw an error if compression fails.
 */
export function gzipPack(
  input: string | Uint8Array,
  options?: GzipCodecOptions,
): Uint8Array {
  try {
    const data = typeof input === 'string' ? strToU8(input) : input;
    return gzipSync(data, options);
  } catch (error) {
    throw new Error(`Gzip compression failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Decompresses a Gzip-compressed Uint8Array.
 *
 * @param input The Uint8Array to decompress.
 * @param options Gunzip options from fflate.
 * @returns The decompressed data as a string.
 * @throws Will throw an error if decompression fails.
 */
export function gzipExtract(
  input: Uint8Array,
  options?: GunzipCodecOptions,
): string {
  try {
    const decompressedData = gunzipSync(input, options);
    return strFromU8(decompressedData);
  } catch (error) {
    throw new Error(`Gzip decompression failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Export all necessary functions and types
export { GzipOptions, GunzipOptions };
