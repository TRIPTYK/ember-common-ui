import { _ as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DbQ2dxyI.js';
import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkValidationSelect;
let TpkValidationSelect = (_class = (_TpkValidationSelect = class TpkValidationSelect extends BaseValidationComponent {
  onChange(selection, select, event) {
    if (this.args.onChange) {
      return this.args.onChange(selection, select, event);
    }
    return this.args.changeset.set(this.args.validationField, selection);
  }
  get label() {
    return this.mandatory ? `${this.args.label} *` : this.args.label;
  }
}, setComponentTemplate(precompileTemplate("\n    <div class=\"{{if @disabled \"disabled\"}} tpk-validation-select\" data-has-error=\"{{this.hasError}}\" anchorScrollUp={{@validationField}} ...attributes>\n      <TpkSelectComponent @multiple={{@multiple}} @onChange={{this.onChange}} @label={{this.label}} @options={{@options}} @placeholder={{@placeholder}} @selected={{this.value}} @allowClear={{@allowClear}} @renderInPlace={{@renderInPlace}} @labelComponent={{@labelComponent}} @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} @onKeyDown={{@onKeyDown}} @disabled={{@disabled}} @initiallyOpened={{@initiallyOpened}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} as |I|>\n        {{yield (hash Option=I.Option errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n      </TpkSelectComponent>\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    TpkSelectComponent,
    hash
  })
}), _TpkValidationSelect), _TpkValidationSelect), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkValidationSelect as default };
//# sourceMappingURL=tpk-validation-select.js.map
