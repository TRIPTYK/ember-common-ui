import TpkButtonComponent from '../tpk-button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkButtonPrefabComponent = setComponentTemplate(precompileTemplate("\n  <TpkButtonComponent @label={{@label}} @disabled={{@disabled}} @onClick={{@onClick}} class=\"tpk-button-container\" data-test-tpk-prefab-button-container ...attributes>\n    {{@label}}\n  </TpkButtonComponent>\n", {
  strictMode: true,
  scope: () => ({
    TpkButtonComponent
  })
}), templateOnly());

export { TpkButtonPrefabComponent as default };
//# sourceMappingURL=tpk-prefab-button.js.map
