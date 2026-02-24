import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const NlIcon = setComponentTemplate(precompileTemplate("<svg width=\"20\" height=\"15\" viewBox=\"0 0 20 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" ...attributes>\n  <g clip-path=\"url(#clip0_270_60968)\">\n    <rect width=\"20\" height=\"15\" fill=\"white\" />\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 0V15H20V0H0Z\" fill=\"#F7FCFF\" />\n    {{!-- template-lint-disable no-inline-styles --}}\n    <mask id=\"mask0_270_60968\" style=\"mask-type:luminance\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"20\" height=\"15\">\n      <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 0V15H20V0H0Z\" fill=\"white\" />\n    </mask>\n    <g mask=\"url(#mask0_270_60968)\">\n      <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 0V5H20V0H0Z\" fill=\"#E31D1C\" />\n      <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 10V15H20V10H0Z\" fill=\"#3D58DB\" />\n    </g>\n  </g>\n  <defs>\n    <clipPath id=\"clip0_270_60968\">\n      <rect width=\"20\" height=\"15\" fill=\"white\" />\n    </clipPath>\n  </defs>\n</svg>", {
  strictMode: true
}), templateOnly());

export { NlIcon as default };
//# sourceMappingURL=nl.js.map
