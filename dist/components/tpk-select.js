import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import PowerSelect from 'ember-power-select/components/power-select';
export { Select } from 'ember-power-select/components/power-select';
import PowerSelectMultiple from 'ember-power-select/components/power-select-multiple';
import TpkSelectOption from './tpk-select/option.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkSelectComponent;
class TpkSelectComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    assert('Please provide an @options array to component', args.options !== undefined);
    assert('Please provide an @onChange function', typeof args.onChange === 'function');
  }
  get renderInPlace() {
    return this.args.renderInPlace === false ? false : true;
  }
}
_TpkSelectComponent = TpkSelectComponent;
setComponentTemplate(precompileTemplate("\n    {{#if @multiple}}\n      <PowerSelectMultiple @labelText={{@label}} @options={{@options}} @selected={{@selected}} @allowClear={{@allowClear}} @onChange={{@onChange}} @placeholder={{@placeholder}} @labelClass={{@labelClass}} @renderInPlace={{this.renderInPlace}} @labelComponent={{@labelComponent}} @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} @onKeydown={{@onKeyDown}} @disabled={{@disabled}} @dropdownClass=\"tpk-select-dropdown\" @triggerClass=\"tpk-select-trigger\" @initiallyOpened={{@initiallyOpened}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} as |option|>\n        {{yield (hash Option=(component TpkSelectOption option=option))}}\n      </PowerSelectMultiple>\n    {{else}}\n      <PowerSelect @labelText={{@label}} @options={{@options}} @selected={{@selected}} @placeholder={{@placeholder}} @allowClear={{@allowClear}} @onChange={{@onChange}} @labelClass={{@labelClass}} @renderInPlace={{this.renderInPlace}} @labelComponent={{@labelComponent}} @selectedItemComponent={{@selectedItemComponent}} @placeholderComponent={{@placeholderComponent}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} @onKeydown={{@onKeyDown}} @disabled={{@disabled}} @dropdownClass=\"tpk-select-dropdown\" @triggerClass=\"tpk-select-trigger\" @initiallyOpened={{@initiallyOpened}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} as |option|>\n        {{yield (hash Option=(component TpkSelectOption option=option))}}\n      </PowerSelect>\n    {{/if}}\n  ", {
  strictMode: true,
  scope: () => ({
    PowerSelectMultiple,
    hash,
    TpkSelectOption,
    PowerSelect
  })
}), _TpkSelectComponent);

export { TpkSelectComponent as default };
//# sourceMappingURL=tpk-select.js.map
