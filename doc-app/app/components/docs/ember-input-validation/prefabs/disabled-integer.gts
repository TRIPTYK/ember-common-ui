// doc-app/app/components/docs/ember-input-validation/prefabs/disabled-integer.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkIntegerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-integer';

export default class DisabledIntegerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: 42,
  });

  <template>
    <TpkIntegerPrefab
      @label="Disabled Integer"
      @placeholder="Enter a number"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
