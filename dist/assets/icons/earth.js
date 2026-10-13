import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const EarthIcon = setComponentTemplate(precompileTemplate("<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" ...attributes>\n  <path stroke=\"none\" d=\"M0 0h24v24H0z\" />\n  <circle cx=\"12\" cy=\"12\" r=\"9\" />\n  <line x1=\"3.6\" y1=\"9\" x2=\"20.4\" y2=\"9\" />\n  <line x1=\"3.6\" y1=\"15\" x2=\"20.4\" y2=\"15\" />\n  <path d=\"M11.5 3a17 17 0 0 0 0 18\" />\n  <path d=\"M12.5 3a17 17 0 0 1 0 18\" />\n</svg>", {
  strictMode: true
}), templateOnly());

export { EarthIcon as default };
//# sourceMappingURL=earth.js.map
