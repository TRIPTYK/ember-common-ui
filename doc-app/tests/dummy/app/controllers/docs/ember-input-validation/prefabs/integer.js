import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';

export default class DocsEmberInputValidationPrefabsIntegerController extends Controller {
  @tracked changeset = new ImmerChangeset({
    integer: 0,
    uInteger: 0,
  });

  @action
  onChangeInteger(value) {
    this.changeset.set('integer', value);
    this.changeset.save();
    if (!this.changeset.get('integer')) {
      this.changeset.addError({
        message: "You didn't say the magic word?",
        value: '',
        originalValue: '',
        key: 'integer',
      });
    } else {
      this.changeset.removeError('integer');
    }
  }

  onChangeUInteger(value) {
    this.changeset.set('uInteger', value);
    this.changeset.save();
    if (!this.changeset.get('uInteger')) {
      this.changeset.addError({
        message: "You didn't say the magic word?",
        value: '',
        originalValue: '',
        key: 'uInteger',
      });
    } else {
      this.changeset.removeError('uInteger');
    }
  }
}