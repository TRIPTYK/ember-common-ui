import Controller from '@ember/controller';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsEmailController extends Controller {
  changeset = new ImmerChangeset({
    email: undefined,
    disabled: 'email@disabled.true',
    error: 'hyperloop.com',
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
