import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { BaseValidationComponent } from '../base.js';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationSelectSearchPrefabComponent;
let TpkValidationSelectSearchPrefabComponent = (_class = (_TpkValidationSelectSearchPrefabComponent = class TpkValidationSelectSearchPrefabComponent extends BaseValidationComponent {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "toString", v => {
      return String(v).toString();
    });
    assert('Please provide an @onSearch function', typeof args.onSearch === 'function');
  }
  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }
  onChange(selection, select, event) {
    if (this.args.onChange) {
      return this.args.onChange(selection, select, event);
    }
    return this.args.changeset.set(this.args.validationField, selection);
  }
}, setComponentTemplate(precompileTemplate("\n    <div class=\"{{if @disabled \"disabled\"}} tpk-select-search-container\" data-has-error=\"{{this.hasError}}\" anchorScrollUp={{@validationField}} data-test-tpk-prefab-select-search-container ...attributes>\n      <TpkSelectComponent @multiple={{@multiple}} @placeholder={{@placeholder}} @initiallyOpened={{@initiallyOpened}} @allowClear={{@allowClear}} @labelComponent={{@labelComponent}} @labelClass=\"tpk-label\" @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @label={{this.label}} @options={{@options}} @onChange={{this.onChange}} @selected={{this.value}} @search={{@onSearch}} @searchEnabled={{true}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} @disabled={{@disabled}} as |S|>\n        <S.Option as |O|>\n          {{this.toString O.option}}\n        </S.Option>\n      </TpkSelectComponent>\n      <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{this.errors}} />\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkSelectComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationSelectSearchPrefabComponent), _TpkValidationSelectSearchPrefabComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationSelectSearchPrefabComponent as default };
//# sourceMappingURL=tpk-validation-select-search.js.map
