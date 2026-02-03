import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkVatPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-vat';

export default class BasicVatExample extends Component {
  @tracked changeset = new ImmerChangeset({
    vat: '',
  });

  <template>
    <TpkVatPrefab
      @label="VAT"
      @placeholder="Enter vat"
      @changeset={{this.changeset}}
      @validationField="vat"
    />
  </template>
}
