// doc-app/app/components/docs/ember-input-validation/prefabs/error-email.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkEmailPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-email';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorEmailExample extends Component {
  @tracked changeset = new ImmerChangeset({
    email: '',
  });

  @action
  onChange(value: string | number | Date | null) {
    // Email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (typeof value !== 'string') {
      this.changeset.addError({
        message: 'Email should be a string value',
        value: 'err',
        originalValue: '',
        key: 'email',
      });
      return;
    }

    if (!value || value.trim() === '') {
      this.changeset.addError({
        message: 'Email is required',
        value: 'err',
        originalValue: '',
        key: 'email',
      });
    } else if (!emailRegex.test(value)) {
      this.changeset.addError({
        message: 'Please enter a valid email address',
        value: 'err',
        originalValue: '',
        key: 'email',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Email is required',
        value: 'err',
        originalValue: '',
        key: 'email',
      });
    }, 0);
  }

  <template>
    <TpkEmailPrefab
      @label="Email"
      @placeholder="Enter your email"
      @changeset={{this.changeset}}
      @validationField="email"
      @onChange={{this.onChange}}
    />
  </template>
}
