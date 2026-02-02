// doc-app/app/components/docs/ember-input-validation/prefabs/basic-input.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkInputPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-input';

export default class BasicInputExample extends Component {
  @tracked changeset = new ImmerChangeset({
    something: '',
  });

  <template>
    <TpkInputPrefab
      @label="Input"
      @changeset={{this.changeset}}
      @validationField="something"
    />
  </template>
}
