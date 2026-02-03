import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkMobilePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-mobile';

export default class BasicMobileExample extends Component {
  @tracked changeset = new ImmerChangeset({
    phone: '',
  });

  <template>
    <TpkMobilePrefab
      @label="Mobile Number"
      @changeset={{this.changeset}}
      @validationField="phone"
    />
  </template>
}
