import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';

export default class DocsEmberInputValidationPrefabsVATController extends Controller {
  constructor(owner: Owner) {
    super(owner);
    this.changeset.addError({
      message: 'This is an error message',
      value: '',
      originalValue: '',
      key: 'error',
    });
  }

  changeset = new ImmerChangeset({
    vat: '',
    disabled: '',
    error: '',
  });
}
