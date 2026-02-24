import { action } from '@ember/object';
import { BaseUIComponent } from './base.js';
import TpkTextareaInputComponent from './tpk-textarea/input.js';
import { hash } from '@ember/helper';
import TpkLabel from './tpk-label.js';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TpkTextareaComponent extends BaseUIComponent {
  static {
    g(this.prototype, "charCount", [tracked], function () {
      return 0;
    });
  }
  #charCount = (i(this, "charCount"), void 0);
  constructor(owner, args) {
    super(owner, args);
    assert('@label must be a string', typeof args.label === 'string');
  }
  onChange(e) {
    e.preventDefault();
    const {
      value
    } = e.target;
    this.args.onChange?.(value, e);
  }
  static {
    n(this.prototype, "onChange", [action]);
  }
  updateCharacterCount(e) {
    const {
      value
    } = e.target;
    this.charCount = value.length;
  }
  static {
    n(this.prototype, "updateCharacterCount", [action]);
  }
  setupCharacterCount(e) {
    this.charCount = e.value.length;
  }
  static {
    n(this.prototype, "setupCharacterCount", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash Label=(component TpkLabel guid=this.guid label=@label) Input=(component TpkTextareaInputComponent guid=this.guid value=@value updateCharacterCount=this.updateCharacterCount setupCharacterCount=this.setupCharacterCount maxLength=@maxLength changeEvent=this.changeEvent placeholder=@placeholder disabled=@disabled onChange=this.onChange) charCount=this.charCount maxLength=@maxLength changeEvent=this.changeEvent guid=this.guid onChange=this.onChange)}}", {
      strictMode: true,
      scope: () => ({
        hash,
        TpkLabel,
        TpkTextareaInputComponent
      })
    }), this);
  }
}

export { TpkTextareaComponent as default };
//# sourceMappingURL=tpk-textarea.js.map
