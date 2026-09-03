import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const FrIcon = setComponentTemplate(precompileTemplate("<svg width=\"20\" height=\"15\" viewBox=\"0 0 20 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" ...attributes>\n  <g clip-path=\"url(#clip0_270_60898)\">\n    <rect width=\"20\" height=\"15\" fill=\"white\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14 0H20V15H14V0Z\" fill=\"#F50100\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 0H7V15H0V0Z\" fill=\"#2E42A5\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 0H14V15H6V0Z\" fill=\"#F7FCFF\" />\n  </g>\n  <defs>\n    <clipPath id=\"clip0_270_60898\">\n      <rect width=\"20\" height=\"15\" fill=\"white\" />\n    </clipPath>\n  </defs>\n</svg>", {
  strictMode: true
}), templateOnly());

export { FrIcon as default };
//# sourceMappingURL=fr.js.map
