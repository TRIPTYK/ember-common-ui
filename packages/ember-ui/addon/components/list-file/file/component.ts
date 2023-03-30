import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export type FileObject = PersistedFile | UnpersistedFile;

export interface PersistedFile {
  filename: string;
  path: string;
  id: string;
}

export interface UnpersistedFile {
  filename: string;
  path?: string;
  id?: string;
  file?: File;
}


interface InputsListFileFileComponentArgs {
  document: FileObject;
  disabled?: boolean;
  onDownload?: (document: FileObject) => unknown;
  onRemove?: (document: FileObject) => unknown;
}

export default class InputsListFileFileComponent extends Component<InputsListFileFileComponentArgs> {
  public constructor(owner: unknown, args: InputsListFileFileComponentArgs) {
    super(owner, args);
    assert('@document is mandatory', args.document !== undefined);
  }

  get isDownloadable() {
    return !this.args.disabled && this.args.document.path;
  }

  get isDeleteable() {
    return !this.args.disabled;
  }
}
