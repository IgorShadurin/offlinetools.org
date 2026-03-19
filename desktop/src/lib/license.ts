import { normalizeLicenseEmail, verifyLicenseKey } from "shared";

export const LICENSE_STORAGE_KEY = "offlinetools.desktop.license";
export const LICENSE_PUBLIC_KEY_HEX = (import.meta.env.VITE_LICENSE_PUBLIC_KEY_HEX ?? "").trim().toLowerCase();

export type StoredLicense = {
  email: string;
  key: string;
};

export function readStoredLicense(): StoredLicense | null {
  try {
    const raw = localStorage.getItem(LICENSE_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<StoredLicense>;
    if (typeof parsed?.email !== "string" || typeof parsed?.key !== "string") {
      return null;
    }

    return {
      email: normalizeLicenseEmail(parsed.email),
      key: parsed.key.trim(),
    };
  } catch {
    return null;
  }
}

export function saveStoredLicense(value: StoredLicense): void {
  localStorage.setItem(
    LICENSE_STORAGE_KEY,
    JSON.stringify({
      email: normalizeLicenseEmail(value.email),
      key: value.key.trim(),
    }),
  );
}

export function clearStoredLicense(): void {
  localStorage.removeItem(LICENSE_STORAGE_KEY);
}

export async function validateLicense(email: string, key: string): Promise<boolean> {
  const normalizedEmail = normalizeLicenseEmail(email);
  const trimmedKey = key.trim();
  if (!normalizedEmail || !trimmedKey || !LICENSE_PUBLIC_KEY_HEX) {
    return false;
  }

  return verifyLicenseKey(normalizedEmail, trimmedKey, LICENSE_PUBLIC_KEY_HEX);
}
