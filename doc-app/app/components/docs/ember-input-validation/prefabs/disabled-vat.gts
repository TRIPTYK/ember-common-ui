import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkVatPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-vat';

export default class DisabledVatExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'BE0123456789',
  });

  <template>
    <TpkVatPrefab
      @label="Disabled"
      @placeholder="Enter vat"
      @disabled={{true}}
      @changeset={{this.changeset}}
      @validationField="disabled"
    />
  </template>
}
