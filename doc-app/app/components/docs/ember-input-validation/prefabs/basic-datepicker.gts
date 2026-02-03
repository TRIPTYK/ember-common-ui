// doc-app/app/components/docs/ember-input-validation/prefabs/basic-datepicker.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkDatepickerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-datepicker';

export default class BasicDatepickerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    birthday: null,
  });

  <template>
    <TpkDatepickerPrefab
      @label="Datepicker"
      @changeset={{this.changeset}}
      @validationField="birthday"
    />
  </template>
}
