// doc-app/app/components/docs/ember-input-validation/prefabs/disabled-datepicker.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkDatepickerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker';

export default class DisabledDatepickerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: new Date(),
  });

  <template>
    <TpkDatepickerPrefab
      @label="Disabled Datepicker"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
