import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const ChevronLeftIcon = setComponentTemplate(precompileTemplate("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" ...attributes>\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 19.5 8.25 12l7.5-7.5\" />\n</svg>", {
  strictMode: true
}), templateOnly());

export { ChevronLeftIcon as default };
//# sourceMappingURL=chevron-left.js.map
