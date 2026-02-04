import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkPasswordPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-password';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorPasswordExample extends Component {
  @tracked changeset = new ImmerChangeset({
    password: '',
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
    if ((value as string)?.length >= 8) {
      this.changeset.removeErrors();
    } else {
      this.changeset.addError({
        message: 'Minimum 8 characters',
        value: 'err',
        originalValue: '',
        key: 'password',
      });
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Minimum 8 characters',
        value: 'err',
        originalValue: '',
        key: 'password',
      });
    }, 0);
  }

  <template>
    <TpkPasswordPrefab
      @label="Invalid Password"
      @placeholder="Enter password"
      @changeset={{this.changeset}}
      @validationField="password"
      @onChange={{this.onChange}}
    />
  </template>
}
