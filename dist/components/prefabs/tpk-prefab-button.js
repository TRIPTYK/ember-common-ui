import TpkButton from '../tpk-button.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkButtonPrefab = setComponentTemplate(precompileTemplate("<TpkButtonComponent @disabled={{@disabled}} @onClick={{@onClick}} class=\"tpk-button-container\" data-test-tpk-prefab-button-container ...attributes>\n  {{@label}}\n</TpkButtonComponent>", {
  strictMode: true,
  scope: () => ({
    TpkButtonComponent: TpkButton
  })
}), templateOnly());

export { TpkButtonPrefab as default };
//# sourceMappingURL=tpk-prefab-button.js.map
