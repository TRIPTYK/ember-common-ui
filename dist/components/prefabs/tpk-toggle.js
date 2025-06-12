import TpkCheckboxComponent from '../tpk-checkbox.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkTogglePrefabComponent = setComponentTemplate(precompileTemplate("\n  <TpkCheckboxComponent @disabled={{@disabled}} @checked={{@checked}} @label={{@label}} @onChange={{@onChange}} as |C|>\n    <div class=\"tpk-toggle-container\" data-test-tpk-prefab-toggle-container ...attributes>\n      <C.Label class=\"tpk-toggle-label-container\">\n        <span class=\"tpk-toggle-label\">{{@label}}</span>\n        <C.Input class=\"tpk-toggle-input\" />\n      </C.Label>\n    </div>\n  </TpkCheckboxComponent>\n", {
  strictMode: true,
  scope: () => ({
    TpkCheckboxComponent
  })
}), templateOnly());

export { TpkTogglePrefabComponent as default };
//# sourceMappingURL=tpk-toggle.js.map
