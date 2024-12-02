import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';

export default class DocsEmberInputValidationPrefabsNationalNumberController extends Controller {
  changeset = new ImmerChangeset({
    nationalNumber: '',
  });

  changesetWithErrors = new ImmerChangeset({
    nationalNumber: '',
  });

  public constructor(owner: Owner) {
    super(owner);
    this.changesetWithErrors.addError({
      key: 'nationalNumber',
      value: '',
      originalValue: '',

      message: 'This is not a valid national number',
    })
  }
}
