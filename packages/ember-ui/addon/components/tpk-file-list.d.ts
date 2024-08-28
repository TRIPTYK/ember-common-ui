import Component from '@glimmer/component';
import { FileObject } from './tpk-file-list/element';
interface TpkFileListArgs {
    documents: FileObject[] | FileObject;
    downloadEnabled: boolean;
    disabled?: boolean;
}
export default class TpkFileList extends Component<TpkFileListArgs> {
    get documents(): FileObject[];
}
export {};
//# sourceMappingURL=tpk-file-list.d.ts.map