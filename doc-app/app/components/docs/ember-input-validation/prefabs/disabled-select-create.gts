import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectCreatePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-create';
import { action } from '@ember/object';

export default class DisabledSelectCreateExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: {
      label: 'ember-power-select',
      value: 'ember-power-select',
      toString() {
        return `${this.label}`;
      },
    },
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
      @label="Disabled Select Create"
      @options={{this.options}}
      @changeset={{this.changeset}}
      @validationField="disabled"
      @onCreate={{this.onCreate}}
      @disabled={{true}}
    />
  </template>
}
