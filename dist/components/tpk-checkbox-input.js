import { on } from '@ember/modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkCheckboxInput = setComponentTemplate(precompileTemplate("<input id={{@guid}} checked={{@checked}} disabled={{@disabled}} type=\"checkbox\" {{on @changeEvent @onChange}} ...attributes data-test-tpk-checkbox-input />", {
  strictMode: true,
  scope: () => ({
    on
  })
}), templateOnly());

export { TpkCheckboxInput as default };
//# sourceMappingURL=tpk-checkbox-input.js.map
