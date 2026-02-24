import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import PowerSelectWithCreate from 'ember-power-select-with-create/components/power-select-with-create';
import TpkSelectOption from './tpk-select/option.js';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkSelectCreateComponent extends Component {
  guid = guidFor(this);
  constructor(owner, args) {
    super(owner, args);
    assert('Please provide an @options array to component', args.options !== undefined);
    assert('Please provide an @onChange function', typeof args.onChange === 'function');
    assert('Please provide an @onCreate function', typeof args.onCreate === 'function');
  }
  get renderInPlace() {
    return this.args.renderInPlace === false ? false : true;
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"tpk-select-create\" ...attributes>\n  <label class=\"tpk-select-create-label\" for={{this.guid}}>\n    {{@label}}\n  </label>\n  <PowerSelectWithCreate @placeholder={{@placeholder}} @options={{@options}} @multiple={{@multiple}} @selected={{@selected}} @allowClear={{@allowClear}} @onChange={{@onChange}} @ariaLabelledBy={{this.guid}} @ariaLabel={{this.guid}} @onCreate={{@onCreate}} @renderInPlace={{this.renderInPlace}} @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} @onKeydown={{@onKeyDown}} @disabled={{@disabled}} @dropdownClass=\"tpk-select-create-dropdown\" @triggerClass=\"tpk-select-create-trigger\" @buildSuggestion={{@buildSuggestion}} @showCreateWhen={{@showCreateWhen}} @initiallyOpened={{@initiallyOpened}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} @triggerId={{this.guid}} as |option|>\n    {{yield (hash Option=(component TpkSelectOption option=option))}}\n  </PowerSelectWithCreate>\n</div>", {
      strictMode: true,
      scope: () => ({
        PowerSelectWithCreate,
        hash,
        TpkSelectOption
      })
    }), this);
  }
}

export { TpkSelectCreateComponent as default };
//# sourceMappingURL=tpk-select-create.js.map
