import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const SidepageIcon = setComponentTemplate(precompileTemplate("<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ...attributes>\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\" />\n  <line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\" />\n</svg>", {
  strictMode: true
}), templateOnly());

export { SidepageIcon as default };
//# sourceMappingURL=sidepage.js.map
