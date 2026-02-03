// doc-app/app/components/docs/ember-input-validation/prefabs/error-integer.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkIntegerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-integer';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorIntegerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    integer: null,
  });

  @action
  onChange(value: string | number | Date | null) {
    // Integer validation logic
    if (value === null || value === undefined || value === '') {
      this.changeset.addError({
        message: 'Integer is required',
        value: 'err',
        originalValue: null,
        key: 'integer',
      });
      return;
    }

    const numValue =
      typeof value === 'number' ? value : parseFloat(value as string);

    if (isNaN(numValue)) {
      this.changeset.addError({
        message: 'Must be a valid number',
        value: 'err',
        originalValue: null,
        key: 'integer',
      });
    } else if (!Number.isInteger(numValue)) {
      this.changeset.addError({
        message: 'Must be an integer (no decimal)',
        value: 'err',
        originalValue: null,
        key: 'integer',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Integer is required',
        value: 'err',
        originalValue: null,
        key: 'integer',
      });
    }, 0);
  }

  <template>
    <TpkIntegerPrefab
      @label="Invalid Integer"
      @placeholder="Enter a number"
      @changeset={{this.changeset}}
      @validationField="integer"
      @onChange={{this.onChange}}
      @mandatory={{true}}
    />
  </template>
}
