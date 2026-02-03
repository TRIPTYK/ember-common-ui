import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkSelectCreatePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-select-create';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorSelectCreateExample extends Component {
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

  @action
  onChange(value: unknown) {
    if (!value) {
      this.changeset.addError({
        message: 'Please select or create an addon',
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
        message: 'Please select or create an addon',
        value: 'err',
        originalValue: '',
        key: 'addon',
      });
    }, 0);
  }

  <template>
    <TpkSelectCreatePrefab
      @label="Select Create with Error"
      @options={{this.options}}
      @changeset={{this.changeset}}
      @validationField="addon"
      @onCreate={{this.onCreate}}
      @onChange={{this.onChange}}
    />
  </template>
}
