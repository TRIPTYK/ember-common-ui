// doc-app/app/components/docs/ember-input-validation/prefabs/error-file-list.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkFileListPrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file-list';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorFileListExample extends Component {
  @tracked changeset = new ImmerChangeset({
    files: [],
  });

  @action
  onChange(value: unknown) {
    // File validation logic
    if (!Array.isArray(value)) {
      this.changeset.addError({
        message: 'Value should be an array',
        value: 'err',
        originalValue: [],
        key: 'files',
      });
      return;
    }

    if (value.length === 0) {
      this.changeset.addError({
        message: 'At least one file is required',
        value: 'err',
        originalValue: [],
        key: 'files',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'At least one file is required',
        value: 'err',
        originalValue: [],
        key: 'files',
      });
    }, 0);
  }

  <template>
    <TpkFileListPrefab
      @label="Error"
      @placeholder="Drag and drop a file or click to select a file (max 10MB)"
      @changeset={{this.changeset}}
      @validationField="files"
      @onChange={{this.onChange}}
      @mandatory={{true}}
    />
  </template>
}
