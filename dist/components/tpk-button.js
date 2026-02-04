import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import perform from 'ember-concurrency/helpers/perform';
import { task } from 'ember-concurrency';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkButtonComponent extends Component {
  guid = guidFor(this);
  performClick = task(this, {
    drop: true
  }, async e => {
    return this.args.onClick?.(e);
  });
  onClick = task(this, async e => {
    if (this.args.allowSpam !== true) {
      return this.performClick.perform(e);
    }
    return this.args.onClick?.(e);
  });
  get disabled() {
    return this.args.disabled ?? false;
  }
  static {
    setComponentTemplate(precompileTemplate("<button id={{this.guid}} disabled={{this.disabled}} type=\"button\" class=\"tpk-button\" {{on \"click\" (perform this.onClick)}} data-test-tpk-button ...attributes>\n  {{yield}}\n</button>", {
      strictMode: true,
      scope: () => ({
        on,
        perform
      })
    }), this);
  }
}

export { TpkButtonComponent as default };
//# sourceMappingURL=tpk-button.js.map
