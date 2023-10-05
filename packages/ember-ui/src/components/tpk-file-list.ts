import Component from '@glimmer/component';
import { FileObject } from './tpk-file-list/element';

interface TpkFileListArgs {
  documents: FileObject[] | FileObject;
  downloadEnabled: boolean;
  disabled?: boolean;
}

interface TpkFileListSignature {
  Args: TpkFileListArgs;
  Element: HTMLUListElement;
  Blocks: {
    default: [
      {
        Element: HTMLLIElement;
      },
    ];
  };
}

export default class TpkFileList extends Component<TpkFileListSignature> {
  get documents() {
    if (Array.isArray(this.args.documents)) {
      return this.args.documents;
    }
    return [this.args.documents];
  }
}
