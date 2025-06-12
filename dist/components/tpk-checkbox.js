import { a as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent } from './base.js';
import TpkCheckboxInputComponent from './tpk-checkbox-input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkCheckboxComponent;
let TpkCheckboxComponent = (_class = (_TpkCheckboxComponent = class TpkCheckboxComponent extends BaseUIComponent {
  constructor(owner, args) {
    super(owner, args);
    assert('@checked is required', typeof args.checked === 'boolean');
    assert('@label is required', args.label !== undefined);
  }
  onChange(e) {
    e.preventDefault();
    const target = e.target;
    this.args.onChange?.(target.checked, target.value, e);
  }
}, setComponentTemplate(precompileTemplate("\n    {{yield (hash Label=(component TpkLabel guid=this.guid checked=@checked label=@label) Input=(component TpkCheckboxInputComponent guid=this.guid checked=@checked disabled=@disabled changeEvent=this.changeEvent onChange=this.onChange) onChange=this.onChange changeEvent=this.changeEvent guid=this.guid)}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TpkLabel,
    TpkCheckboxInputComponent
  })
}), _TpkCheckboxComponent), _TpkCheckboxComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkCheckboxComponent as default };
//# sourceMappingURL=tpk-checkbox.js.map
