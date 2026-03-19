import { getPublicKeyAsync, signAsync, verifyAsync } from "@noble/ed25519";

const LICENSE_PREFIX = "OT1";
const LICENSE_MESSAGE_PREFIX = "offlinetools-license-v1";

export interface ParsedLicenseKey {
  prefix: string;
  signature: Uint8Array;
}

export function normalizeLicenseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function createLicenseMessage(email: string): string {
  return `${LICENSE_MESSAGE_PREFIX}:${normalizeLicenseEmail(email)}`;
}

export function isHex(value: string): boolean {
  return /^[0-9a-f]+$/i.test(value);
}

export function hexToBytes(hex: string): Uint8Array {
  const normalized = hex.trim().toLowerCase();
  if (normalized.length % 2 !== 0 || !isHex(normalized)) {
    throw new Error("Invalid hex input");
  }

  const result = new Uint8Array(normalized.length / 2);
  for (let index = 0; index < normalized.length; index += 2) {
    result[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16);
  }

  return result;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

type BufferFromFn = (
  value: Uint8Array | string,
  encoding?: string
) => Uint8Array & { toString: (encoding?: string) => string };

function getBufferFromFn(): BufferFromFn | null {
  const maybeBuffer = (globalThis as Record<string, unknown>).Buffer;
  if (!maybeBuffer || (typeof maybeBuffer !== "object" && typeof maybeBuffer !== "function")) {
    return null;
  }

  const maybeFrom = (maybeBuffer as { from?: unknown }).from;
  if (typeof maybeFrom !== "function") {
    return null;
  }

  return maybeFrom as BufferFromFn;
}

function toBase64Url(bytes: Uint8Array): string {
  const bufferFrom = getBufferFromFn();
  if (bufferFrom) {
    return bufferFrom(bytes).toString("base64url");
  }

  const chunkSize = 0x8000;
  let binary = "";
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");

  const bufferFrom = getBufferFromFn();
  if (bufferFrom) {
    return new Uint8Array(bufferFrom(normalized, "base64"));
  }

  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

export function parseLicenseKey(licenseKey: string): ParsedLicenseKey {
  const key = licenseKey.trim();
  const separatorIndex = key.indexOf("-");
  if (separatorIndex <= 0 || separatorIndex >= key.length - 1) {
    throw new Error("Invalid license key format");
  }

  const prefix = key.slice(0, separatorIndex);
  const encodedSignature = key.slice(separatorIndex + 1);

  if (prefix !== LICENSE_PREFIX) {
    throw new Error("Unsupported license key prefix");
  }

  const signature = fromBase64Url(encodedSignature);
  if (signature.length !== 64) {
    throw new Error("Invalid license signature length");
  }

  return { prefix, signature };
}

export async function generateLicenseKey(email: string, privateKeyHex: string): Promise<string> {
  const normalizedEmail = normalizeLicenseEmail(email);
  if (!normalizedEmail) {
    throw new Error("Email is required");
  }

  const privateKey = hexToBytes(privateKeyHex);
  if (privateKey.length !== 32) {
    throw new Error("Private key must be 32 bytes (64 hex chars)");
  }

  const message = new TextEncoder().encode(createLicenseMessage(normalizedEmail));
  const signature = await signAsync(message, privateKey);
  const signatureToken = toBase64Url(signature);

  return `${LICENSE_PREFIX}-${signatureToken}`;
}

export async function verifyLicenseKey(email: string, licenseKey: string, publicKeyHex: string): Promise<boolean> {
  try {
    const normalizedEmail = normalizeLicenseEmail(email);
    if (!normalizedEmail) {
      return false;
    }

    const { signature } = parseLicenseKey(licenseKey);
    const publicKey = hexToBytes(publicKeyHex);
    if (publicKey.length !== 32) {
      return false;
    }

    const message = new TextEncoder().encode(createLicenseMessage(normalizedEmail));
    return await verifyAsync(signature, message, publicKey);
  } catch {
    return false;
  }
}

export async function derivePublicKeyHex(privateKeyHex: string): Promise<string> {
  const privateKey = hexToBytes(privateKeyHex);
  if (privateKey.length !== 32) {
    throw new Error("Private key must be 32 bytes (64 hex chars)");
  }

  const publicKey = await getPublicKeyAsync(privateKey);
  return bytesToHex(publicKey);
}

export function getLicensePrefix(): string {
  return LICENSE_PREFIX;
}
