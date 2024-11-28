import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsCurrencyController extends Controller {
  @tracked changeset = new ImmerChangeset({
    value: undefined,
    disabled: 0.03,
    error: 34020.03,
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
