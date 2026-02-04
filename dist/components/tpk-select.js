import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import PowerSelect from 'ember-power-select/components/power-select';
import TpkSelectOption from './tpk-select/option.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkSelectComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    assert('Please provide an @options array to component', args.options !== undefined);
    assert('Please provide an @onChange function', typeof args.onChange === 'function');
  }
  get renderInPlace() {
    return this.args.renderInPlace === false ? false : true;
  }
  get multiple() {
    return this.args.multiple === true ? undefined : false;
  }
  static {
    setComponentTemplate(precompileTemplate("<PowerSelect @labelText={{@label}} @options={{@options}} @selected={{@selected}} @placeholder={{@placeholder}} @allowClear={{@allowClear}} @onChange={{@onChange}} @labelClass={{@labelClass}} @multiple={{this.multiple}} @renderInPlace={{this.renderInPlace}} {{!-- @glint-ignore --}} @labelComponent={{@labelComponent}} {{!-- @glint-ignore --}} @selectedItemComponent={{@selectedItemComponent}} {{!-- @glint-ignore --}} @placeholderComponent={{@placeholderComponent}} @searchEnabled={{@searchEnabled}} @searchField={{@searchField}} @searchPlaceholder={{@searchPlaceholder}} @searchMessage={{@searchMessage}} @search={{@search}} @onKeydown={{@onKeyDown}} @disabled={{@disabled}} @dropdownClass=\"tpk-select-dropdown\" @triggerClass=\"tpk-select-trigger\" @initiallyOpened={{@initiallyOpened}} @loadingMessage={{@loadingMessage}} @noMatchesMessage={{@noMatchesMessage}} as |option|>\n  {{yield (hash Option=(component TpkSelectOption option=option))}}\n</PowerSelect>", {
      strictMode: true,
      scope: () => ({
        PowerSelect,
        hash,
        TpkSelectOption
      })
    }), this);
  }
}

export { TpkSelectComponent as default };
//# sourceMappingURL=tpk-select.js.map
