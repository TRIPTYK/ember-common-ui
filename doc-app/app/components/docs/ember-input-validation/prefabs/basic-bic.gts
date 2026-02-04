import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkBicPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-bic';

export default class BasicBicExample extends Component {
  @tracked changeset = new ImmerChangeset({
    bic: '',
  });

  <template>
    <TpkBicPrefab
      @label="BIC"
      @changeset={{this.changeset}}
      @validationField="bic"
      @placeholder="Enter BIC"
    />
  </template>
}
