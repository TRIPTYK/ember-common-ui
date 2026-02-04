import { clickable, create, fillable, text, value } from 'ember-cli-page-object';

export default create({
  scope: '[data-test-tpk-forgot-password-form]',
  email: create({
    fillIn: fillable('[data-test-tpk-forgot-password-form-email] [data-test-tpk-email-input]'),
    value: value('[data-test-tpk-forgot-password-form-email] [data-test-tpk-email-input]'),
  }),
  submitButton: create({
    scope: '.tpk-forgot-password-form-button',
    click: clickable(),
    text: text(),
  }),
});
