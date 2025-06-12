import { BaseUIComponent } from './base.js';
import { assert } from '@ember/debug';
import TpkInputInputComponent from './tpk-input/input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkInputComponent;
class TpkInputComponent extends BaseUIComponent {
  constructor(owner, args) {
    super(owner, args);
    assert('@label must be a string', typeof args.label === 'string');
    if (args.type === 'number') {
      assert('@value must be a number', typeof args.value === 'number' || args.value === undefined || args.value === null);
    }
  }
}
_TpkInputComponent = TpkInputComponent;
setComponentTemplate(precompileTemplate("\n    {{yield (hash Input=(component TpkInputInputComponent onChange=@onChange type=@type mask=@mask maskOptions=@maskOptions unmaskValue=@unmaskValue placeholder=@placeholder changeEvent=this.changeEvent min=@min step=@step max=@max value=@value disabled=@disabled guid=this.guid) Label=(component TpkLabel label=@label guid=this.guid) changeEvent=this.changeEvent guid=this.guid)}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash,
    TpkInputInputComponent,
    TpkLabel
  })
}), _TpkInputComponent);

export { TpkInputComponent as default };
//# sourceMappingURL=tpk-input.js.map
