import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import type Owner from '@ember/owner';

export default class DocsEmberInputValidationPrefabsPasswordController extends Controller {
  @tracked changeset = new ImmerChangeset({
    name: '',
  });

  @tracked changesetWithErrors = new ImmerChangeset({
    name: '',
  });

  public constructor(owner: Owner) {
    super(owner);

    this.changesetWithErrors.addError({
      value: '0',
      originalValue: 0,
      key: 'name',
      message: 'This is an error message',
    });
  }
}
