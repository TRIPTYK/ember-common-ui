import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';

export default class DocsEmberInputValidationPrefabsTextareaController extends Controller {
  changeset = new ImmerChangeset({
    ember: '',
  });

  changesetWithErrors = new ImmerChangeset({
    ember: '',
  });

  public constructor(owner: Owner) {
    super(owner);

    this.changesetWithErrors.addError({
      key: 'ember',
      message: 'required',
      value: '',
      originalValue: '',
    })
  }
}
