/**
 * Password strength levels
 */
export enum PasswordStrength {
  VERY_WEAK = 'very-weak',
  WEAK = 'weak',
  FAIR = 'fair',
  GOOD = 'good',
  STRONG = 'strong'
}

/**
 * Password analysis result
 */
export interface PasswordAnalysis {
  strength: PasswordStrength;
  score: number;
  feedback: string[];
  criteria: {
    length: boolean;
    hasLowercase: boolean;
    hasUppercase: boolean;
    hasNumbers: boolean;
    hasSymbols: boolean;
    notCommon: boolean;
  };
}

/**
 * Common weak passwords to check against
 */
const COMMON_PASSWORDS = new Set([
  'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'password1',
  'qwerty123', 'welcome123', 'admin123', '12345678', '123123', 'password!',
  'Password1', 'Password123', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
  'iloveyou', 'princess', 'rockyou', 'football', 'baseball', 'dragon',
  'master', 'trustno1', 'superman', 'batman', 'jordan', 'harley',
  'robert', 'matthew', 'daniel', 'andrew', 'joshua', 'anthony',
  'william', 'david', 'richard', 'charles', 'joseph', 'thomas',
  'christopher', 'daniel', 'paul', 'mark', 'donald', 'george',
  'kenneth', 'steven', 'edward', 'brian', 'ronald', 'anthony'
]);

/**
 * Analyze password strength based on OWASP guidelines
 * @param password - The password to analyze
 * @returns Password analysis result
 */
export function analyzePassword(password: string): PasswordAnalysis {
  if (!password) {
    return {
      strength: PasswordStrength.VERY_WEAK,
      score: 0,
      feedback: ['Password is required'],
      criteria: {
        length: false,
        hasLowercase: false,
        hasUppercase: false,
        hasNumbers: false,
        hasSymbols: false,
        notCommon: false,
      }
    };
  }

  const criteria = {
    length: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSymbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
    notCommon: !COMMON_PASSWORDS.has(password.toLowerCase())
  };

  let score = 0;
  const feedback: string[] = [];

  if (password.length < 4) {
    score -= 10;
  }

  if (criteria.length) {
    score += 20;
  } else {
    feedback.push('Use at least 8 characters');
  }

  if (criteria.hasLowercase) {
    score += 10;
  } else {
    feedback.push('Include lowercase letters (a-z)');
  }

  if (criteria.hasUppercase) {
    score += 10;
  } else {
    feedback.push('Include uppercase letters (A-Z)');
  }

  if (criteria.hasNumbers) {
    score += 10;
  } else {
    feedback.push('Include numbers (0-9)');
  }

  if (criteria.hasSymbols) {
    score += 15;
  } else {
    feedback.push('Include special characters (!@#$%^&*)');
  }

  if (criteria.notCommon) {
    score += 15;
  } else {
    feedback.push('Avoid common passwords');
  }

  if (password.length >= 12) {
    score += 5;
  } else if (password.length >= 10) {
    score += 3;
  }

  score = Math.min(100, Math.max(0, score));

  let strength: PasswordStrength;
  if (score < 20) {
    strength = PasswordStrength.VERY_WEAK;
  } else if (score < 40) {
    strength = PasswordStrength.WEAK;
  } else if (score < 60) {
    strength = PasswordStrength.FAIR;
  } else if (score < 80) {
    strength = PasswordStrength.GOOD;
  } else {
    strength = PasswordStrength.STRONG;
  }

  if (feedback.length === 0) {
    feedback.push('Great! Your password meets security requirements');
  }

  return {
    strength,
    score,
    feedback,
    criteria
  };
}

/**
 * Get strength color for UI display
 * @param strength - Password strength level
 * @returns CSS color class or hex color
 */
export function getStrengthColor(strength: PasswordStrength): string {
  switch (strength) {
    case PasswordStrength.VERY_WEAK:
      return '#ef4444';
    case PasswordStrength.WEAK:
      return '#f97316';
    case PasswordStrength.FAIR:
      return '#eab308';
    case PasswordStrength.GOOD:
      return '#84cc16';
    case PasswordStrength.STRONG:
      return '#22c55e';
    default:
      return '#6b7280';
  }
}

/**
 * Get strength label for display
 * @param strength - Password strength level
 * @returns Human-readable strength label
 */
export function getStrengthLabel(strength: PasswordStrength): string {
  switch (strength) {
    case PasswordStrength.VERY_WEAK:
      return 'Very Weak';
    case PasswordStrength.WEAK:
      return 'Weak';
    case PasswordStrength.FAIR:
      return 'Fair';
    case PasswordStrength.GOOD:
      return 'Good';
    case PasswordStrength.STRONG:
      return 'Strong';
    default:
      return 'Unknown';
  }
}
