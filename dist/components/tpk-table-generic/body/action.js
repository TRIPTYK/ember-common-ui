import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TableGenericBodyAction = setComponentTemplate(precompileTemplate("<@Action @action={{@action}} @icon={{@icon}} ...attributes>\n  {{yield}}\n</@Action>", {
  strictMode: true
}), templateOnly());

export { TableGenericBodyAction as default };
//# sourceMappingURL=action.js.map
