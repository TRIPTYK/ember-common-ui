import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkNationalNumberPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-national-number';

export default class DisabledNationalNumberExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: '12.34.56-789.01',
  });

  <template>
    <TpkNationalNumberPrefab
      @label="Disabled National number"
      @placeholder="Enter belgian national number"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
