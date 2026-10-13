import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MandatoryLabel = setComponentTemplate(precompileTemplate("<div ...attributes>\n  <span>\n    {{@label}}\n    {{#if @mandatory}}\n      <span class=\"mandatory\">*</span>\n    {{/if}}\n  </span>\n</div>", {
  strictMode: true
}), templateOnly());

export { MandatoryLabel as default };
//# sourceMappingURL=mandatory-label.js.map
