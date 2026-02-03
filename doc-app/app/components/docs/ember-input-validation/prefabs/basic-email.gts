// doc-app/app/components/docs/ember-input-validation/prefabs/basic-email.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkEmailPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-email';

export default class BasicEmailExample extends Component {
  @tracked changeset = new ImmerChangeset({
    email: '',
  });

  <template>
    <TpkEmailPrefab
      @label="Email"
      @placeholder="Enter your email"
      @changeset={{this.changeset}}
      @validationField="email"
    />
  </template>
}
