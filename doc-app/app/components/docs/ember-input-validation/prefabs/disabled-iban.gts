// doc-app/app/components/docs/ember-input-validation/prefabs/disabled-iban.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkIbanPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-iban';

export default class DisabledIbanExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 'BE68 5390 0754 7034',
  });

  <template>
    <TpkIbanPrefab
      @label="Disabled"
      @placeholder="Enter IBAN"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
