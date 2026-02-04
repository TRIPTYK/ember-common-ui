import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkVatPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-vat';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorVatExample extends Component {
  @tracked changeset = new ImmerChangeset({
    vat: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    if (typeof value !== 'string') {
      this.changeset.addError({
        message: 'should be a string value',
        value: 'err',
        originalValue: '',
        key: 'password',
      });
    }
    if (!value || (value as string).length < 5) {
      this.changeset.addError({
        message: 'Please enter a valid VAT number',
        value: 'err',
        originalValue: '',
        key: 'vat',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Please enter a valid VAT number',
        value: 'err',
        originalValue: '',
        key: 'vat',
      });
    }, 0);
  }

  <template>
    <TpkVatPrefab
      @label="Error"
      @placeholder="Enter vat"
      @changeset={{this.changeset}}
      @validationField="vat"
      @onChange={{this.onChange}}
    />
  </template>
}
