import {
  encryptText,
  decryptText,
  encryptFile,
  decryptFile,
  formatEncryptedOutput,
  parseEncryptedInput,
  type EncryptionOptions,
  type DecryptionOptions
} from './index';

describe('Data Encryptor', () => {
  const testPassword = 'test-password-123';
  const testText = 'Hello, World! This is a test message.';

  describe('Text Encryption/Decryption', () => {
    it('should encrypt and decrypt text successfully', async () => {
      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptText(testText, encryptionOptions);
      
      expect(result.encryptedData).toBeDefined();
      expect(result.salt).toBeDefined();
      expect(result.iv).toBeDefined();
      expect(result.encryptedData).not.toBe(testText);

      const decryptionOptions: DecryptionOptions = {
        password: testPassword,
        salt: result.salt,
        iv: result.iv
      };

      const decryptedText = await decryptText(result.encryptedData, decryptionOptions);
      expect(decryptedText).toBe(testText);
    });

    it('should fail decryption with wrong password', async () => {
      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptText(testText, encryptionOptions);

      const decryptionOptions: DecryptionOptions = {
        password: 'wrong-password',
        salt: result.salt,
        iv: result.iv
      };

      await expect(decryptText(result.encryptedData, decryptionOptions))
        .rejects.toThrow('Decryption failed: Invalid password or corrupted data');
    });

    it('should handle empty text encryption', async () => {
      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      await expect(encryptText('', encryptionOptions))
        .rejects.toThrow('Text to encrypt cannot be empty');
    });

    it('should handle missing password', async () => {
      const encryptionOptions: EncryptionOptions = {
        password: ''
      };

      await expect(encryptText(testText, encryptionOptions))
        .rejects.toThrow('Password is required for encryption');
    });

    it('should handle special characters and unicode', async () => {
      const specialText = '🔐 Special chars: àáâãäå ñ 中文 العربية';
      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptText(specialText, encryptionOptions);

      const decryptionOptions: DecryptionOptions = {
        password: testPassword,
        salt: result.salt,
        iv: result.iv
      };

      const decryptedText = await decryptText(result.encryptedData, decryptionOptions);
      expect(decryptedText).toBe(specialText);
    });

    it('should use custom iterations', async () => {
      const customIterations = 50000;
      const encryptionOptions: EncryptionOptions = {
        password: testPassword,
        iterations: customIterations
      };

      const result = await encryptText(testText, encryptionOptions);

      const decryptionOptions: DecryptionOptions = {
        password: testPassword,
        salt: result.salt,
        iv: result.iv,
        iterations: customIterations
      };

      const decryptedText = await decryptText(result.encryptedData, decryptionOptions);
      expect(decryptedText).toBe(testText);
    });
  });

  describe('File Encryption/Decryption', () => {
    it('should encrypt and decrypt a text file', async () => {
      const fileContent = 'This is a test file content.';
      const file = new Blob([fileContent], { type: 'text/plain' });

      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptFile(file, encryptionOptions);
      
      expect(result.encryptedData).toBeDefined();
      expect(result.salt).toBeDefined();
      expect(result.iv).toBeDefined();

      const decryptionOptions: DecryptionOptions = {
        password: testPassword,
        salt: result.salt,
        iv: result.iv
      };

      const decryptedFile = await decryptFile(result.encryptedData, decryptionOptions);
      const decryptedContent = await decryptedFile.text();
      expect(decryptedContent).toBe(fileContent);
    });

    it('should encrypt and decrypt binary data', async () => {
      const binaryData = new Uint8Array([0, 1, 2, 3, 255, 254, 253]);
      const file = new Blob([binaryData], { type: 'application/octet-stream' });

      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptFile(file, encryptionOptions);

      const decryptionOptions: DecryptionOptions = {
        password: testPassword,
        salt: result.salt,
        iv: result.iv
      };

      const decryptedFile = await decryptFile(result.encryptedData, decryptionOptions);
      const decryptedBuffer = await decryptedFile.arrayBuffer();
      const decryptedArray = new Uint8Array(decryptedBuffer);
      
      expect(decryptedArray).toEqual(binaryData);
    });

    it('should handle empty file', async () => {
      const emptyFile = new Blob([], { type: 'text/plain' });

      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      await expect(encryptFile(emptyFile, encryptionOptions))
        .rejects.toThrow('File to encrypt cannot be empty');
    });

    it('should fail file decryption with wrong password', async () => {
      const fileContent = 'Test file content';
      const file = new Blob([fileContent], { type: 'text/plain' });

      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptFile(file, encryptionOptions);

      const decryptionOptions: DecryptionOptions = {
        password: 'wrong-password',
        salt: result.salt,
        iv: result.iv
      };

      await expect(decryptFile(result.encryptedData, decryptionOptions))
        .rejects.toThrow('File decryption failed: Invalid password or corrupted data');
    });
  });

  describe('Utility Functions', () => {
    it('should format and parse encrypted output correctly', async () => {
      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptText(testText, encryptionOptions);
      const formatted = formatEncryptedOutput(result);
      
      expect(formatted).toBe(`${result.salt}:${result.iv}:${result.encryptedData}`);
      expect(formatted.split(':')).toHaveLength(3);

      const parsed = parseEncryptedInput(formatted);
      expect(parsed.salt).toBe(result.salt);
      expect(parsed.iv).toBe(result.iv);
      expect(parsed.encryptedData).toBe(result.encryptedData);
    });

    it('should handle invalid encrypted input format', () => {
      expect(() => parseEncryptedInput('invalid')).toThrow('Invalid encrypted data format');
      expect(() => parseEncryptedInput('part1:part2')).toThrow('Invalid encrypted data format');
      expect(() => parseEncryptedInput('::part3')).toThrow('Invalid encrypted data format');
      expect(() => parseEncryptedInput('part1:part2:invalid-base64!')).toThrow('Invalid encrypted data format');
    });

    it('should validate Base64 format in parsed input', () => {
      const validBase64 = 'dGVzdA==';
      const invalidBase64 = 'invalid-base64!';
      
      expect(() => parseEncryptedInput(`${validBase64}:${validBase64}:${validBase64}`)).not.toThrow();
      expect(() => parseEncryptedInput(`${invalidBase64}:${validBase64}:${validBase64}`)).toThrow('Invalid encrypted data format');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing decryption parameters', async () => {
      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptText(testText, encryptionOptions);

      await expect(decryptText(result.encryptedData, {
        password: testPassword,
        salt: '',
        iv: result.iv
      })).rejects.toThrow('Salt and IV are required for decryption');

      await expect(decryptText(result.encryptedData, {
        password: testPassword,
        salt: result.salt,
        iv: ''
      })).rejects.toThrow('Salt and IV are required for decryption');
    });

    it('should handle corrupted encrypted data', async () => {
      const encryptionOptions: EncryptionOptions = {
        password: testPassword
      };

      const result = await encryptText(testText, encryptionOptions);
      const corruptedData = result.encryptedData.slice(0, -5) + 'XXXXX';

      const decryptionOptions: DecryptionOptions = {
        password: testPassword,
        salt: result.salt,
        iv: result.iv
      };

      await expect(decryptText(corruptedData, decryptionOptions))
        .rejects.toThrow('Decryption failed');
    });
  });
});
