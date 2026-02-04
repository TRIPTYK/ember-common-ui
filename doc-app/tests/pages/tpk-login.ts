import { clickable, create, fillable, text, value } from 'ember-cli-page-object';

export default create({
  scope: '[data-test-tpk-login-form]',
  email: create({
    fillIn: fillable('[data-test-tpk-login-form-email] [data-test-tpk-email-input]'),
    value: value('[data-test-tpk-login-form-email] [data-test-tpk-email-input]'),
  }),
  password: create({
    fillIn: fillable('[data-test-tpk-login-form-password] [data-test-tpk-password-input]'),
    value: value('[data-test-tpk-login-form-password] [data-test-tpk-password-input]'),
  }),
  submitButton: create({
    scope: '.tpk-login-form-button',
    click: clickable(),
    text: text(),
  }),
});
