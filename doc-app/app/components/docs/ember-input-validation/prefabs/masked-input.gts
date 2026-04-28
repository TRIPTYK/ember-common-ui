import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkInputPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';

export default class MaskedInputExample extends Component {
  @tracked changeset = new ImmerChangeset({ phone: '' });

  <template>
    <TpkInputPrefab
      @label="Phone"
      @changeset={{this.changeset}}
      @validationField="phone"
      @mask="+32 000 00 00 00"
      @placeholder="+32 _ _ _ _ _ _ _ _ _"
    />
  </template>
}
