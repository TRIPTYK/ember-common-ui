import { action } from '@ember/object';
import { BaseValidationComponent } from './base.js';
import TpkSelectComponent from '@triptyk/ember-input/components/tpk-select';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationSelect extends BaseValidationComponent {
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
  static {
    setComponentTemplate(precompileTemplate("<div class=\"{{if @disabled \"disabled\"}} tpk-validation-select\" data-has-error=\"{{this.hasError}}\" {{!-- @glint-expect-error --}} anchorScrollUp={{@validationField}} ...attributes>\n  <TpkSelectComponent @multiple={{@multiple}} @onChange={{this.onChange}} @label={{this.label}} @options={{@options}} @placeholder={{@placeholder}} @selected={{this.value}} @allowClear={{@allowClear}} @renderInPlace={{@renderInPlace}} @labelComponent={{@labelComponent}} @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} @onKeyDown={{@onKeyDown}} @disabled={{@disabled}} @initiallyOpened={{@initiallyOpened}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} as |I|>\n    {{yield (hash Option=I.Option errors=this.errors hasError=this.hasError firstError=this.firstError mandatory=this.mandatory)}}\n  </TpkSelectComponent>\n</div>", {
      strictMode: true,
      scope: () => ({
        TpkSelectComponent,
        hash
      })
    }), this);
  }
}

export { TpkValidationSelect as default };
//# sourceMappingURL=tpk-validation-select.js.map
