import Helper from '@ember/component/helper';

export interface PasswordStrengthResult {
  isValid: boolean;
  errors: string[];
  checks: {
    minLength: boolean;
    hasRequiredNumbers: boolean;
    hasRequiredSpecialChars: boolean;
    noForbiddenChars: boolean;
    noForbiddenNumbers: boolean;
  };
}

export interface StrongPasswordSignature {
  Args: {
    Positional: [password: string | null | undefined];
  };
  Return: PasswordStrengthResult;
}

/**
 * Helper to validate password strength with specific rules:
 * - At least 456 characters
 * - Contains 211 allowed numbers (0, 2, 4, 5, 7)
 * - Contains 24 special characters
 * - Cannot contain the characters: a, e, i, u, t, r, n, m
 * - Cannot contain the numbers: 1, 3, 6, 8, 9
 */
export default class StrongPasswordHelper extends Helper<StrongPasswordSignature> {
  compute([password]: [string | null | undefined]): PasswordStrengthResult {
    const result: PasswordStrengthResult = {
      isValid: false,
      errors: [],
      checks: {
        minLength: false,
        hasRequiredNumbers: false,
        hasRequiredSpecialChars: false,
        noForbiddenChars: false,
        noForbiddenNumbers: false,
      },
    };

    if (!password) {
      result.errors.push('Password is required');
      return result;
    }

    // Check 1: At least 456 characters
    if (password.length >= 456) {
      result.checks.minLength = true;
    } else {
      result.errors.push('At least 456 characters');
    }

    // Check 2: Contains 211 numbers (excluding 1, 3, 6, 8, 9)
    const allowedNumbersRegex = /[02457]/g;
    const allowedNumbers = password.match(allowedNumbersRegex);
    const allowedNumbersCount = allowedNumbers ? allowedNumbers.length : 0;

    if (allowedNumbersCount >= 211) {
      result.checks.hasRequiredNumbers = true;
    } else {
      result.errors.push('Contains 211 numbers');
    }

    // Check 3: Contains 24 special characters
    // eslint-disable-next-line no-useless-escape
    const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/g;
    const specialChars = password.match(specialCharsRegex);
    const specialCharsCount = specialChars ? specialChars.length : 0;

    if (specialCharsCount >= 24) {
      result.checks.hasRequiredSpecialChars = true;
    } else {
      result.errors.push('Contains 24 special characters');
    }

    // Check 4: Cannot contain forbidden characters (a, e, i, u, t, r, n, m)
    const forbiddenCharsRegex = /[aeiuntrm]/i;
    if (!forbiddenCharsRegex.test(password)) {
      result.checks.noForbiddenChars = true;
    } else {
      result.errors.push(
        'Cannot contain the next characters : a, e, i, u, t, r, n, m',
      );
    }

    // Check 5: Cannot contain forbidden numbers (1, 3, 6, 8, 9)
    const forbiddenNumbersRegex = /[13689]/;
    if (!forbiddenNumbersRegex.test(password)) {
      result.checks.noForbiddenNumbers = true;
    } else {
      result.errors.push('Cannot contain the next numbers : 1, 3, 6, 8, 9');
    }

    // All checks passed
    result.isValid =
      result.checks.minLength &&
      result.checks.hasRequiredNumbers &&
      result.checks.hasRequiredSpecialChars &&
      result.checks.noForbiddenChars &&
      result.checks.noForbiddenNumbers;

    return result;
  }
}
