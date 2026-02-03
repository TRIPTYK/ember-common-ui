// doc-app/app/components/docs/ember-input-validation/prefabs/basic-iban.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkIbanPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-iban';

export default class BasicIbanExample extends Component {
  @tracked changeset = new ImmerChangeset({
    iban: '',
  });

  <template>
    <TpkIbanPrefab
      @label="IBAN"
      @placeholder="Enter IBAN"
      @changeset={{this.changeset}}
      @validationField="iban"
    />
  </template>
}
