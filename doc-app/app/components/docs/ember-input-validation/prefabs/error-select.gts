import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorSelectExample extends Component {
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

  @action
  onChange(value: unknown) {
    if (!value) {
      this.changeset.addError({
        message: 'Please select an addon',
        value: 'err',
        originalValue: '',
        key: 'addon',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Please select an addon',
        value: 'err',
        originalValue: '',
        key: 'addon',
      });
    }, 0);
  }

  <template>
    <TpkSelectPrefab
      @label="Select with Error"
      @options={{this.options}}
      @changeset={{this.changeset}}
      @validationField="addon"
      @onChange={{this.onChange}}
    />
  </template>
}
