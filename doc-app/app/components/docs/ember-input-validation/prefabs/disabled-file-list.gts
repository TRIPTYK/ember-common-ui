// doc-app/app/components/docs/ember-input-validation/prefabs/disabled-file-list.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkFileListPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file-list';

export default class DisabledFileListExample extends Component {
  @tracked changeset = new ImmerChangeset({
    disabled: [],
  });

  <template>
    <TpkFileListPrefab
      @label="Disabled"
      @placeholder="Drag and drop a file or click to select a file (max 10MB)"
      @changeset={{this.changeset}}
      @validationField="disabled"
      @disabled={{true}}
    />
  </template>
}
