import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkCurrencyPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-currency';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorCurrencyExample extends Component {
  @tracked changeset = new ImmerChangeset({
    error: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    if (typeof value !== 'number') {
      this.changeset.addError({
        message: 'should be a number value',
        value: 'err',
        originalValue: 0,
        key: 'number',
      });
      return;
    }
    if (value !== null && value > 0) {
      this.changeset.removeErrors();
    } else {
      this.changeset.addError({
        message: 'Amount must be greater than 0',
        value: 'err',
        originalValue: '',
        key: 'error',
      });
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Amount must be greater than 0',
        value: 'err',
        originalValue: '',
        key: 'error',
      });
    }, 0);
  }

  <template>
    <TpkCurrencyPrefab
      @label="Amount"
      @changeset={{this.changeset}}
      @validationField="error"
      @onChange={{this.onChange}}
    />
  </template>
}
