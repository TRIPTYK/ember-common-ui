import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkPasswordPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-password';

export default class DisabledPasswordExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'DisabledPassword123',
  });

  <template>
    <TpkPasswordPrefab
      @label="Disabled Password"
      @placeholder="Enter password"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
