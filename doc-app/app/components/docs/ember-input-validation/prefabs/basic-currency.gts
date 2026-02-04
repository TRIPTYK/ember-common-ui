import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkCurrencyPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-currency';

export default class BasicCurrencyExample extends Component {
  @tracked changeset = new ImmerChangeset({
    value: '',
  });

  <template>
    <TpkCurrencyPrefab
      @label="Amount"
      @changeset={{this.changeset}}
      @validationField="value"
      @placeholder="Enter an amount"
    />
  </template>
}
