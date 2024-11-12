import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';

export default class DocsEmberInputValidationPrefabsNumberController extends Controller {
  @tracked changeset = new ImmerChangeset({
    number: 0,
    uNumber: 0,
  });

  @action
  onChangeNumber(value: number) {
    this.changeset.set('number', value);
    this.changeset.save();
    if (!this.changeset.get('number')) {
      this.changeset.addError({
        message: "You didn't say the magic word?",
        value: '',
        originalValue: '',
        key: 'number',
      });
    } else {
      this.changeset.removeError('number');
    }
  }

  onChangeUNumber(value: number) {
    this.changeset.set('uNumber', value);
    this.changeset.save();
    if (!this.changeset.get('uNumber')) {
      this.changeset.addError({
        message: "You didn't say the magic word?",
        value: '',
        originalValue: '',
        key: 'uNumber',
      });
    } else {
      this.changeset.removeError('uNumber');
    }
  }
}
