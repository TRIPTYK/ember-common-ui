import { type BaseValidationSignature } from '../base.ts';
import { type TpkValidationFileComponentSignature } from '../tpk-validation-file.gts';
import Component from '@glimmer/component';
import type { Changeset } from 'ember-immer-changeset';
export interface TpkValidationFileListPrefabSignature extends BaseValidationSignature {
    Args: BaseValidationSignature['Args'] & TpkValidationFileComponentSignature['Args'] & {
        mandatory?: boolean;
        placeholder?: string;
        disableDownload?: boolean;
        onDelete?: (file: File, withoutFiles: File[], allFiles: File[]) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export interface FileListSignature {
    Args: {
        changeset: Changeset;
        validationField: string;
        disableDownload?: boolean;
        disabled?: boolean;
        onDelete?: (file: File, withoutFiles: File[], allFiles: File[]) => void;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class TpkValidationFileListComponent extends Component<TpkValidationFileListPrefabSignature> {
    handleDrop(event: DragEvent): void;
}
export declare class FileListComponent extends Component<FileListSignature> {
    changesetGet: (path: string) => File[];
    startWith: (str: string, start: string) => boolean;
    setImagePreview: (file: File) => string;
    getSize: (bytes: number) => string;
    deleteFile(fileToDelete: File): void;
    downloadFile(file: File): Promise<void>;
}
//# sourceMappingURL=tpk-validation-file-list.d.ts.map