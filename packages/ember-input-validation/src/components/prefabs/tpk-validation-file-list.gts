import { type BaseValidationSignature } from '../base.ts';
import TpkValidationErrorsComponent from './tpk-validation-errors.gts';
import MandatoryLabelComponent from './mandatory-label.gts';
import TpkValidationFileComponent, {
  type TpkValidationFileComponentSignature,
} from '../tpk-validation-file.gts';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import type { Changeset } from 'ember-immer-changeset';
import { fn } from '@ember/helper';
import { modifier } from 'ember-modifier';

export interface TpkValidationFileListPrefabSignature
  extends BaseValidationSignature {
  Args: BaseValidationSignature['Args'] &
    TpkValidationFileComponentSignature['Args'] & {
      mandatory?: boolean;
      placeholder?: string;
      disableDownload?: boolean;
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
  };
  Blocks: {
    default: [];
  };
  Element: HTMLElement;
}

const handleSpaceToOpenListChoice = modifier(function (
  this: object,
  element: HTMLElement,
) {
  element.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      const labelInput = element.parentElement as HTMLLabelElement;

      if (labelInput instanceof HTMLLabelElement) {
        labelInput.click();
      }
    }
  });
});

export default class TpkValidationFileListComponent extends Component<TpkValidationFileListPrefabSignature> {
  @action
  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.args.disabled) return;

    let filesFromDrop = event.dataTransfer?.files;

    if (filesFromDrop && filesFromDrop.length > 0) {
      const files: File[] = Array.from(filesFromDrop);

      if (this.args.onChange) {
        return this.args.onChange(files);
      }
      const currentFiles = this.args.changeset.get(
        this.args.validationField,
      ) as File[];
      return this.args.changeset.set(this.args.validationField, [
        ...currentFiles,
        ...files,
      ]);
    }
  }

  <template>
    <TpkValidationFileComponent
      @label={{@label}}
      @disabled={{@disabled}}
      @changeEvent={{@changeEvent}}
      @onChange={{@onChange}}
      @mandatory={{@mandatory}}
      @validationField={{@validationField}}
      @changeset={{@changeset}}
      @multiple={{true}}
      @requiredFields={{@requiredFields}}
      as |V|
    >
      <V.Label
        class='tpk-file-list-container'
        data-has-error='{{V.hasError}}'
        anchorScrollUp={{@validationField}}
        data-test-tpk-prefab-file-list-container
        ...attributes
      >
        <MandatoryLabelComponent @label={{@label}} class='tpk-label' />
        <V.Input class='tpk-file-list-input' data-test-tpk-file-list-input />
        <div
          class='tpk-file-list-placeholder-container
            {{if @disabled "disabled"}}'
          tabindex='0'
          {{handleSpaceToOpenListChoice}}
          {{on 'drop' this.handleDrop}}
        >
          <img
            src='/upload.svg'
            alt='upload'
            class='tpk-file-list-placeholder-icon'
          />
          <div class='tpk-file-list-placeholder'>
            {{@placeholder}}
          </div>
        </div>
        <TpkValidationErrorsComponent
          class='tpk-validation-errors'
          @errors={{V.errors}}
        />
      </V.Label>
      <FileListComponent
        @changeset={{@changeset}}
        @validationField={{@validationField}}
        @disableDownload={{@disableDownload}}
        @disabled={{@disabled}}
      />
    </TpkValidationFileComponent>
  </template>
}

export class FileListComponent extends Component<FileListSignature> {
  changesetGet = (path: string): File[] => {
    return this.args.changeset.get(path) as File[];
  };

  startWith = (str: string, start: string) => {
    return str.startsWith(start);
  };

  setImagePreview = (file: File): string => {
    return URL.createObjectURL(file);
  };

  getSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  @action
  deleteFile(fileToDelete: File) {
    const currentFiles = this.args.changeset.get(
      this.args.validationField,
    ) as File[];
    const updatedFiles = currentFiles.filter((file) => file !== fileToDelete);
    this.args.changeset.set(this.args.validationField, updatedFiles);
  }

  async downloadFile(file: File) {
    window.open(URL.createObjectURL(file));
  }

  <template>
    <div class='tpk-file-list-list {{if @disabled "disabled"}}'>
      {{#each (this.changesetGet this.args.validationField) as |file|}}
        <div class='tpk-file-list-list-item'>
          <div class='tpk-file-list-list-item-preview'>
            {{#if (this.startWith file.type 'image/')}}
              <img src={{this.setImagePreview file}} alt={{file.name}} />
            {{else}}
              <img src='/document.svg' alt='document' />
            {{/if}}
          </div>
          <div class='tpk-file-list-list-item-content'>
            <h4 class='tpk-file-list-list-item-content-name'>
              {{file.name}}
            </h4>
            <h5 class='tpk-file-list-list-item-content-size'>
              {{this.getSize file.size}}
            </h5>
          </div>
          <div class='tpk-file-list-list-item-action'>
            {{#unless @disableDownload}}
              <button
                type='button'
                {{on 'click' (fn this.downloadFile file)}}
                class='tpk-file-list-list-item-action-download'
              >
                <img src='/download.svg' alt='download' />
              </button>
            {{/unless}}
            {{#unless @disabled}}
              <button
                type='button'
                {{on 'click' (fn this.deleteFile file)}}
                class='tpk-file-list-list-item-action-delete'
              >
                <img src='/delete.svg' alt='delete' />
              </button>
            {{/unless}}
          </div>
        </div>
      {{/each}}
    </div>
  </template>
}
