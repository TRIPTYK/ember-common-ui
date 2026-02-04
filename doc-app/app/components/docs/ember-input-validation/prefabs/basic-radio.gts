import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkRadioPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio';

export default class BasicRadioExample extends Component {
  @tracked changeset = new ImmerChangeset({
    radio: '',
  });

  <template>
    <TpkRadioPrefab
      @changeset={{this.changeset}}
      @validationField="radio"
      @label="This"
      @value="selected one"
    />
  </template>
}
