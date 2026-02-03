import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkRadioPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-radio';

export default class DisabledRadioExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'selected one',
  });

  <template>
    <TpkRadioPrefab
      @changeset={{this.changeset}}
      @validationField="disabled"
      @label="Disabled Radio"
      @value="selected one"
      @disabled={{true}}
    />
  </template>
}
