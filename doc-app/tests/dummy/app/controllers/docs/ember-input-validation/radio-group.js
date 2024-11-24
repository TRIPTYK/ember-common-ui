import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { ImmerChangeset } from 'ember-immer-changeset';

export default class DocsRadioGroupValidationController extends Controller {
  @tracked changeset = new ImmerChangeset({
    radio: undefined,
  });

  @action
  onChange(value) {
    this.changeset.set('radio', value);
    this.changeset.save();

  }
}
