import Controller from '@ember/controller';
import { ImmerChangeset } from 'ember-immer-changeset';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const options = [
  {
    value: 'pizza',
    label: 'Pizza',
    toString() {
      return `${this.label}`;
    },
  },
  {
    value: 'burger',
    label: 'Burger',
    toString() {
      return `${this.label}`;
    },
  },
  {
    value: 'surimi',
    label: 'Surimi',
    toString() {
      return `${this.label}`;
    },
  },
  {
    value: 'sushi',
    label: 'Sushi',
    toString() {
      return `${this.label}`;
    },
  },
];

export default class DocsEmberInputValidationPrefabsSelectSearchController extends Controller {
  @tracked changeset = new ImmerChangeset({
    fastfood: '',
  });
  @tracked options = options;

  @action
  onChange(value) {
    this.changeset.set('fastfood', value);
  }
  @action
  search(v) {
    this.options = options.filter((o) => o.value.includes(v.toLowerCase()));
  }
}
