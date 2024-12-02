import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsNumberController extends Controller {
  changeset = new ImmerChangeset({
    number: 0,
    uNumber: 0,
  });

  changesetWithErrors = new ImmerChangeset({
    number: 0,
  });

  public constructor(owner: Owner) {
    super(owner);

    this.changesetWithErrors.addError({
      value: '0',
      originalValue: 0,
      key: 'number',
      message: 'This is an error message',
    });
  }

  @action
  onChangeNumber(value: number) {
    this.changeset.set('number', value);
  }

  onChangeUNumber(value: number) {
    this.changeset.set('uNumber', value);
  }
}
