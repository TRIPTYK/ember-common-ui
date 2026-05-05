import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkCheckboxPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-checkbox';

export default class BasicCheckboxExample extends Component {
  @tracked changeset = new ImmerChangeset({
    accepted: false,
  });

  <template>
    <TpkCheckboxPrefab
      @label="I accept the terms and conditions"
      @changeset={{this.changeset}}
      @validationField="accepted"
    />
  </template>
}
