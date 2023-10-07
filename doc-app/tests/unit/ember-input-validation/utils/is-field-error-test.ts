import { module, test } from 'qunit';
import { isFieldError } from '@triptyk/ember-input-validation/utils/is-field-error';
import { setupTest } from 'ember-qunit';

module('Unit | Utils | is-field-error', function (hooks) {
  setupTest(hooks);

  test('isFieldError returns false when validation field is a prefix of the error key', async function (assert) {
    assert.false(isFieldError('subsidiary', 'subsidiaryFormationBillings'));
  });

  test('isFieldError returns true when validation field is an exact match of the error key', async function (assert) {
    assert.true(isFieldError('subsidiary', 'subsidiary'));
  });

  test('isFieldError returns true when validation field is a prefix of a nested error key', async function (assert) {
    assert.true(isFieldError('subsidiary', 'subsidiary.1.truc'));
  });

  test('isFieldError returns true when validation field is a prefix of a deeply nested error key', async function (assert) {
    assert.true(isFieldError('subsidiary.truc', 'subsidiary.truc.a.b.c'));
  });

  test('isFieldError returns false when validation field is not a prefix of the error key', async function (assert) {
    assert.false(isFieldError('subsidiary.truc', 'subsidiary.trucfle'));
  });

  test('isFieldError returns true when validation field is a prefix of an array index in the error key', async function (assert) {
    assert.true(
      isFieldError('subsidiary.truc.0', 'subsidiary.truc.0.pastname'),
    );
  });
});
