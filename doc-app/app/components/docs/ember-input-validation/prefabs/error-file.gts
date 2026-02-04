// doc-app/app/components/docs/ember-input-validation/prefabs/error-file.gts
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ImmerChangeset } from 'ember-immer-changeset';
import TpkFilePrefab from '@triptyk/ember-input-validation/components/prefabs/tpk-validation-file';
import type Owner from '@ember/owner';
import { action } from '@ember/object';

export default class ErrorFileExample extends Component {
  @tracked changeset = new ImmerChangeset({
    file: null,
  });

  @action
  onChange(value: unknown) {
    // File validation logic
    if (!value) {
      this.changeset.addError({
        message: 'File is required',
        value: 'err',
        originalValue: null,
        key: 'file',
      });
    } else {
      this.changeset.removeErrors();
    }
  }

  constructor(owner: Owner, args: never) {
    super(owner, args);
    setTimeout(() => {
      this.changeset.addError({
        message: 'File is required',
        value: 'err',
        originalValue: null,
        key: 'file',
      });
    }, 0);
  }

  <template>
    <TpkFilePrefab
      @label="Error"
      @changeset={{this.changeset}}
      @validationField="file"
      @onChange={{this.onChange}}
      @mandatory={{true}}
    />
  </template>
}
