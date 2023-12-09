import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';

export default class DocsCheckboxValidationController extends Controller {
  label = "I'm a beast";
  @tracked changeset = new ImmerChangeset({
    checked: true,
  });

  @action
  onChange(value) {
    this.changeset.set('checked', value);
    this.changeset.save();
    if (!this.changeset.get('checked')) {
      this.changeset.addError({
        message: 'Check to be a beast',
        value: true,
        originalValue: true,
        key: 'checked',
      });
    } else {
      this.changeset.removeError('checked');
    }
  }
}
