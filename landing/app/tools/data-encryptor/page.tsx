import { Metadata } from "next";
import DataEncryptor from "./DataEncryptor";

export const metadata: Metadata = {
  title: "Data Encryptor",
  description:
    "Encrypt and decrypt text or files using password-based AES-256 encryption with secure PBKDF2 key derivation. Client-side processing ensures your data stays private.",
  keywords: [
    "data encryption",
    "AES-256",
    "file encryption",
    "text encryption",
    "password encryption",
    "PBKDF2",
    "secure encryption",
    "client-side encryption",
    "privacy tool",
    "data security",
  ],
  openGraph: {
    title: "Data Encryptor - Secure AES-256 Encryption Tool",
    description:
      "Encrypt and decrypt text or files using military-grade AES-256 encryption. All processing happens locally in your browser for maximum security.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Encryptor - Secure AES-256 Encryption Tool",
    description:
      "Encrypt and decrypt text or files using military-grade AES-256 encryption. All processing happens locally in your browser for maximum security.",
  },
};

export default function DataEncryptorPage() {
  return <DataEncryptor />;
}
