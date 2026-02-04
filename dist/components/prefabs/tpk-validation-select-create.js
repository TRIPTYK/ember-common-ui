import { BaseValidationComponent } from '../base.js';
import TpkSelectCreateComponent from '@triptyk/ember-input/components/tpk-select-create';
import TpkValidationErrorsComponent from './tpk-validation-errors.js';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkValidationSelectCreatePrefabComponent extends BaseValidationComponent {
  constructor(owner, args) {
    super(owner, args);
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
  static {
    n(this.prototype, "onChange", [action]);
  }
  toString = v => {
    return String(v).toString();
  };
  static {
    setComponentTemplate(precompileTemplate("<div class=\"{{if @disabled \"disabled\"}} tpk-select-create-container\" data-has-error=\"{{this.hasError}}\" {{!-- @glint-expect-error --}} anchorScrollUp={{@validationField}} data-test-tpk-prefab-select-create-container={{@validationField}} ...attributes>\n  <TpkSelectCreateComponent @label={{this.label}} @multiple={{@multiple}} @disabled={{@disabled}} @placeholder={{@placeholder}} @initiallyOpened={{@initiallyOpened}} @allowClear={{@allowClear}} @selected={{this.value}} @options={{@options}} @onChange={{this.onChange}} @onCreate={{@onCreate}} @labelComponent={{@labelComponent}} @labelClass=\"tpk-label\" @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @buildSuggestion={{@buildSuggestion}} @showCreateWhen={{@showCreateWhen}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} as |S|>\n    <S.Option as |O|>\n      {{this.toString O.option}}\n    </S.Option>\n  </TpkSelectCreateComponent>\n  <TpkValidationErrorsComponent class=\"tpk-validation-errors\" @errors={{this.errors}} />\n</div>", {
      strictMode: true,
      scope: () => ({
        TpkSelectCreateComponent,
        TpkValidationErrorsComponent
      })
    }), this);
  }
}

export { TpkValidationSelectCreatePrefabComponent as default };
//# sourceMappingURL=tpk-validation-select-create.js.map
