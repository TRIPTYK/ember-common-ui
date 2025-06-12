import { _ as _defineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import 'ember-power-select/components/power-select';
import PowerSelectMultipleWithCreate from 'ember-power-select-with-create/components/power-select-multiple-with-create';
import PowerSelectWithCreate from 'ember-power-select-with-create/components/power-select-with-create';
import TpkSelectOption from './tpk-select/option.js';
import { guidFor } from '@ember/object/internals';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkSelectCreateComponent;
class TpkSelectCreateComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "guid", guidFor(this));
    assert('Please provide an @options array to component', args.options !== undefined);
    assert('Please provide an @onChange function', typeof args.onChange === 'function');
    assert('Please provide an @onCreate function', typeof args.onCreate === 'function');
  }
  get renderInPlace() {
    return this.args.renderInPlace === false ? false : true;
  }
}
_TpkSelectCreateComponent = TpkSelectCreateComponent;
setComponentTemplate(precompileTemplate("\n    <div class=\"tpk-select-create\" ...attributes>\n      <label class=\"tpk-select-create-label\" for={{this.guid}}>\n        {{@label}}\n      </label>\n      {{#if @multiple}}\n        <PowerSelectMultipleWithCreate @placeholder={{@placeholder}} @options={{@options}} @selected={{@selected}} @allowClear={{@allowClear}} @onChange={{@onChange}} @ariaLabelledBy={{this.guid}} @ariaLabel={{this.guid}} @onCreate={{@onCreate}} @renderInPlace={{this.renderInPlace}} @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} @onKeydown={{@onKeyDown}} @disabled={{@disabled}} @dropdownClass=\"tpk-select-create-dropdown\" @triggerClass=\"tpk-select-create-trigger\" @buildSuggestion={{@buildSuggestion}} @showCreateWhen={{@showCreateWhen}} @initiallyOpened={{@initiallyOpened}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} @triggerId={{this.guid}} as |option|>\n          {{yield (hash Option=(component TpkSelectOption option=option))}}\n        </PowerSelectMultipleWithCreate>\n      {{else}}\n        <PowerSelectWithCreate @placeholder={{@placeholder}} @options={{@options}} @selected={{@selected}} @allowClear={{@allowClear}} @onChange={{@onChange}} @ariaLabelledBy={{this.guid}} @ariaLabel={{this.guid}} @onCreate={{@onCreate}} @renderInPlace={{this.renderInPlace}} @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} @onKeydown={{@onKeyDown}} @disabled={{@disabled}} @dropdownClass=\"tpk-select-create-dropdown\" @triggerClass=\"tpk-select-create-trigger\" @buildSuggestion={{@buildSuggestion}} @showCreateWhen={{@showCreateWhen}} @initiallyOpened={{@initiallyOpened}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} @triggerId={{this.guid}} as |option|>\n          {{yield (hash Option=(component TpkSelectOption option=option))}}\n        </PowerSelectWithCreate>\n      {{/if}}\n    </div>\n  ", {
  strictMode: true,
  scope: () => ({
    PowerSelectMultipleWithCreate,
    hash,
    TpkSelectOption,
    PowerSelectWithCreate
  })
}), _TpkSelectCreateComponent);

export { TpkSelectCreateComponent as default };
//# sourceMappingURL=tpk-select-create.js.map
