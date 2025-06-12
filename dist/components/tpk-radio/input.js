import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkRadioInputComponent;
class TpkRadioInputComponent extends Component {
  get isChecked() {
    return this.args.value === this.args.selected;
  }
}
_TpkRadioInputComponent = TpkRadioInputComponent;
setComponentTemplate(precompileTemplate("\n    <input id={{@guid}} name={{@name}} value={{@value}} checked={{this.isChecked}} disabled={{@disabled}} type=\"radio\" {{on @changeEvent @onChange}} ...attributes data-test-tpk-radio-input />\n  ", {
  strictMode: true,
  scope: () => ({
    on
  })
}), _TpkRadioInputComponent);

export { TpkRadioInputComponent as default };
//# sourceMappingURL=input.js.map
