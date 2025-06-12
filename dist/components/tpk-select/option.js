import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TpkSelectOption = setComponentTemplate(precompileTemplate("\n    {{yield (hash option=@option)}}\n  ", {
  strictMode: true,
  scope: () => ({
    hash
  })
}), templateOnly());

export { TpkSelectOption as default };
//# sourceMappingURL=option.js.map
