import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TpkTextareaInputComponent extends Component {
  setupCharCount = modifier(element => {
    this.args.setupCharacterCount(element);
  });
  static {
    setComponentTemplate(precompileTemplate("<textarea placeholder={{@placeholder}} id={{@guid}} value={{@value}} maxlength={{@maxLength}} {{on \"input\" @updateCharacterCount}} {{this.setupCharCount}} {{on @changeEvent @onChange}} disabled={{@disabled}} ...attributes data-test-tpk-textarea-input></textarea>", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { TpkTextareaInputComponent as default };
//# sourceMappingURL=input.js.map
