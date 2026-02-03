import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkTimepickerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-timepicker';

export default class BasicTimepickerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    time: null,
  });

  <template>
    <TpkTimepickerPrefab
      @label="Timepicker"
      @changeset={{this.changeset}}
      @validationField="time"
    />
  </template>
}
