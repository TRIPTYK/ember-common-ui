import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsInputController extends Controller {
  @tracked changeset = new ImmerChangeset({
    something: '',
    disabled: 'text',
  });

  @tracked changesetWithErrors = new ImmerChangeset({
    something: '',
  });

  constructor(owner: Owner) {
    super(owner);
    this.changesetWithErrors.addError({
      message: 'This is an error message',
      value: '',
      originalValue: '',
      key: 'something',
    });
  }
}
