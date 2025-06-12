import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const LoadingIndicator = setComponentTemplate(precompileTemplate("\n  <div data-test-loading-indicator class=\"z-10 fixed inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-40\" ...attributes>\n    <div class=\"sk-cube-grid\">\n      <div class=\"sk-cube sk-cube1\"></div>\n      <div class=\"sk-cube sk-cube2\"></div>\n      <div class=\"sk-cube sk-cube3\"></div>\n      <div class=\"sk-cube sk-cube4\"></div>\n      <div class=\"sk-cube sk-cube5\"></div>\n      <div class=\"sk-cube sk-cube6\"></div>\n      <div class=\"sk-cube sk-cube7\"></div>\n      <div class=\"sk-cube sk-cube8\"></div>\n      <div class=\"sk-cube sk-cube9\"></div>\n    </div>\n  </div>\n", {
  strictMode: true
}), templateOnly());

export { LoadingIndicator as default };
//# sourceMappingURL=tpk-loading-indicator.js.map
