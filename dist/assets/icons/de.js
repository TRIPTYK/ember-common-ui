import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const DeIcon = setComponentTemplate(precompileTemplate("<svg width=\"20\" height=\"15\" viewBox=\"0 0 20 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" ...attributes>\n  <g clip-path=\"url(#clip0_270_60956)\">\n    <rect width=\"20\" height=\"15\" fill=\"white\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 10H20V15H0V10Z\" fill=\"#FFD018\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 5H20V10H0V5Z\" fill=\"#E31D1C\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 0H20V5H0V0Z\" fill=\"#272727\" />\n  </g>\n  <defs>\n    <clipPath id=\"clip0_270_60956\">\n      <rect width=\"20\" height=\"15\" fill=\"white\" />\n    </clipPath>\n  </defs>\n</svg>", {
  strictMode: true
}), templateOnly());

export { DeIcon as default };
//# sourceMappingURL=de.js.map
