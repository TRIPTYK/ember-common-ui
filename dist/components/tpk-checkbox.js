import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { BaseUIComponent } from './base.js';
import TpkCheckboxInputComponent from './tpk-checkbox-input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class TpkCheckboxComponent extends BaseUIComponent {
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
  static {
    n(this.prototype, "onChange", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash Label=(component TpkLabel guid=this.guid checked=@checked label=@label) Input=(component TpkCheckboxInputComponent guid=this.guid checked=@checked disabled=@disabled changeEvent=this.changeEvent onChange=this.onChange) onChange=this.onChange changeEvent=this.changeEvent guid=this.guid)}}", {
      strictMode: true,
      scope: () => ({
        hash,
        TpkLabel,
        TpkCheckboxInputComponent
      })
    }), this);
  }
}

export { TpkCheckboxComponent as default };
//# sourceMappingURL=tpk-checkbox.js.map
