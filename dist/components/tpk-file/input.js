import templateOnly from '@ember/component/template-only';
import { on } from '@ember/modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkFileInputComponent = setComponentTemplate(precompileTemplate("<input id={{@guid}} multiple={{@multiple}} {{on @changeEvent @onChange}} accept={{@accept}} disabled={{@disabled}} type=\"file\" ...attributes data-test-tpk-file-input />", {
  strictMode: true,
  scope: () => ({
    on
  })
}), templateOnly());

export { TpkFileInputComponent as default };
//# sourceMappingURL=input.js.map
