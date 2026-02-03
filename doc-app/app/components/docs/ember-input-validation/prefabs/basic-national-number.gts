import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkNationalNumberPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-national-number';

export default class BasicNationalNumberExample extends Component {
  @tracked changeset = new ImmerChangeset({
    nationalNumber: '',
  });

  <template>
    <TpkNationalNumberPrefab
      @label="National number"
      @placeholder="Enter belgian national number"
      @changeset={{this.changeset}}
      @validationField="nationalNumber"
    />
  </template>
}
