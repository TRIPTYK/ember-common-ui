import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkTextareaPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-textarea';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorTextareaExample extends Component {
  @tracked changeset = new ImmerChangeset({
    ember: '',
  });

  @action
  onChange(value: string) {
    if (!value || value.length < 10) {
      this.changeset.addError({
        message: 'Minimum 10 characters',
        value: 'err',
        originalValue: '',
        key: 'ember',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'Minimum 10 characters',
        value: 'err',
        originalValue: '',
        key: 'ember',
      });
    }, 0);
  }

  <template>
    <TpkTextareaPrefab
      @label="Error textarea"
      @maxLength={{100}}
      @changeset={{this.changeset}}
      @validationField="ember"
      @onChange={{this.onChange}}
    />
  </template>
}
