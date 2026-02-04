import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select';

export default class DisabledSelectExample extends Component {
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

  <template>
    <TpkSelectPrefab
      @label="Disabled Select"
      @options={{this.options}}
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
