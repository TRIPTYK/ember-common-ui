// doc-app/app/components/docs/ember-input-validation/prefabs/unsigned-number.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkValidationNumber from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-number';

export default class UnsignedNumberExample extends Component {
  @tracked changeset = new ImmerChangeset({
    uNumber: 0,
  });

  <template>
    <TpkValidationNumber
      @label="Unsigned Number"
      @placeholder="Enter a number"
      @changeset={{this.changeset}}
      @validationField="uNumber"
      @unsigned={{true}}
    />
  </template>
}
