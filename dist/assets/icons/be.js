import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const BeIcon = setComponentTemplate(precompileTemplate("<svg width=\"20\" height=\"15\" viewBox=\"0 0 20 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" ...attributes>\n  <g clip-path=\"url(#clip0_270_61013)\">\n    <rect width=\"20\" height=\"15\" fill=\"white\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 0H14V15H6V0Z\" fill=\"#FECA00\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 0H20V15H14V0Z\" fill=\"#E31D1C\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 0H6V15H0V0Z\" fill=\"#1D1D1D\" />\n  </g>\n  <defs>\n    <clipPath id=\"clip0_270_61013\">\n      <rect width=\"20\" height=\"15\" fill=\"white\" />\n    </clipPath>\n  </defs>\n</svg>", {
  strictMode: true
}), templateOnly());

export { BeIcon as default };
//# sourceMappingURL=be.js.map
