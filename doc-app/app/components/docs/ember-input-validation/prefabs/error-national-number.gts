import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkNationalNumberPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-national-number';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorNationalNumberExample extends Component {
  @tracked changeset = new ImmerChangeset({
    nationalNumber: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    if (typeof value !== 'string') {
      this.changeset.addError({
        message: 'should be a string value',
        value: 'err',
        originalValue: '',
        key: 'nationalNumber',
      });
    }
    if ((value as string)?.length >= 11) {
      this.changeset.removeErrors();
    } else {
      this.changeset.addError({
        message: 'Invalid national number format',
        value: 'err',
        originalValue: '',
        key: 'nationalNumber',
      });
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Invalid national number format',
        value: 'err',
        originalValue: '',
        key: 'nationalNumber',
      });
    }, 0);
  }

  <template>
    <TpkNationalNumberPrefab
      @label="Error National number"
      @placeholder="Enter belgian national number"
      @changeset={{this.changeset}}
      @validationField="nationalNumber"
      @onChange={{this.onChange}}
    />
  </template>
}
