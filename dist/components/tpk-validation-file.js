import { _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkFile from '@triptyk/ember-input/components/tpk-file';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationFileComponent;
let TpkValidationFileComponent = (_class = (_TpkValidationFileComponent = class TpkValidationFileComponent extends BaseValidationComponent {
  onChange(file) {
    if (this.args.onChange) {
      return this.args.onChange(file);
    }
    if (this.args.multiple === true) {
      const currentFiles = this.args.changeset.get(this.args.validationField) ?? [];
      return this.args.changeset.set(this.args.validationField, [...currentFiles, ...file]);
    } else {
      return this.args.changeset.set(this.args.validationField, file[0]);
    }
  }
}, setComponentTemplate(precompileTemplate("\n    <TpkFile @disabled={{@disabled}} @label={{@label}} @onChange={{this.onChange}} @changeEvent={{@changeEvent}} @multiple={{@multiple}} as |I|>\n      {{yield (hash Input=I.Input Label=I.Label errors=this.errors hasError=this.hasError firstError=this.firstError)}}\n    </TpkFile>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkFile,
    hash
  })
}), _TpkValidationFileComponent), _TpkValidationFileComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationFileComponent as default };
//# sourceMappingURL=tpk-validation-file.js.map
