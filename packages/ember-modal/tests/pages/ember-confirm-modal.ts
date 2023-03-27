import { clickable, create, text } from 'ember-cli-page-object';

export const confirmModalObject = create({
  scope: '[data-test-confirm-modal]',
  title: text('[data-test-tpk-modal-title]'),
  confirm: create({
    scope: '[data-test-confirm-modal-confirm]',
    click: clickable(''),
  }),
  cancel: create({
    scope: '[data-test-confirm-modal-cancel]',
    click: clickable(''),
  }),
});
