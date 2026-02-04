import { on } from '@ember/modifier';
import Component from '@glimmer/component';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkRadioInputComponent extends Component {
  get isChecked() {
    return this.args.value === this.args.selected;
  }
  static {
    setComponentTemplate(precompileTemplate("<input id={{@guid}} name={{@name}} value={{@value}} checked={{this.isChecked}} disabled={{@disabled}} type=\"radio\" {{on @changeEvent @onChange}} ...attributes data-test-tpk-radio-input />", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { TpkRadioInputComponent as default };
//# sourceMappingURL=input.js.map
