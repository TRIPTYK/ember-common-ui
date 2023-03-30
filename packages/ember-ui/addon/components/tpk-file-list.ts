import Component from '@glimmer/component';
import { FileObject } from './tpk-file-list/element';

interface TpkFileListArgs {
  documents: FileObject[] | FileObject;
  downloadEnabled: boolean;
  disabled?: boolean;
}

export default class TpkFileList extends Component<TpkFileListArgs> {
  get documents() {
    if (Array.isArray(this.args.documents)) {
      return this.args.documents;
    }
    return [this.args.documents];
  }
}
