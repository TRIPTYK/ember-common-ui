// doc-app/app/components/examples/input-validation/error-input.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkInputPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorInputExample extends Component {
  @tracked changeset = new ImmerChangeset({
    something: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    // Type guard to ensure we only work with strings
    if (typeof value !== 'string') {
      this.changeset.addError({
        message: 'should be a string value',
        value: 'err',
        originalValue: '',
        key: 'something',
      });
    }

    if ((value as string)?.length >= 5) {
      this.changeset.removeErrors();
    } else {
      this.changeset.addError({
        message: 'Minimum 5 characters',
        value: 'err',
        originalValue: '',
        key: 'something',
      });
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Minimum 5 characters',
        value: 'err',
        originalValue: '',
        key: 'something',
      });
    }, 0);
  }

  <template>
    <TpkInputPrefab
      @label="Input"
      @changeset={{this.changeset}}
      @validationField="something"
      @onChange={{this.onChange}}
    />
  </template>
}
