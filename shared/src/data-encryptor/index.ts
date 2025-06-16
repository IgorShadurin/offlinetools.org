export interface EncryptionOptions {
  password: string;
  iterations?: number;
}

export interface EncryptionResult {
  encryptedData: string;
  salt: string;
  iv: string;
}

export interface DecryptionOptions {
  password: string;
  salt: string;
  iv: string;
  iterations?: number;
}

const DEFAULT_ITERATIONS = 100000;
const SALT_LENGTH = 16;
const IV_LENGTH = 16;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function deriveKey(password: string, salt: Uint8Array, iterations: number): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  const importedKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-256'
    },
    importedKey,
    {
      name: 'AES-CBC',
      length: 256
    },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptText(
  text: string,
  options: EncryptionOptions
): Promise<EncryptionResult> {
  if (!text) {
    throw new Error('Text to encrypt cannot be empty');
  }
  
  if (!options.password) {
    throw new Error('Password is required for encryption');
  }

  const iterations = options.iterations || DEFAULT_ITERATIONS;
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  
  try {
    const key = await deriveKey(options.password, salt, iterations);
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: iv
      },
      key,
      data
    );
    
    return {
      encryptedData: arrayBufferToBase64(encryptedBuffer),
      salt: arrayBufferToBase64(salt.buffer),
      iv: arrayBufferToBase64(iv.buffer)
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function decryptText(
  encryptedData: string,
  options: DecryptionOptions
): Promise<string> {
  if (!encryptedData) {
    throw new Error('Encrypted data cannot be empty');
  }
  
  if (!options.password) {
    throw new Error('Password is required for decryption');
  }
  
  if (!options.salt || !options.iv) {
    throw new Error('Salt and IV are required for decryption');
  }

  const iterations = options.iterations || DEFAULT_ITERATIONS;
  
  try {
    const salt = new Uint8Array(base64ToArrayBuffer(options.salt));
    const iv = new Uint8Array(base64ToArrayBuffer(options.iv));
    const data = base64ToArrayBuffer(encryptedData);
    
    const key = await deriveKey(options.password, salt, iterations);
    
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: iv
      },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch (error) {
    if (error instanceof Error && error.message.includes('OperationError')) {
      throw new Error('Decryption failed: Invalid password or corrupted data');
    }
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function encryptFile(
  file: Blob,
  options: EncryptionOptions
): Promise<EncryptionResult> {
  if (!file || file.size === 0) {
    throw new Error('File to encrypt cannot be empty');
  }
  
  if (!options.password) {
    throw new Error('Password is required for encryption');
  }

  const iterations = options.iterations || DEFAULT_ITERATIONS;
  const data = await file.arrayBuffer();
  
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  
  try {
    const key = await deriveKey(options.password, salt, iterations);
    
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: 'AES-CBC',
        iv: iv
      },
      key,
      data
    );
    
    return {
      encryptedData: arrayBufferToBase64(encryptedBuffer),
      salt: arrayBufferToBase64(salt.buffer),
      iv: arrayBufferToBase64(iv.buffer)
    };
  } catch (error) {
    throw new Error(`File encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function decryptFile(
  encryptedData: string,
  options: DecryptionOptions,
  originalFileName?: string
): Promise<Blob> {
  if (!encryptedData) {
    throw new Error('Encrypted data cannot be empty');
  }
  
  if (!options.password) {
    throw new Error('Password is required for decryption');
  }
  
  if (!options.salt || !options.iv) {
    throw new Error('Salt and IV are required for decryption');
  }

  const iterations = options.iterations || DEFAULT_ITERATIONS;
  
  try {
    const salt = new Uint8Array(base64ToArrayBuffer(options.salt));
    const iv = new Uint8Array(base64ToArrayBuffer(options.iv));
    const data = base64ToArrayBuffer(encryptedData);
    
    const key = await deriveKey(options.password, salt, iterations);
    
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: iv
      },
      key,
      data
    );
    
    return new Blob([decryptedBuffer]);
  } catch (error) {
    if (error instanceof Error && error.message.includes('OperationError')) {
      throw new Error('File decryption failed: Invalid password or corrupted data');
    }
    throw new Error(`File decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function formatEncryptedOutput(result: EncryptionResult): string {
  return `${result.salt}:${result.iv}:${result.encryptedData}`;
}

export function parseEncryptedInput(input: string): {
  salt: string;
  iv: string;
  encryptedData: string;
} {
  const parts = input.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format. Expected format: salt:iv:encryptedData');
  }
  
  const [salt, iv, encryptedData] = parts;
  
  if (!salt || !iv || !encryptedData) {
    throw new Error('Invalid encrypted data format. All parts (salt, iv, encryptedData) must be present');
  }
  
  try {
    atob(salt);
    atob(iv);
    atob(encryptedData);
  } catch (error) {
    throw new Error('Invalid encrypted data format. All parts must be valid Base64 strings');
  }
  
  return { salt, iv, encryptedData };
}
