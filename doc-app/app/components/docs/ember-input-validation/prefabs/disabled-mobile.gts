import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkMobilePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-mobile';

export default class DisabledMobileExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: '+352 621 123 456',
  });

  <template>
    <TpkMobilePrefab
      @label="Disabled Mobile"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
