import { a as _applyDecoratedDescriptor } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent } from './base.js';
import TpkRadioInputComponent from './tpk-radio/input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _class, _TpkRadioComponent;
let TpkRadioComponent = (_class = (_TpkRadioComponent = class TpkRadioComponent extends BaseUIComponent {
  constructor(owner, args) {
    super(owner, args);
    assert('@name is required', args.name !== undefined);
    assert('@value is required', args.value !== undefined);
    assert('@label is required', args.label !== undefined);
  }
  onChange(e) {
    e.preventDefault();
    const target = e.target;
    this.args.onChange?.(target.value, e);
  }
}, setComponentTemplate(precompileTemplate("\n    {{yield (hash Label=(component TpkLabel guid=this.guid label=@label) Input=(component TpkRadioInputComponent guid=this.guid selected=@selected disabled=@disabled name=@name value=@value changeEvent=this.changeEvent onChange=this.onChange) onChange=this.onChange changeEvent=this.changeEvent guid=this.guid)}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TpkLabel,
    TpkRadioInputComponent
  })
}), _TpkRadioComponent), _TpkRadioComponent), _applyDecoratedDescriptor(_class.prototype, "onChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onChange"), _class.prototype), _class);

export { TpkRadioComponent as default };
//# sourceMappingURL=tpk-radio.js.map
