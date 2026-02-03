import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkPasswordPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-password';

export default class BasicPasswordExample extends Component {
  @tracked changeset = new ImmerChangeset({
    password: '',
  });

  <template>
    <TpkPasswordPrefab
      @label="Password"
      @placeholder="Enter password"
      @changeset={{this.changeset}}
      @validationField="password"
    />
  </template>
}
