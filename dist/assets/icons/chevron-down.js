import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const ChevronDownIcon = setComponentTemplate(precompileTemplate("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" ...attributes>\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m19.5 8.25-7.5 7.5-7.5-7.5\" />\n</svg>", {
  strictMode: true
}), templateOnly());

export { ChevronDownIcon as default };
//# sourceMappingURL=chevron-down.js.map
