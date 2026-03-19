import {
  derivePublicKeyHex,
  generateLicenseKey,
  normalizeLicenseEmail,
} from "shared";

const LICENSE_PRIVATE_KEY_HEX = process.env.LICENSE_PRIVATE_KEY_HEX;
const LICENSE_PUBLIC_KEY_HEX = process.env.LICENSE_PUBLIC_KEY_HEX;

function getPrivateKeyHex(): string {
  if (!LICENSE_PRIVATE_KEY_HEX) {
    throw new Error("LICENSE_PRIVATE_KEY_HEX is not configured");
  }

  return LICENSE_PRIVATE_KEY_HEX;
}

export async function issueLicenseKeyForEmail(email: string): Promise<{ email: string; licenseKey: string }> {
  const normalizedEmail = normalizeLicenseEmail(email);
  if (!normalizedEmail) {
    throw new Error("Email is required");
  }

  const licenseKey = await generateLicenseKey(normalizedEmail, getPrivateKeyHex());
  return { email: normalizedEmail, licenseKey };
}

export async function getLicensePublicKeyHex(): Promise<string> {
  if (LICENSE_PUBLIC_KEY_HEX && LICENSE_PUBLIC_KEY_HEX.trim().length > 0) {
    return LICENSE_PUBLIC_KEY_HEX.trim().toLowerCase();
  }

  return derivePublicKeyHex(getPrivateKeyHex());
}
