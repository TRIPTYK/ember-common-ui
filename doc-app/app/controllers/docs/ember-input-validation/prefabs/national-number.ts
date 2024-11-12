import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';

export default class DocsEmberInputValidationPrefabsNationalNumberController extends Controller {
  @tracked changeset = new ImmerChangeset({
    nationalNumber: '',
  });
}
