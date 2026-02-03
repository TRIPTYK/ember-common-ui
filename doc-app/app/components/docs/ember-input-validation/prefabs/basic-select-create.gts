import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectCreatePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-create';
import { action } from '@ember/object';

export default class BasicSelectCreateExample extends Component {
  @tracked changeset = new ImmerChangeset({
    addon: null,
  });

  options = [
    {
      label: 'ember-power-select',
      value: 'ember-power-select',
      toString() {
        return `${this.label}`;
      },
    },
    {
      label: 'ember-concurrency',
      value: 'ember-concurrency',
      toString() {
        return `${this.label}`;
      },
    },
  ];

  @action
  onCreate(selection: unknown) {
    const value = selection as string;
    const newOption = {
      label: value,
      value: value.toLowerCase().replace(/\s+/g, '-'),
      toString() {
        return `${this.label}`;
      },
    };
    this.options = [...this.options, newOption];
  }

  <template>
    <TpkSelectCreatePrefab
      @label="Select or add your Ember Addon"
      @options={{this.options}}
      @changeset={{this.changeset}}
      @validationField="addon"
      @onCreate={{this.onCreate}}
    />
  </template>
}
