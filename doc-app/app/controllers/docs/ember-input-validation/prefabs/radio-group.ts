import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';
import type Owner from '@ember/owner';

export default class DocsEmberInputValidationPrefabsRadioGroupController extends Controller {
  changeset = new ImmerChangeset({
    radio: undefined,
  });

  changesetWithErrors = new ImmerChangeset({
    radio: undefined,
  });

  public constructor(owner: Owner) {
    super(owner);
    this.changesetWithErrors.addError({
      key: 'radio',
      message: 'Invalid value',
      value: 'Invalid value',
      originalValue : ''
    });
  }

  @action
  onChange() {

  }
}
