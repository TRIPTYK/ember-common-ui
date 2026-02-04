// doc-app/app/components/docs/ember-input-validation/prefabs/disabled-file.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkFilePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file';

export default class DisabledFileExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: null,
  });

  <template>
    <TpkFilePrefab
      @label="Disabled"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
