import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';

export default class DocsEmberInputValidationPrefabsTimepickerController extends Controller {
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
    time: null,
    disabled: null,
    error: null,
  });
}
