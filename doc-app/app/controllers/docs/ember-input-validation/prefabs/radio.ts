import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { action } from '@ember/object';
import type Owner from '@ember/owner';

export default class DocsEmberInputValidationPrefabsRadioController extends Controller {
  changeset = new ImmerChangeset({
    radio: '',
  });

  changesetWithErrors = new ImmerChangeset({
    radio: '',
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
  onChange(e: Event) {
    console.log('onChange', e);
  }
}
