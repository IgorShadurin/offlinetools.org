import { generatePassword, generateMultiplePasswords, DEFAULT_PASSWORD_OPTIONS } from './index';

describe('Password Generator', () => {
  describe('generatePassword', () => {
    it('should generate password with default options', () => {
      const password = generatePassword();
      expect(password).toBeTruthy();
      expect(password.length).toBe(DEFAULT_PASSWORD_OPTIONS.length);
    });

    it('should generate password with custom length', () => {
      const length = 20;
      const password = generatePassword({ length });
      expect(password.length).toBe(length);
    });

    it('should generate password with only lowercase characters', () => {
      const password = generatePassword({
        lowercase: true,
        uppercase: false,
        numbers: false,
        symbols: false,
      });
      expect(password).toMatch(/^[a-z]+$/);
    });

    it('should generate password with only uppercase characters', () => {
      const password = generatePassword({
        lowercase: false,
        uppercase: true,
        numbers: false,
        symbols: false,
      });
      expect(password).toMatch(/^[A-Z]+$/);
    });

    it('should generate password with only numbers', () => {
      const password = generatePassword({
        lowercase: false,
        uppercase: false,
        numbers: true,
        symbols: false,
      });
      expect(password).toMatch(/^[0-9]+$/);
    });

    it('should generate password with only symbols', () => {
      const password = generatePassword({
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: true,
      });
      expect(password).toMatch(/^[^a-zA-Z0-9]+$/);
    });

    it('should exclude similar characters when specified', () => {
      const password = generatePassword({
        excludeSimilarCharacters: true,
        length: 20,
      });
      
      expect(password).not.toMatch(/[il1Lo0O]/);
    });

    it('should exclude specified characters', () => {
      const exclude = 'abc123';
      const password = generatePassword({ exclude });
      expect(password).not.toMatch(/[abc123]/);
    });

    it('should throw error for invalid length', () => {
      expect(() => generatePassword({ length: 0 })).toThrow(
        'Password length must be at least 1 character'
      );
    });

    it('should throw error if all character types are disabled', () => {
      expect(() =>
        generatePassword({
          lowercase: false,
          uppercase: false,
          numbers: false,
          symbols: false,
        })
      ).toThrow('At least one character type must be selected');
    });
  });

  describe('generateMultiplePasswords', () => {
    it('should generate the specified number of passwords', () => {
      const count = 5;
      const passwords = generateMultiplePasswords(count);
      expect(passwords).toHaveLength(count);
      const uniquePasswords = new Set(passwords);
      expect(uniquePasswords.size).toBe(count);
    });

    it('should throw error for invalid count', () => {
      expect(() => generateMultiplePasswords(0)).toThrow(
        'Count must be at least 1'
      );
    });
  });
});
