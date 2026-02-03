import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkRadioGroupPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio-group';

export default class DisabledRadioGroupExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'applati',
  });

  <template>
    <TpkRadioGroupPrefab
      @groupLabel="Disabled Radio Group"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
      as |Radio|
    >
      <Radio @value="applati" @label="Applati" @selected="applati" />
      <Radio @value="creux" @label="Creux" />
    </TpkRadioGroupPrefab>
  </template>
}
