import type { Metadata } from "next";
import { Lock, Key, Code, Database, Send, Shield, EyeOff } from "lucide-react";
import React from "react";

export const metadata: Metadata = {
  title: "Data Encryption in JSON Formatter Storage and Transmission | Offline Tools",
  description:
    "Learn how to encrypt JSON locally with Web Crypto, store only ciphertext, and decide when HTTPS alone is enough for secure transmission.",
};

export default function DataEncryptionJsonFormatterArticle() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="mr-3 h-8 w-8 text-blue-600" />
        Data Encryption in JSON Formatter Storage and Transmission
      </h1>

      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          If a JSON formatter runs entirely in the browser, the safest default is simple: keep the JSON on the device,
          avoid sending it anywhere, and only encrypt it when the user chooses to save, export, or sync it. For modern
          browser-based tools, that usually means Web Crypto plus authenticated encryption such as AES-GCM, then
          storing only ciphertext and the non-secret metadata needed to decrypt it later.
        </p>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
          <p className="m-0">
            <strong>Short answer:</strong> an offline encryption and decryption workflow should keep plaintext JSON in
            memory only, derive a key from a user passphrase or retrieve one from a secure backend secret store, use a
            fresh IV for every AES-GCM encryption, store ciphertext separately from the key, and rely on HTTPS for any
            network transmission.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Lock className="mr-2 h-6 w-6 text-green-600" />
          What Search Users Usually Need
        </h2>
        <p>
          Someone looking for an offline encryption and decryption tool is rarely asking for theory alone. They usually
          need to know whether a formatter uploads data, how local saves should work, and what security trade-offs are
          real in a browser.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>No silent upload:</strong> if the tool is described as offline, parsing and formatting should happen
            locally unless the user explicitly exports or submits data.
          </li>
          <li>
            <strong>Optional encrypted save:</strong> drafts, backups, or downloads should be stored as ciphertext, not
            raw JSON.
          </li>
          <li>
            <strong>User-controlled decryption:</strong> the person opening the saved data should provide the
            passphrase or key when they want the original JSON back.
          </li>
          <li>
            <strong>Clear delete path:</strong> users should be able to wipe saved ciphertext and any cached drafts
            without guesswork.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Database className="mr-2 h-6 w-6 text-purple-600" />
          Encrypting JSON for Storage
        </h2>
        <p>
          Encryption for storage matters when a formatter keeps drafts in the browser, downloads an encrypted backup
          file, or writes JSON into a database on a server. The same rule applies everywhere: encrypt before writing to
          persistent storage, and keep the key out of that storage location.
        </p>

        <h3 className="text-xl font-semibold mt-6">Practical storage choices for a browser tool</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Best for sensitive one-off work:</strong> keep plaintext only in memory and discard it when the tab
            closes.
          </li>
          <li>
            <strong>Reasonable for encrypted drafts:</strong> store ciphertext, IV, salt, and version metadata in
            IndexedDB or in an exported encrypted file.
          </li>
          <li>
            <strong>Avoid for secrets:</strong> `localStorage` and `sessionStorage` are not secret vaults. They are
            easy places to persist ciphertext metadata, but they are bad places to keep raw keys or passphrases.
          </li>
        </ul>

        <p>A safe storage flow usually looks like this:</p>
        <ol className="list-decimal pl-6 space-y-2 my-4">
          <li>Serialize the JSON value with `JSON.stringify`.</li>
          <li>Derive or load an encryption key.</li>
          <li>Generate a fresh random IV for this encryption only.</li>
          <li>Encrypt with an authenticated mode such as AES-GCM.</li>
          <li>Store ciphertext together with the IV, salt, algorithm, and version marker.</li>
          <li>Keep the passphrase or master key somewhere else, or require the user to re-enter it later.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 flex items-center">
          <Code className="mr-2 h-6 w-6 text-cyan-600" />
          Browser Example: Encrypt and Decrypt JSON Offline
        </h3>
        <p>
          For a browser-based JSON formatter, Web Crypto is the current built-in option to use. The example below uses
          PBKDF2 to derive an AES-GCM key from a passphrase, then stores the non-secret values needed for decryption in
          a small envelope object.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800 my-4">
          <h4 className="text-lg font-medium">Passphrase-based browser encryption with Web Crypto:</h4>
          <div className="bg-white p-3 rounded dark:bg-gray-900 overflow-x-auto">
            <pre>
              {`type EncryptedJsonEnvelope = {
  version: 1;
  algorithm: 'AES-GCM';
  kdf: 'PBKDF2-SHA-256';
  iterations: number;
  salt: string;
  iv: string;
  ciphertext: string;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const PBKDF2_ITERATIONS = 250000; // Benchmark and review periodically

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}

async function deriveKey(passphrase: string, salt: Uint8Array) {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptJsonOffline(
  value: unknown,
  passphrase: string
): Promise<EncryptedJsonEnvelope> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
  const key = await deriveKey(passphrase, salt);
  const plaintext = encoder.encode(JSON.stringify(value));

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    plaintext
  );

  return {
    version: 1,
    algorithm: 'AES-GCM',
    kdf: 'PBKDF2-SHA-256',
    iterations: PBKDF2_ITERATIONS,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(new Uint8Array(ciphertext))
  };
}

export async function decryptJsonOffline(
  payload: EncryptedJsonEnvelope,
  passphrase: string
) {
  const key = await deriveKey(passphrase, base64ToBytes(payload.salt));
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: base64ToBytes(payload.iv) },
    key,
    base64ToBytes(payload.ciphertext)
  );

  return JSON.parse(decoder.decode(plaintext));
}`}
            </pre>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Why this shape works:</span> the salt and IV are not secrets, so they can
            travel with the ciphertext. The passphrase is still the sensitive part, so it should not be stored next to
            the encrypted payload.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6">Compatibility and implementation notes</h3>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Secure context requirement:</strong> browser crypto APIs are meant to run in secure contexts, so use
            HTTPS in production. `localhost` is typically acceptable while developing locally.
          </li>
          <li>
            <strong>Use a unique IV every time:</strong> reusing an AES-GCM IV with the same key can break security.
          </li>
          <li>
            <strong>Keep a version field:</strong> encrypted exports should record algorithm and KDF details so you can
            decrypt old data after future changes.
          </li>
          <li>
            <strong>Plan for forgotten passphrases:</strong> if the user is the only holder of the passphrase, losing it
            usually means the data is gone.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Send className="mr-2 h-6 w-6 text-orange-600" />
          Encrypting JSON in Transit
        </h2>
        <p>
          If your formatter is truly offline, there is no transmission risk because the JSON never leaves the device.
          The moment you add syncing, sharing, upload, or API calls, transport security matters.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>HTTPS is the baseline:</strong> it protects JSON as it moves between browser and server.
          </li>
          <li>
            <strong>Payload encryption is an extra layer:</strong> add it only when the server, proxies, logs, or other
            intermediaries should not see plaintext.
          </li>
          <li>
            <strong>Authenticated encryption matters here too:</strong> if you encrypt the body yourself, prefer
            AES-GCM or another AEAD mode so decryption fails on tampering.
          </li>
        </ul>

        <p>
          A practical rule is to treat HTTPS as mandatory for every network request, then ask one more question:{" "}
          <em>Should the receiving server be able to read this JSON?</em> If the answer is yes, TLS is usually enough.
          If the answer is no, you need application-level encryption on top of TLS and a clear key exchange model.
        </p>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Key className="mr-2 h-6 w-6 text-red-600" />
          Key Management Is Still the Hard Part
        </h2>
        <p>
          The algorithm is rarely the weakest link. The real failures usually come from storing keys next to
          ciphertext, logging secrets, or making recovery impossible without telling users.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Browser-only tools:</strong> ask the user for a passphrase, or keep the working key in memory only
            for the current session.
          </li>
          <li>
            <strong>Server-side storage:</strong> fetch keys from a KMS, HSM, or secrets manager instead of hardcoding
            them in source files or environment variables committed to disk.
          </li>
          <li>
            <strong>Rotation:</strong> version encrypted payloads so you can re-encrypt or support multiple active keys
            during migration.
          </li>
          <li>
            <strong>Backups:</strong> if business data must remain recoverable, your recovery story has to be designed
            before launch, not after the first locked-out user.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <EyeOff className="mr-2 h-6 w-6 text-gray-600" />
          Whole JSON vs. Field-Level Encryption
        </h2>
        <p>
          Encrypting the whole document is usually the best fit for an offline formatter or encrypted export. It is
          easier to implement, easier to reason about, and leaks less information about the document structure.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            <strong>Whole-document encryption:</strong> best for local drafts, downloads, backups, and zero-knowledge
            style exports.
          </li>
          <li>
            <strong>Field-level encryption:</strong> useful when a server still needs to route, index, or validate the
            non-sensitive parts of the JSON, but it reveals more structure and takes more care to implement correctly.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 flex items-center">
          <Shield className="mr-2 h-6 w-6 text-blue-600" />
          Common Mistakes to Avoid
        </h2>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Using AES-CBC without a separate authentication layer when AES-GCM is available.
          </li>
          <li>Reusing the same IV with the same key.</li>
          <li>Saving the passphrase, raw key, or decrypted JSON beside the ciphertext.</li>
          <li>Assuming client-side encryption protects against XSS or malicious third-party scripts on the page.</li>
          <li>Sending plaintext JSON to analytics, logs, crash reporters, or debugging consoles.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">Conclusion</h2>
        <p>
          For a JSON formatter, good encryption design starts with minimizing exposure: keep processing local, avoid
          storage unless it is useful, and encrypt before anything sensitive becomes persistent. In practice, that means
          Web Crypto in the browser, AES-GCM with a fresh IV, ciphertext-only local storage, and HTTPS for every
          network hop. If you need more than that, the next problem is not choosing a prettier cipher name, but
          designing key management that will still hold up when the tool is in real use.
        </p>
      </div>
    </>
  );
}
