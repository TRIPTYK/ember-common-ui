import { BaseValidation } from '../base.js';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkValidationErrors from './tpk-validation-errors.js';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import MandatorySelectLabel from './mandatory-select-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationSelectSearchPrefab extends BaseValidation {
  constructor(owner, args) {
    super(owner, args);
    assert('Please provide an @onSearch function', typeof args.onSearch === 'function');
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
    return String(v).toString();
  };
  static {
    setComponentTemplate(precompileTemplate("<div class=\"{{if @disabled \"disabled\"}} tpk-select-search-container\" data-has-error=\"{{this.hasError}}\" {{!-- @glint-expect-error --}} anchorScrollUp={{@validationField}} data-test-tpk-prefab-select-search-container={{@validationField}} ...attributes>\n  <TpkSelectComponent @multiple={{@multiple}} @placeholder={{@placeholder}} @initiallyOpened={{@initiallyOpened}} @allowClear={{@allowClear}} @labelComponent={{if @labelComponent @labelComponent (component MandatorySelectLabel mandatory=this.mandatory)}} @labelClass=\"tpk-label\" @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @label={{@label}} @options={{@options}} @onChange={{this.onChange}} @selected={{this.value}} @search={{@onSearch}} @searchEnabled={{true}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} @disabled={{@disabled}} as |S|>\n    <S.Option as |O|>\n      {{this.toString O.option}}\n    </S.Option>\n  </TpkSelectComponent>\n  <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{this.errors}} />\n</div>", {
      strictMode: true,
      scope: () => ({
        TpkSelectComponent,
        MandatorySelectLabel,
        TpkValidationErrorsComponent: TpkValidationErrors
      })
    }), this);
  }
}

export { TpkValidationSelectSearchPrefab as default };
//# sourceMappingURL=tpk-validation-select-search.js.map
