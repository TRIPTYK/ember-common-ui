import Controller from '@ember/controller';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';

export default class DocsEmberInputValidationPrefabsEmailController extends Controller {
  label = 'Clear Email';
  @tracked changeset = new ImmerChangeset({
    email: 'hyper@loop.com',
  });

  @action
  onChange(value: string) {
    this.changeset.set('email', value);
    this.changeset.save();
    if (this.changeset.get('email') === '') {
      this.changeset.addError({
        message: 'Take me a email please!',
        value: '',
        originalValue: '',
        key: 'email',
      });
    } else {
      this.changeset.removeError('email');
    }
  }
}
