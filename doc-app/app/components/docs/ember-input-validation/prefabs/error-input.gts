// doc-app/app/components/examples/input-validation/error-input.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkInputPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';
import type Owner from '@ember/owner';

export default class ErrorInputExample extends Component {
  @tracked changeset = new ImmerChangeset({
    something: '',
  });

  validationSchema = object({
    something: string().min(5, 'Minimum 5 characters'),
  });

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
    />
  </template>
}
