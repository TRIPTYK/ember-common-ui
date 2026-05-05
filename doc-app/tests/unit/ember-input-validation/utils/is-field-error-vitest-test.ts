import { describe, test, expect } from 'vitest';
import { isFieldError } from '@triptyk/ember-input-validation/utils/is-field-error';

describe('Unit | Utils | is-field-error', () => {
  test('isFieldError returns false when validation field is a prefix of the error key', () => {
    expect(isFieldError('subsidiary', 'subsidiaryFormationBillings')).toBe(
      false,
    );
  });

  test('isFieldError returns true when validation field is an exact match of the error key', () => {
    expect(isFieldError('subsidiary', 'subsidiary')).toBe(true);
  });

  test('isFieldError returns true when validation field is a prefix of a nested error key', () => {
    expect(isFieldError('subsidiary', 'subsidiary.1.truc')).toBe(true);
  });

  test('isFieldError returns true when validation field is a prefix of a deeply nested error key', () => {
    expect(isFieldError('subsidiary.truc', 'subsidiary.truc.a.b.c')).toBe(true);
  });

  test('isFieldError returns false when validation field is not a prefix of the error key', () => {
    expect(isFieldError('subsidiary.truc', 'subsidiary.trucfle')).toBe(false);
  });

  test('isFieldError returns true when validation field is a prefix of an array index in the error key', () => {
    expect(
      isFieldError('subsidiary.truc.0', 'subsidiary.truc.0.pastname'),
    ).toBe(true);
  });
});
