import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkRadio from '@triptyk/ember-input/components/tpk-radio';
import { hash } from '@ember/helper';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationRadioGroupComponent extends BaseValidationComponent {
  onChange(value) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    const changeset = this.args.changeset.set(this.args.validationField, value);
    return changeset;
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  get selected() {
    if (this.args.changeset.get(this.args.validationField)) {
      assert('The changeset value must be a string', typeof this.args.changeset.get(this.args.validationField) === 'string');
      return this.args.changeset.get(this.args.validationField);
    }
    return undefined;
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash Radio=(component TpkRadio classless=@classless disabled=@disabled name=@validationField selected=this.selected onChange=this.onChange) selected=this.selected onChange=this.onChange errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}", {
      strictMode: true,
      scope: () => ({
        hash,
        TpkRadio
      })
    }), this);
  }
}

export { TpkValidationRadioGroupComponent as default };
//# sourceMappingURL=tpk-validation-radio-group.js.map
