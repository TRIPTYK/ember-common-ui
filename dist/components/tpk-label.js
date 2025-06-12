import templateOnly from '@ember/component/template-only';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

const TpkLabel = setComponentTemplate(precompileTemplate("\n  <label for={{@guid}} ...attributes data-test-tpk-label>\n    {{#if (has-block)}}\n      {{yield}}\n    {{else}}\n      {{@label}}\n    {{/if}}\n  </label>\n", {
  strictMode: true
}), templateOnly());

export { TpkLabel as default };
//# sourceMappingURL=tpk-label.js.map
