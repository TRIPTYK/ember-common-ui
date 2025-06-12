import templateOnly from '@ember/component/template-only';
import { on } from '@ember/modifier';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkTextareaInputComponent = setComponentTemplate(precompileTemplate("\n    <textarea placeholder={{@placeholder}} id={{@guid}} value={{@value}} maxLength={{@maxLength}} {{on \"input\" @updateCharacterCount}} {{didInsert @setupCharacterCount}} {{didUpdate @setupCharacterCount @value}} {{on @changeEvent @onChange}} disabled={{@disabled}} ...attributes data-test-tpk-textarea-input></textarea>\n  ", {
  strictMode: true,
  scope: () => ({
    on,
    didInsert,
    didUpdate
  })
}), templateOnly());

export { TpkTextareaInputComponent as default };
//# sourceMappingURL=input.js.map
