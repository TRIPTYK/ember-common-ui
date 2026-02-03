// doc-app/app/components/docs/ember-input-validation/prefabs/disabled-email.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkEmailPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-email';

export default class DisabledEmailExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'disabled@example.com',
  });

  <template>
    <TpkEmailPrefab
      @label="Disabled Email"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
