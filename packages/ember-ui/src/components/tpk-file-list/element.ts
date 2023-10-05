import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { WithBoundArgs } from '@glint/template';
import TpkButtonComponent from '@triptyk/ember-input/components/tpk-button';

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
  label: string;
  disabled?: boolean;
  onDownload?: (document: FileObject) => unknown;
  onDelete?: (document: FileObject) => unknown;
}

interface TpkFileListElementComponentSignature {
  Args: TpkFileListElementComponentArgs;
  Element: HTMLLIElement;
  Blocks: {
    default: [
      | {
          Delete: WithBoundArgs<typeof TpkButtonComponent, 'onClick'>;
        }
      | {
          Download: WithBoundArgs<typeof TpkButtonComponent, 'onClick'>;
        },
    ];
  };
}

export default class TpkFileListElementComponent extends Component<TpkFileListElementComponentSignature> {
  public constructor(owner: unknown, args: TpkFileListElementComponentArgs) {
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-file-list/element': typeof TpkFileListElementComponent;
  }
}
