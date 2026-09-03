import { BaseUI } from './base.js';
import { assert } from '@ember/debug';
import TpkInputInput from './tpk-input/input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkInput extends BaseUI {
  constructor(owner, args) {
    super(owner, args);
    assert('@label must be a string', typeof args.label === 'string');
    if (args.type === 'number') {
      assert('@value must be a number', typeof args.value === 'number' || args.value === undefined || args.value === null);
    }
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash Input=(component TpkInputInputComponent onChange=@onChange type=@type mask=@mask maskOptions=@maskOptions unmaskValue=@unmaskValue placeholder=@placeholder changeEvent=this.changeEvent min=@min step=@step max=@max value=@value disabled=@disabled guid=this.guid) Label=(component TpkLabel label=@label guid=this.guid) changeEvent=this.changeEvent guid=this.guid)}}", {
      strictMode: true,
      scope: () => ({
        hash,
        TpkInputInputComponent: TpkInputInput,
        TpkLabel
      })
    }), this);
  }
}

export { TpkInput as default };
//# sourceMappingURL=tpk-input.js.map
