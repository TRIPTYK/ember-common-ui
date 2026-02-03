import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkTextareaPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-textarea';

export default class DisabledTextareaExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'This textarea is disabled',
  });

  <template>
    <TpkTextareaPrefab
      @label="Disabled textarea"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
