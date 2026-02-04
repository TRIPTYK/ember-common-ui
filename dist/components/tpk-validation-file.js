import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkFile from '@triptyk/ember-input/components/tpk-file';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationFileComponent extends BaseValidationComponent {
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
  static {
    n(this.prototype, "onChange", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkFile @disabled={{@disabled}} @label={{@label}} @onChange={{this.onChange}} @changeEvent={{@changeEvent}} @multiple={{@multiple}} as |I|>\n  {{yield (hash Input=I.Input Label=I.Label errors=this.errors hasError=this.hasError firstError=this.firstError)}}\n</TpkFile>", {
      strictMode: true,
      scope: () => ({
        TpkFile,
        hash
      })
    }), this);
  }
}

export { TpkValidationFileComponent as default };
//# sourceMappingURL=tpk-validation-file.js.map
