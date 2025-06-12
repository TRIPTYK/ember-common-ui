import { _ as _defineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import perform from 'ember-concurrency/helpers/perform';
import 'ember-concurrency';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkButtonComponent;
class TpkButtonComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "guid", guidFor(this));
    _defineProperty(this, "performClick", buildTask(() => ({
      context: this,
      generator: function* (e) {
        return this.args.onClick?.(e);
      }
    }), {
      drop: true
    }, "performClick", null));
    _defineProperty(this, "onClick", buildTask(() => ({
      context: this,
      generator: function* (e) {
        if (this.args.allowSpam !== true) {
          return this.performClick.perform(e);
        }
        return this.args.onClick?.(e);
      }
    }), null, "onClick", null));
  }
  get disabled() {
    return this.args.disabled ?? false;
  }
}
_TpkButtonComponent = TpkButtonComponent;
setComponentTemplate(precompileTemplate("\n    <button id={{this.guid}} disabled={{this.disabled}} type=\"button\" class=\"tpk-button\" {{on \"click\" (perform this.onClick)}} data-test-tpk-button ...attributes>\n      {{yield}}\n    </button>\n  ", {
  strictMode: true,
  scope: () => ({
    on,
    perform
  })
}), _TpkButtonComponent);

export { TpkButtonComponent as default };
//# sourceMappingURL=tpk-button.js.map
