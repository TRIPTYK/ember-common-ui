import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkTimepickerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-timepicker';

export default class DisabledTimepickerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: '14:30',
  });

  <template>
    <TpkTimepickerPrefab
      @label="Disabled"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
