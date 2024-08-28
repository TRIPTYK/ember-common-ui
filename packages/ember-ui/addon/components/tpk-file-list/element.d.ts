import Component from '@glimmer/component';
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
interface TpkFileListElementComponentArgs {
    document: FileObject;
    disabled?: boolean;
    onDownload?: (document: FileObject) => unknown;
    onRemove?: (document: FileObject) => unknown;
}
export default class TpkFileListElementComponent extends Component<TpkFileListElementComponentArgs> {
    constructor(owner: unknown, args: TpkFileListElementComponentArgs);
    get isDownloadable(): string | false | undefined;
    get isDeleteable(): boolean;
}
export {};
//# sourceMappingURL=element.d.ts.map