import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkCurrencyPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-currency';

export default class DisabledCurrencyExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: '1234.56',
  });

  <template>
    <TpkCurrencyPrefab
      @label="Disabled Amount"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
