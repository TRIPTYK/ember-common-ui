import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsDatepickerRangeController extends Controller {
  changeset = new ImmerChangeset({
    range: undefined,
    disabled: undefined,
    error: undefined,
  });

  constructor(owner: Owner) {
    super(owner);
    this.changeset.addError({
      message: 'This is an error message',
      value: '',
      originalValue: '',
      key: 'error',
    });
  }
}
