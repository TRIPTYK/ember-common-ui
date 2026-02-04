import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkBicPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-bic';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorBicExample extends Component {
  @tracked changeset = new ImmerChangeset({
    bic: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    if (typeof value !== 'string') {
      this.changeset.addError({
        message: 'should be a string value',
        value: 'err',
        originalValue: '',
        key: 'bic',
      });
    }
    if ((value as string).length >= 8) {
      this.changeset.removeErrors();
    } else {
      this.changeset.addError({
        message: 'BIC must be at least 8 characters',
        value: 'err',
        originalValue: '',
        key: 'bic',
      });
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'BIC must be at least 8 characters',
        value: 'err',
        originalValue: '',
        key: 'bic',
      });
    }, 0);
  }

  <template>
    <TpkBicPrefab
      @label="BIC"
      @changeset={{this.changeset}}
      @validationField="bic"
      @onChange={{this.onChange}}
      @placeholder="Enter BIC"
    />
  </template>
}
