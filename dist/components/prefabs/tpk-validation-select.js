import { action } from '@ember/object';
import { BaseValidation } from '../base.js';
import TpkValidationErrors from './tpk-validation-errors.js';
import { assert } from '@ember/debug';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import MandatorySelectLabel from './mandatory-select-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationSelectPrefab extends BaseValidation {
  constructor(owner, args) {
    super(owner, args);
    assert('If you want use search, please use TpkValidationSelectSearchPrefab', typeof args.searchEnabled === 'undefined');
  }
  onChange(selection, select, event) {
    if (this.args.onChange) {
      return this.args.onChange(selection, select, event);
    }
    return this.args.changeset.set(this.args.validationField, selection);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  toString = v => {
    assert('TpkValidationSelectPrefab toString: object has no custom toString method, returning [object Object]',
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    !(v && typeof v === 'object' && v.toString() === '[object Object]'));
    return String(v).toString();
  };
  static {
    setComponentTemplate(precompileTemplate("<div class=\"{{if @disabled \"disabled\"}} tpk-select-container\" {{!-- @glint-expect-error --}} anchorScrollUp={{@validationField}} data-has-error=\"{{this.hasError}}\" data-test-tpk-prefab-select-container={{@validationField}} ...attributes>\n  <TpkSelectComponent @label={{@label}} @multiple={{@multiple}} @disabled={{@disabled}} @placeholder={{@placeholder}} @initiallyOpened={{@initiallyOpened}} @allowClear={{@allowClear}} @options={{@options}} @onChange={{this.onChange}} @selected={{this.value}} @labelComponent={{if @labelComponent @labelComponent (component MandatorySelectLabel mandatory=this.mandatory)}} @labelClass=\"tpk-label\" @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} as |S|>\n    <S.Option as |O|>\n      {{this.toString O.option}}\n    </S.Option>\n  </TpkSelectComponent>\n  <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{this.errors}} />\n</div>", {
      strictMode: true,
      scope: () => ({
        TpkSelectComponent,
        MandatorySelectLabel,
        TpkValidationErrorsComponent: TpkValidationErrors
      })
    }), this);
  }
}

export { TpkValidationSelectPrefab as default };
//# sourceMappingURL=tpk-validation-select.js.map
