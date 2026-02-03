// doc-app/app/components/docs/ember-input-validation/prefabs/disabled-number.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationNumber from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-number';

export default class DisabledNumberExample extends Component {
  @tracked changeset = new ImmerChangeset({
    number: 42,
  });

  <template>
    <TpkValidationNumber
      @label="Disabled Number"
      @placeholder="Enter a number"
      @changeset={{this.changeset}}
      @validationField="number"
      @disabled={{true}}
    />
  </template>
}
