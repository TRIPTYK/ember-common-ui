import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkMobilePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-mobile';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorMobileExample extends Component {
  @tracked changeset = new ImmerChangeset({
    phone: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    if (typeof value !== 'number') {
      this.changeset.addError({
        message: 'should be a string value',
        value: 'err',
        originalValue: '',
        key: 'phone',
      });
    }
    if ((value as string)?.length >= 10) {
      this.changeset.removeErrors();
    } else {
      this.changeset.addError({
        message: 'Minimum 10 characters',
        value: 'err',
        originalValue: '',
        key: 'phone',
      });
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Minimum 10 characters',
        value: 'err',
        originalValue: '',
        key: 'phone',
      });
    }, 0);
  }

  <template>
    <TpkMobilePrefab
      @label="Mobile Number"
      @changeset={{this.changeset}}
      @validationField="phone"
      {{! @glint-ignore: onChange prop temporarily needed }}
      @onChange={{this.onChange}}
    />
  </template>
}
