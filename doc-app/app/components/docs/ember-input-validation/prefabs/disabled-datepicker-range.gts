import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkDatepickerRangePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker-range';

export default class DisabledDatepickerRangeExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: null,
  });

  <template>
    <TpkDatepickerRangePrefab
      @label="Disabled Datepicker Range"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
