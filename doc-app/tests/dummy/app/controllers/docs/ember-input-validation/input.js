import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';

export default class DocsInputValidationController extends Controller {
  label = 'LastName';
  @tracked changeset = new ImmerChangeset({
    last_name: '',
  });

  @action
  onChange(value) {
    this.changeset.set('last_name', value);
    this.changeset.save();
    if (this.changeset.get('last_name') === '') {
      this.changeset.addError({
        message: 'You didnt have a last name?',
        value: '',
        originalValue: '',
        key: 'last_name',
      });
    } else {
      this.changeset.removeError('last_name');
    }
  }
}
