import { _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkRadio from '@triptyk/ember-input/components/tpk-radio';
import { hash } from '@ember/helper';
import { assert } from '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationRadioGroupComponent;
let TpkValidationRadioGroupComponent = (_class = (_TpkValidationRadioGroupComponent = class TpkValidationRadioGroupComponent extends BaseValidationComponent {
  onChange(value) {
    if (this.args.onChange) {
      return this.args.onChange(value);
    }
    const changeset = this.args.changeset.set(this.args.validationField, value);
    return changeset;
  }
  get selected() {
    if (this.args.changeset.get(this.args.validationField)) {
      assert('The changeset value must be a string', typeof this.args.changeset.get(this.args.validationField) === 'string');
      return this.args.changeset.get(this.args.validationField);
    }
    return undefined;
  }
}, setComponentTemplate(precompileTemplate("\n    {{yield (hash Radio=(component TpkRadio classless=@classless disabled=@disabled name=@validationField selected=this.selected onChange=this.onChange) selected=this.selected onChange=this.onChange errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TpkRadio
  })
}), _TpkValidationRadioGroupComponent), _TpkValidationRadioGroupComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationRadioGroupComponent as default };
//# sourceMappingURL=tpk-validation-radio-group.js.map
