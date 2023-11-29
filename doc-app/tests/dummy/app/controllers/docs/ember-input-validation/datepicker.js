import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';

export default class DocsDatepickerValidationController extends Controller {
  label = 'No date, unvalidatable';
  @tracked changeset = new ImmerChangeset({
    date: new Date(),
  });

  @action
  onChange(value) {
    this.changeset.set('date', value);
    this.changeset.save();
    if (!this.changeset.get('date')) {
      this.changeset.addError({
        message: 'To be or not to be, that is the question!',
        value: '',
        originalValue: '',
        key: 'date',
      });
    } else {
      this.changeset.removeError('date');
    }
  }
}
