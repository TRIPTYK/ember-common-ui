import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkBicPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-bic';

export default class DisabledBicExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'ABNANL2AXXX',
  });

  <template>
    <TpkBicPrefab
      @label="Disabled BIC"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
