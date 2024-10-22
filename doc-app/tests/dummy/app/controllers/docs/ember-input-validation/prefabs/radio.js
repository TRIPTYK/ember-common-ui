import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DocsEmberInputValidationPrefabsRadioController extends Controller {
  @tracked changeset = new ImmerChangeset({
    familly: '',
  });
  @tracked famillyOptions = ['Daddy', 'Mommy', 'Baby'];

  @action
  onChange(changeset) {
    console.log('onChange', changeset);
  }
}
