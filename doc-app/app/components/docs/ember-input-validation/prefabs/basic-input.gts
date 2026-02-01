// doc-app/app/components/docs/ember-input-validation/prefabs/basic-input.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import { object, string } from 'zod';
import TpkInputPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';

export default class BasicInputExample extends Component {
  @tracked changeset = new ImmerChangeset({
    something: '',
  });

  validationSchema = object({
    something: string().min(5, 'Minimum 5 characters'),
  });

  <template>
    <TpkInputPrefab
      @label="Input"
      @changeset={{this.changeset}}
      @validationField="something"
    />
  </template>
}
