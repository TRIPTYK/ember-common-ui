import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const MandatoryLabelComponent = setComponentTemplate(precompileTemplate("\n    <div ...attributes>\n      <span>\n          {{@label}}\n          {{#if @mandatory}}\n            <span class=\"mandatory\">*</span>\n          {{/if}}\n      </span>\n    </div>\n", {
  strictMode: true
}), templateOnly());

export { MandatoryLabelComponent as default };
//# sourceMappingURL=mandatory-label.js.map
