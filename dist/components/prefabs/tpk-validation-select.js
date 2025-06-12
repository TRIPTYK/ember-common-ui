import { _ as _applyDecoratedDescriptor, a as _defineProperty } from '../../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { BaseValidationComponent } from '../base.js';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import { assert } from '@ember/debug';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationSelectPrefabComponent;
let TpkValidationSelectPrefabComponent = (_class = (_TpkValidationSelectPrefabComponent = class TpkValidationSelectPrefabComponent extends BaseValidationComponent {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "toString", v => {
      return String(v).toString();
    });
    assert('If you want use search, please use TpkValidationSelectSearchPrefab', typeof args.searchEnabled === 'undefined');
  }
  onChange(selection, select, event) {
    if (this.args.onChange) {
      return this.args.onChange(selection, select, event);
    }
    return this.args.changeset.set(this.args.validationField, selection);
  }
  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }
}, setComponentTemplate(precompileTemplate("\n    <div class=\"{{if @disabled \"disabled\"}} tpk-select-container\" anchorScrollUp={{@validationField}} data-has-error=\"{{this.hasError}}\" data-test-tpk-prefab-select-container ...attributes>\n      <TpkSelectComponent @label={{@label}} @multiple={{@multiple}} @disabled={{@disabled}} @placeholder={{@placeholder}} @initiallyOpened={{@initiallyOpened}} @allowClear={{@allowClear}} @options={{@options}} @onChange={{this.onChange}} @selected={{this.value}} @labelComponent={{@labelComponent}} @labelClass=\"tpk-label\" @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} as |S|>\n        <S.Option as |O|>\n          {{this.toString O.option}}\n        </S.Option>\n      </TpkSelectComponent>\n      <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{this.errors}} />\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkSelectComponent,
    TpkValidationErrorsComponent
  })
}), _TpkValidationSelectPrefabComponent), _TpkValidationSelectPrefabComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationSelectPrefabComponent as default };
//# sourceMappingURL=tpk-validation-select.js.map
