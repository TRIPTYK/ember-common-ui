import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select';

export default class BasicSelectExample extends Component {
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
    {
      label: 'ember-composable-helpers',
      value: 'ember-composable-helpers',
      toString() {
        return `${this.label}`;
      },
    },
  ];

  <template>
    <TpkSelectPrefab
      @label="Select your Ember Addon"
      @options={{this.options}}
      @changeset={{this.changeset}}
      @validationField="addon"
    />
  </template>
}
