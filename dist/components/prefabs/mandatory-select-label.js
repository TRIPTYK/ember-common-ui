import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import MandatorySelectLabelText from './mandatory-select-label-text.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime-esm';

class MandatorySelectLabel extends Component {
  onLabelClick(e) {
    const select = this.args.select;
    if (!select) {
      return;
    }
    select.actions.labelClick(e);
  }
  static {
    n(this.prototype, "onLabelClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<label id={{@labelId}} class=\"ember-power-select-label\" for={{@triggerId}} {{on \"click\" this.onLabelClick}} ...attributes>\n  <MandatorySelectLabelText @labelText={{@labelText}} @mandatory={{@mandatory}} />\n</label>", {
      strictMode: true,
      scope: () => ({
        on,
        MandatorySelectLabelText
      })
    }), this);
  }
}

export { MandatorySelectLabel as default };
//# sourceMappingURL=mandatory-select-label.js.map
