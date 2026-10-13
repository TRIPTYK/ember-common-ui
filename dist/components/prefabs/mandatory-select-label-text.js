import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MandatorySelectLabelText = setComponentTemplate(precompileTemplate("<span ...attributes>\n  {{@labelText}}\n  {{#if @mandatory}}\n    <span class=\"mandatory\">*</span>\n  {{/if}}\n</span>", {
  strictMode: true
}), templateOnly());

export { MandatorySelectLabelText as default };
//# sourceMappingURL=mandatory-select-label-text.js.map
