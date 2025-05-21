import generator from 'generate-password';

/**
 * Options for password generation
 */
export interface PasswordGeneratorOptions {
  /** Length of the password */
  length: number;
  /** Include numbers in the password */
  numbers: boolean;
  /** Include symbols in the password */
  symbols: boolean;
  /** Include lowercase characters in the password */
  lowercase: boolean;
  /** Include uppercase characters in the password */
  uppercase: boolean;
  /** Exclude similar characters like 'i' and 'l' */
  excludeSimilarCharacters: boolean;
  /** Specific characters to exclude from the password */
  exclude: string;
  /** Require at least one character from each selected character pool */
  strict: boolean;
}

/**
 * Default password generator options
 */
export const DEFAULT_PASSWORD_OPTIONS: PasswordGeneratorOptions = {
  length: 12,
  numbers: true,
  symbols: true,
  lowercase: true,
  uppercase: true,
  excludeSimilarCharacters: false,
  exclude: '',
  strict: true,
};

/**
 * Generate a password with the specified options
 * @param options - Password generator options
 * @returns The generated password
 */
export function generatePassword(
  options: Partial<PasswordGeneratorOptions> = {}
): string {
  try {
    const mergedOptions: PasswordGeneratorOptions = {
      ...DEFAULT_PASSWORD_OPTIONS,
      ...options,
    };
    
    if (mergedOptions.length < 1) {
      throw new Error('Password length must be at least 1 character');
    }
    
    if (
      !mergedOptions.numbers &&
      !mergedOptions.symbols &&
      !mergedOptions.lowercase &&
      !mergedOptions.uppercase
    ) {
      throw new Error('At least one character type must be selected');
    }
    
    return generator.generate(mergedOptions);
  } catch (error) {
    throw new Error(`Password generation failed: ${(error as Error).message}`);
  }
}

/**
 * Generate multiple passwords with the same options
 * @param count - Number of passwords to generate
 * @param options - Password generator options
 * @returns Array of generated passwords
 */
export function generateMultiplePasswords(
  count: number,
  options: Partial<PasswordGeneratorOptions> = {}
): string[] {
  try {
    if (count < 1) {
      throw new Error('Count must be at least 1');
    }
    
    const mergedOptions: PasswordGeneratorOptions = {
      ...DEFAULT_PASSWORD_OPTIONS,
      ...options,
    };
    
    return generator.generateMultiple(count, mergedOptions);
  } catch (error) {
    throw new Error(`Multiple password generation failed: ${(error as Error).message}`);
  }
}
