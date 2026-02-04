// doc-app/app/components/docs/ember-input-validation/prefabs/error-iban.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkIbanPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-iban';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorIbanExample extends Component {
  @tracked changeset = new ImmerChangeset({
    iban: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    // IBAN validation logic
    if (typeof value !== 'string') {
      this.changeset.addError({
        message: 'IBAN should be a string value',
        value: 'err',
        originalValue: '',
        key: 'iban',
      });
      return;
    }

    const ibanWithoutSpaces = value.replace(/\s/g, '');

    if (!ibanWithoutSpaces) {
      this.changeset.addError({
        message: 'IBAN is required',
        value: 'err',
        originalValue: '',
        key: 'iban',
      });
    } else if (ibanWithoutSpaces.length < 15) {
      this.changeset.addError({
        message: 'IBAN must be at least 15 characters',
        value: 'err',
        originalValue: '',
        key: 'iban',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'IBAN is required',
        value: 'err',
        originalValue: '',
        key: 'iban',
      });
    }, 0);
  }

  <template>
    <TpkIbanPrefab
      @label="Error"
      @placeholder="Enter IBAN"
      @changeset={{this.changeset}}
      @validationField="iban"
      @onChange={{this.onChange}}
    />
  </template>
}
