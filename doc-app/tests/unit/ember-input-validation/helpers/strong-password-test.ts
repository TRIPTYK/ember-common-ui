import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import StrongPasswordHelper from '@triptyk/ember-input-validation/helpers/strong-password';

module('Unit | Helper | strong-password', function (hooks) {
  setupTest(hooks);

  test('returns invalid result for empty password', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    const result = helper.compute([null]);

    assert.false(result.isValid);
    assert.strictEqual(result.errors.length, 1);
    assert.strictEqual(result.errors[0], 'Password is required');
  });

  test('returns invalid result for short password', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    const result = helper.compute(['short']);

    assert.false(result.isValid);
    assert.false(result.checks.minLength);
    assert.true(result.errors.includes('At least 456 characters'));
  });

  test('validates minimum length requirement', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    // Create a password with exactly 456 characters
    const password = 'x'.repeat(456);
    const result = helper.compute([password]);

    assert.true(result.checks.minLength);
  });

  test('counts allowed numbers correctly (excluding 1, 3, 6, 8, 9)', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    // Create a password with exactly 211 allowed numbers (0, 2, 4, 5, 7)
    const allowedNumbers = '0'.repeat(211);
    const padding = 'x'.repeat(456 - 211); // Fill to min length
    const password = allowedNumbers + padding;
    const result = helper.compute([password]);

    assert.true(result.checks.hasRequiredNumbers);
  });

  test('rejects forbidden numbers (1, 3, 6, 8, 9)', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    const password = 'x'.repeat(450) + '123456';
    const result = helper.compute([password]);

    assert.false(result.checks.noForbiddenNumbers);
    assert.true(
      result.errors.includes('Cannot contain the next numbers : 1, 3, 6, 8, 9'),
    );
  });

  test('validates special characters requirement', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    // Create a password with exactly 24 special characters
    const specialChars = '!@#$%^&*()_+-=[]{};\'"\\|,.<>/?~`'.substring(0, 24);
    const padding = 'x'.repeat(456 - 24);
    const password = specialChars + padding;
    const result = helper.compute([password]);

    assert.true(result.checks.hasRequiredSpecialChars);
  });

  test('rejects forbidden characters (a, e, i, u, t, r, n, m)', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    const password = 'x'.repeat(450) + 'banana';
    const result = helper.compute([password]);

    assert.false(result.checks.noForbiddenChars);
    assert.true(
      result.errors.includes(
        'Cannot contain the next characters : a, e, i, u, t, r, n, m',
      ),
    );
  });

  test('rejects forbidden characters case-insensitively', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    const password = 'x'.repeat(450) + 'APPLE';
    const result = helper.compute([password]);

    assert.false(result.checks.noForbiddenChars);
  });

  test('returns valid result for password meeting all requirements', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    // Build a valid password:
    // - 456+ chars
    // - 211+ allowed numbers (0,2,4,5,7)
    // - 24+ special chars
    // - No forbidden chars (a,e,i,u,t,r,n,m)
    // - No forbidden numbers (1,3,6,8,9)
    const allowedNumbers = '0'.repeat(211);
    const specialChars = '!@#$%^&*()_+-=[]{};\'"\\|,.<>/?~`'.substring(0, 24);
    const safeLetters = 'bcdfghjklpqsvwxyz'.repeat(15); // 255 chars, no forbidden letters
    const password = allowedNumbers + specialChars + safeLetters; // Total: 211 + 24 + 255 = 490 chars

    const result = helper.compute([password]);

    assert.true(result.checks.minLength);
    assert.true(result.checks.hasRequiredNumbers);
    assert.true(result.checks.hasRequiredSpecialChars);
    assert.true(result.checks.noForbiddenChars);
    assert.true(result.checks.noForbiddenNumbers);
    assert.true(result.isValid);
    assert.strictEqual(result.errors.length, 0);
  });

  test('provides detailed check results', function (assert) {
    const helper = new StrongPasswordHelper(this.owner);
    const result = helper.compute(['short']);

    assert.ok(result.checks);
    assert.strictEqual(typeof result.checks.minLength, 'boolean');
    assert.strictEqual(typeof result.checks.hasRequiredNumbers, 'boolean');
    assert.strictEqual(typeof result.checks.hasRequiredSpecialChars, 'boolean');
    assert.strictEqual(typeof result.checks.noForbiddenChars, 'boolean');
    assert.strictEqual(typeof result.checks.noForbiddenNumbers, 'boolean');
  });
});
