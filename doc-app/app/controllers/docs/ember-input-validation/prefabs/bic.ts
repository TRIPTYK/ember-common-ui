import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsIBANController extends Controller {
  @tracked changeset = new ImmerChangeset({
    bic: '',
  });

  @tracked changesetWithErrors = new ImmerChangeset({
    bic: '',
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
