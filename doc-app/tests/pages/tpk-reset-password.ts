import {
  clickable,
  create,
  fillable,
  text,
  value,
} from 'ember-cli-page-object';

export default create({
  scope: '[data-test-tpk-reset-password-form]',
  password: create({
    fillIn: fillable(
      '[data-test-tpk-reset-password-form-password] [data-test-tpk-password-input]'
    ),
    value: value(
      '[data-test-tpk-reset-password-form-password] [data-test-tpk-password-input]'
    ),
  }),
  confirmPassword: create({
    fillIn: fillable(
      '[data-test-tpk-reset-password-form-confirm-password] [data-test-tpk-password-input]'
    ),
    value: value(
      '[data-test-tpk-reset-password-form-confirm-password] [data-test-tpk-password-input]'
    ),
  }),
  submitButton: create({
    scope: '.tpk-reset-password-form-button',
    click: clickable(),
    text: text(),
  }),
});
