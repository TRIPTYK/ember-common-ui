import { action } from '@ember/object';
import { BaseValidationComponent } from '../base.js';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import { assert } from '@ember/debug';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationSelectPrefabComponent extends BaseValidationComponent {
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
  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }
  toString = v => {
    assert('TpkValidationSelectPrefab toString: object has no custom toString method, returning [object Object]',
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    !(v && typeof v === 'object' && v.toString() === '[object Object]'));
    return String(v).toString();
  };
  static {
    setComponentTemplate(precompileTemplate("<div class=\"{{if @disabled \"disabled\"}} tpk-select-container\" {{!-- @glint-expect-error --}} anchorScrollUp={{@validationField}} data-has-error=\"{{this.hasError}}\" data-test-tpk-prefab-select-container={{@validationField}} ...attributes>\n  <TpkSelectComponent @label={{this.label}} @multiple={{@multiple}} @disabled={{@disabled}} @placeholder={{@placeholder}} @initiallyOpened={{@initiallyOpened}} @allowClear={{@allowClear}} @options={{@options}} @onChange={{this.onChange}} @selected={{this.value}} @labelComponent={{@labelComponent}} @labelClass=\"tpk-label\" @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} as |S|>\n    <S.Option as |O|>\n      {{this.toString O.option}}\n    </S.Option>\n  </TpkSelectComponent>\n  <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{this.errors}} />\n</div>", {
      strictMode: true,
      scope: () => ({
        TpkSelectComponent,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationSelectPrefabComponent as default };
//# sourceMappingURL=tpk-validation-select.js.map
