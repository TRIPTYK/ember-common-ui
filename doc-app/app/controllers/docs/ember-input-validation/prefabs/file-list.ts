import Controller from '@ember/controller';
import { action } from '@ember/object';
import { ImmerChangeset } from 'ember-immer-changeset';
import type { Owner } from '@ember/test-helpers/build-owner';

export default class DocsEmberInputValidationPrefabsFileListController extends Controller {
  changeset = new ImmerChangeset({
    files: [new File([], 'file.txt')],
    disabled: [new File([], 'file.txt')],
    error: '',
  });

  constructor(owner: Owner) {
    super(owner);
    this.changeset.addError({
      message: 'This is an error message',
      value: '',
      originalValue: '',
      key: 'error',
    });
  }
}
