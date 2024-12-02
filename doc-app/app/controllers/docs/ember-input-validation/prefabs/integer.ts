import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsIntegerController extends Controller {
  changeset = new ImmerChangeset({
    integer: 0,
    uInteger: 0,
  });

  changesetWithErrors = new ImmerChangeset({
    integer: 0,
    uInteger: 0,
  });

  public constructor(owner: Owner) {
    super(owner);
    this.changesetWithErrors.addError({
      message: 'This integer is invalid',
      value: '',
      originalValue: '',
      key: 'integer',
    });
  }

  @action
  onChangeInteger(value: number) {
    this.changeset.set('integer', value);
  }

  @action
  onChangeUInteger(value: number) {
    this.changeset.set('uInteger', value);
  }
}
