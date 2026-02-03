import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkDatepickerRangePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker-range';

export default class BasicDatepickerRangeExample extends Component {
  @tracked changeset = new ImmerChangeset({
    range: null,
  });

  <template>
    <TpkDatepickerRangePrefab
      @label="Datepicker Range"
      @changeset={{this.changeset}}
      @validationField="range"
    />
  </template>
}
