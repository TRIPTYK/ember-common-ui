import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkRadioGroupPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio-group';

export default class BasicRadioGroupExample extends Component {
  @tracked changeset = new ImmerChangeset({
    radio: '',
  });

  <template>
    <TpkRadioGroupPrefab
      @groupLabel="Select an option"
      @changeset={{this.changeset}}
      @validationField="radio"
      as |Radio|
    >
      <Radio @value="applati" @label="Applati" @selected="applati" />
      <Radio @value="creux" @label="Creux" />
    </TpkRadioGroupPrefab>
  </template>
}
