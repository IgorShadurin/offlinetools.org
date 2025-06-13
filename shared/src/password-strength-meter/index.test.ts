import {
  PasswordStrength,
  analyzePassword,
  getStrengthColor,
  getStrengthLabel,
  type PasswordAnalysis,
} from './index';

describe('analyzePassword', () => {
  it('handles empty password', () => {
    const result = analyzePassword('');
    expect(result.strength).toBe(PasswordStrength.VERY_WEAK);
    expect(result.score).toBe(0);
    expect(result.feedback).toContain('Password is required');
    expect(result.criteria.length).toBe(false);
  });

  it('identifies very weak passwords', () => {
    const result = analyzePassword('123');
    expect(result.strength).toBe(PasswordStrength.VERY_WEAK);
    expect(result.score).toBeLessThan(20);
    expect(result.criteria.length).toBe(false);
  });

  it('identifies weak passwords', () => {
    const result = analyzePassword('password');
    expect(result.strength).toBe(PasswordStrength.WEAK);
    expect(result.score).toBeGreaterThanOrEqual(20);
    expect(result.score).toBeLessThan(40);
    expect(result.criteria.notCommon).toBe(false);
  });

  it('identifies fair passwords', () => {
    const result = analyzePassword('Password1');
    expect(result.strength).toBe(PasswordStrength.FAIR);
    expect(result.score).toBeGreaterThanOrEqual(40);
    expect(result.score).toBeLessThan(60);
    expect(result.criteria.length).toBe(true);
  });

  it('identifies good passwords', () => {
    const result = analyzePassword('MyPassword123');
    expect(result.strength).toBe(PasswordStrength.GOOD);
    expect(result.score).toBeGreaterThanOrEqual(60);
    expect(result.score).toBeLessThan(80);
    expect(result.criteria.length).toBe(true);
    expect(result.criteria.hasLowercase).toBe(true);
    expect(result.criteria.hasUppercase).toBe(true);
    expect(result.criteria.hasNumbers).toBe(true);
  });

  it('identifies strong passwords', () => {
    const result = analyzePassword('MyStr0ng!P@ssw0rd');
    expect(result.strength).toBe(PasswordStrength.STRONG);
    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.criteria.length).toBe(true);
    expect(result.criteria.hasLowercase).toBe(true);
    expect(result.criteria.hasUppercase).toBe(true);
    expect(result.criteria.hasNumbers).toBe(true);
    expect(result.criteria.hasSymbols).toBe(true);
    expect(result.criteria.notCommon).toBe(true);
  });

  it('checks password length criteria', () => {
    const shortResult = analyzePassword('Abc1!');
    expect(shortResult.criteria.length).toBe(false);
    expect(shortResult.feedback).toContain('Use at least 8 characters');

    const longResult = analyzePassword('Abc12345!');
    expect(longResult.criteria.length).toBe(true);
  });

  it('checks character variety criteria', () => {
    const result = analyzePassword('abcdefgh');
    expect(result.criteria.hasLowercase).toBe(true);
    expect(result.criteria.hasUppercase).toBe(false);
    expect(result.criteria.hasNumbers).toBe(false);
    expect(result.criteria.hasSymbols).toBe(false);
    expect(result.feedback).toContain('Include uppercase letters (A-Z)');
    expect(result.feedback).toContain('Include numbers (0-9)');
    expect(result.feedback).toContain('Include special characters (!@#$%^&*)');
  });

  it('detects common passwords', () => {
    const commonPasswords = ['password', '123456', 'qwerty', 'admin'];
    
    commonPasswords.forEach(pwd => {
      const result = analyzePassword(pwd);
      expect(result.criteria.notCommon).toBe(false);
      expect(result.feedback).toContain('Avoid common passwords');
    });
  });

  it('gives bonus for longer passwords', () => {
    const shortPassword = analyzePassword('MyPass1!');
    const mediumPassword = analyzePassword('MyPassword1!');
    const longPassword = analyzePassword('MyVeryLongPassword1!');

    expect(mediumPassword.score).toBeGreaterThan(shortPassword.score);
    expect(longPassword.score).toBeGreaterThanOrEqual(mediumPassword.score);
  });

  it('caps score at 100', () => {
    const result = analyzePassword('ThisIsAnExtremelyLongAndComplexPassword123!@#$%^&*()');
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('provides positive feedback for strong passwords', () => {
    const result = analyzePassword('MyStr0ng!P@ssw0rd');
    expect(result.feedback).toContain('Great! Your password meets security requirements');
  });
});

describe('getStrengthColor', () => {
  it('returns correct colors for each strength level', () => {
    expect(getStrengthColor(PasswordStrength.VERY_WEAK)).toBe('#ef4444');
    expect(getStrengthColor(PasswordStrength.WEAK)).toBe('#f97316');
    expect(getStrengthColor(PasswordStrength.FAIR)).toBe('#eab308');
    expect(getStrengthColor(PasswordStrength.GOOD)).toBe('#84cc16');
    expect(getStrengthColor(PasswordStrength.STRONG)).toBe('#22c55e');
  });
});

describe('getStrengthLabel', () => {
  it('returns correct labels for each strength level', () => {
    expect(getStrengthLabel(PasswordStrength.VERY_WEAK)).toBe('Very Weak');
    expect(getStrengthLabel(PasswordStrength.WEAK)).toBe('Weak');
    expect(getStrengthLabel(PasswordStrength.FAIR)).toBe('Fair');
    expect(getStrengthLabel(PasswordStrength.GOOD)).toBe('Good');
    expect(getStrengthLabel(PasswordStrength.STRONG)).toBe('Strong');
  });
});
