import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkTextareaPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-textarea';

export default class BasicTextareaExample extends Component {
  @tracked changeset = new ImmerChangeset({
    ember: '',
  });

  <template>
    <TpkTextareaPrefab
      @label="Explain why you like Ember"
      @maxLength={{100}}
      @changeset={{this.changeset}}
      @validationField="ember"
    />
  </template>
}
