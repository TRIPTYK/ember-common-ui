// doc-app/app/components/docs/ember-input-validation/prefabs/basic-integer.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkIntegerPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-integer';

export default class BasicIntegerExample extends Component {
  @tracked changeset = new ImmerChangeset({
    integer: 0,
  });

  <template>
    <TpkIntegerPrefab
      @label="Unsigned Integer"
      @placeholder="Enter a number"
      @changeset={{this.changeset}}
      @validationField="integer"
      @unsigned={{true}}
    />
  </template>
}
