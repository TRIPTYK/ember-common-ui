// doc-app/app/components/docs/ember-input-validation/prefabs/basic-file.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkFilePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file';

export default class BasicFileExample extends Component {
  @tracked changeset = new ImmerChangeset({
    file: null,
  });

  <template>
    <TpkFilePrefab
      @label="File"
      @changeset={{this.changeset}}
      @validationField="file"
    />
  </template>
}
