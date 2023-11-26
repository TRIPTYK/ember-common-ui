import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';

export default class DocsInputValidationController extends Controller {
  label = 'Clear it';
  @tracked changeset = new ImmerChangeset({
    delete_text: 'Delete my text',
  });

  @action
  onChange(value) {
    this.changeset.set('delete_text', value);
    this.changeset.save();
    if (this.changeset.get('delete_text') === '') {
      this.changeset.addError({
        message: 'Why did you do that? Why??',
        value: '',
        originalValue: '',
        key: 'delete_text',
      });
    } else {
      this.changeset.removeError('delete_text');
    }
  }
}
