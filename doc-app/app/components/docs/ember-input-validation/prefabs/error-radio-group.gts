import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkRadioGroupPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio-group';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorRadioGroupExample extends Component {
  @tracked changeset = new ImmerChangeset({
    radio: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    if (!value) {
      this.changeset.addError({
        message: 'should be a string value',
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
        message: 'A selection is mandatory',
        value: 'err',
        originalValue: '',
        key: 'radio',
      });
    }, 0);
  }

  <template>
    <TpkRadioGroupPrefab
      @groupLabel="Radio Group with Error"
      @changeset={{this.changeset}}
      @validationField="radio"
      @onChange={{this.onChange}}
      as |Radio|
    >
      <Radio @value="applati" @label="Applati" />
      <Radio @value="creux" @label="Creux" />
    </TpkRadioGroupPrefab>
  </template>
}
