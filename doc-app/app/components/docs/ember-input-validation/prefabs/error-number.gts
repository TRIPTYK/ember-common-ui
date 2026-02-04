// doc-app/app/components/docs/ember-input-validation/prefabs/error-number.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationNumber from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-number';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorNumberExample extends Component {
  @tracked changeset = new ImmerChangeset({
    number: 0,
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

    if (value >= 10) {
      this.changeset.removeErrors();
    } else {
      this.changeset.addError({
        message: 'Minimum value is 10',
        value: 'err',
        originalValue: 0,
        key: 'number',
      });
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Minimum value is 10',
        value: 'err',
        originalValue: 0,
        key: 'number',
      });
    }, 0);
  }

  <template>
    <TpkValidationNumber
      @label="Number with errors"
      @placeholder="Enter a number"
      @changeset={{this.changeset}}
      @validationField="number"
      @onChange={{this.onChange}}
    />
  </template>
}
