import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';

function configureDisplay(obj, format) {
  return {
    ...obj,
    toString() {
      return format(this);
    },
  };
}

export default class DocsEmberInputValidationPrefabsPasswordController extends Controller {
  @tracked changeset = new ImmerChangeset({
    value: '',
  });

  @tracked options = [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
  ].map((o) => configureDisplay(o, (option) => option.label));
}
