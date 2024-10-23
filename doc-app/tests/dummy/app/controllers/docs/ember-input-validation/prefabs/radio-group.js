import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';

export default class DocsEmberInputValidationPrefabsRadioGroupController extends Controller {
  @tracked changeset = new ImmerChangeset({
    radio: undefined,
  });

  @action
  onChange(value) {
    this.changeset.set('radio', value);
    this.changeset.save();
    if (!this.changeset.get('radio')) {
      this.changeset.addError({
        message: 'Select a radio',
        value: true,
        originalValue: true,
        key: 'radio',
      });
    } else {
      this.changeset.removeError('radio');
    }
  }
}
