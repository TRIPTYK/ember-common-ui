import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsIBANController extends Controller {
  changeset = new ImmerChangeset({
    bic: '',
    disabled: 'UKIO0000',
  });

  changesetWithErrors = new ImmerChangeset({
    bic: 'UKIO0000',
  });

  constructor(owner: Owner) {
    super(owner);
    this.changesetWithErrors.addError({
      message: 'This bic is invalid',
      value: '',
      originalValue: '',
      key: 'bic',
    });
  }
}
