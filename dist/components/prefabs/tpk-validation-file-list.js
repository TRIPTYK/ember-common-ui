import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import '@ember/debug';
import Component from '@glimmer/component';
import 'ember-immer-changeset';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import MandatoryLabelComponent from './mandatory-label.js';
import TpkValidationFileComponent from '../tpk-validation-file.js';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _FileListComponent, _class2, _TpkValidationFileListComponent;
const handleSpaceToOpenListChoice = modifier(function (element) {
  element.addEventListener('keydown', event => {
    if (event.key === ' ') {
      event.preventDefault();
      const labelInput = element.parentElement;
      if (labelInput instanceof HTMLLabelElement) {
        labelInput.click();
      }
    }
  });
});
let TpkValidationFileListComponent = (_class2 = (_TpkValidationFileListComponent = class TpkValidationFileListComponent extends Component {
  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.args.disabled) return;
    let filesFromDrop = event.dataTransfer?.files;
    if (filesFromDrop && filesFromDrop.length > 0) {
      const files = Array.from(filesFromDrop);
      if (this.args.onChange) {
        return this.args.onChange(files);
      }
      const currentFiles = this.args.changeset.get(this.args.validationField);
      return this.args.changeset.set(this.args.validationField, [...currentFiles, ...files]);
    }
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkValidationFileComponent @label={{@label}} @disabled={{@disabled}} @changeEvent={{@changeEvent}} @onChange={{@onChange}} @mandatory={{@mandatory}} @validationField={{@validationField}} @changeset={{@changeset}} @multiple={{true}} @requiredFields={{@requiredFields}} as |V|>\n      <V.Label class=\"tpk-file-list-container\" data-has-error=\"{{V.hasError}}\" anchorScrollUp={{@validationField}} data-test-tpk-prefab-file-list-container ...attributes>\n        <MandatoryLabelComponent @label={{@label}} class=\"tpk-label\" />\n        <V.Input class=\"tpk-file-list-input\" data-test-tpk-file-list-input />\n        <div class=\"tpk-file-list-placeholder-container\n            {{if @disabled \"disabled\"}}\" tabindex=\"0\" {{handleSpaceToOpenListChoice}} {{on \"drop\" this.handleDrop}}>\n          <img src={{if @disabled \"/block.svg\" \"/upload.svg\"}} alt={{if @disabled \"block\" \"upload\"}} class=\"tpk-file-list-placeholder-icon\" />\n          {{#unless @disabled}}\n            <div class=\"tpk-file-list-placeholder\">\n              {{@placeholder}}\n            </div>\n          {{/unless}}\n        </div>\n        <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{V.errors}} />\n      </V.Label>\n      <FileListComponent @onDelete={{@onDelete}} @changeset={{@changeset}} @validationField={{@validationField}} @disableDownload={{@disableDownload}} @disabled={{@disabled}} />\n    </TpkValidationFileComponent>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkValidationFileComponent,
    MandatoryLabelComponent,
    handleSpaceToOpenListChoice,
    on,
    TpkValidationErrorsComponent,
    FileListComponent
  })
}), _TpkValidationFileListComponent), _TpkValidationFileListComponent), _applyDecoratedDescriptor(_class2.prototype, "handleDrop", [action], Object.getOwnPropertyDescriptor(_class2.prototype, "handleDrop"), _class2.prototype), _class2);
let FileListComponent = (_class = (_FileListComponent = class FileListComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "changesetGet", path => {
      return this.args.changeset.get(path);
    });
    _defineProperty(this, "startWith", (str, start) => {
      return str.startsWith(start);
    });
    _defineProperty(this, "setImagePreview", file => {
      return URL.createObjectURL(file);
    });
    _defineProperty(this, "getSize", bytes => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    });
  }
  deleteFile(fileToDelete) {
    const currentFiles = this.args.changeset.get(this.args.validationField);
    const updatedFiles = currentFiles.filter(file => file !== fileToDelete);
    if (this.args.onDelete) {
      return this.args.onDelete(fileToDelete, updatedFiles, currentFiles);
    }
    this.args.changeset.set(this.args.validationField, updatedFiles);
  }
  async downloadFile(file) {
    if (window.open) {
      window.open(URL.createObjectURL(file));
    }
  }
}, setComponentTemplate(precompileTemplate("\n    <div class=\"tpk-file-list-list {{if @disabled \"disabled\"}}\">\n      {{#each (this.changesetGet @validationField) as |file|}}\n        <div class=\"tpk-file-list-list-item\">\n          <div class=\"tpk-file-list-list-item-preview\">\n            {{#if (this.startWith file.type \"image/\")}}\n              <img src={{this.setImagePreview file}} alt={{file.name}} />\n            {{else}}\n              <img src=\"/document.svg\" alt=\"document\" />\n            {{/if}}\n          </div>\n          <div class=\"tpk-file-list-list-item-content\">\n            <h4 class=\"tpk-file-list-list-item-content-name\">\n              {{file.name}}\n            </h4>\n            <h5 class=\"tpk-file-list-list-item-content-size\">\n              {{this.getSize file.size}}\n            </h5>\n          </div>\n          <div class=\"tpk-file-list-list-item-action\">\n            {{#unless @disableDownload}}\n              <button type=\"button\" {{on \"click\" (fn this.downloadFile file)}} class=\"tpk-file-list-list-item-action-download\">\n                <img src=\"/download.svg\" alt=\"download\" />\n              </button>\n            {{/unless}}\n            {{#unless @disabled}}\n              <button type=\"button\" {{on \"click\" (fn this.deleteFile file)}} class=\"tpk-file-list-list-item-action-delete\">\n                <img src=\"/delete.svg\" alt=\"delete\" />\n              </button>\n            {{/unless}}\n          </div>\n        </div>\n      {{/each}}\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    on,
    fn
  })
}), _FileListComponent), _FileListComponent), _applyDecoratedDescriptor(_class.prototype, "deleteFile", [action], Object.getOwnPropertyDescriptor(_class.prototype, "deleteFile"), _class.prototype), _class);

export { FileListComponent, TpkValidationFileListComponent as default };
//# sourceMappingURL=tpk-validation-file-list.js.map
