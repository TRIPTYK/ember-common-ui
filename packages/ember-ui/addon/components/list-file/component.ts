import Component from '@glimmer/component';
import { FileObject } from './file/component';

interface UiListFileArgs {
  documents: FileObject[] | FileObject;
  downloadEnabled: boolean;
  disabled?: boolean;
}

export default class UiListFile extends Component<UiListFileArgs> {
  get documents() {
    if (Array.isArray(this.args.documents)) {
      return this.args.documents;
    }
    return [this.args.documents];
  }
}
