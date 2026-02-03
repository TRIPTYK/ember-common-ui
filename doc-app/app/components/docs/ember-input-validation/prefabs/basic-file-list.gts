// doc-app/app/components/docs/ember-input-validation/prefabs/basic-file-list.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkFileListPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file-list';

export default class BasicFileListExample extends Component {
  @tracked changeset = new ImmerChangeset({
    files: [],
  });

  <template>
    <TpkFileListPrefab
      @label="File"
      @placeholder="Drag and drop a file or click to select a file (max 10MB)"
      @changeset={{this.changeset}}
      @validationField="files"
    />
  </template>
}
