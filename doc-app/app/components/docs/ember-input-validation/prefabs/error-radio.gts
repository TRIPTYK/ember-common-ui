import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkRadioPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorRadioExample extends Component {
  @tracked changeset = new ImmerChangeset({
    radio: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    if (!value) {
      this.changeset.addError({
        message: 'Please select an option',
        value: 'err',
        originalValue: '',
        key: 'radio',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Please select an option',
        value: 'err',
        originalValue: '',
        key: 'radio',
      });
    }, 0);
  }

  <template>
    <TpkRadioPrefab
      @changeset={{this.changeset}}
      @validationField="radio"
      @label="Radio with Error"
      @value="selected one"
      @onChange={{this.onChange}}
    />
  </template>
}
