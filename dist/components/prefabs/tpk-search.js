import { _ as _defineProperty } from '../../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { buildTask } from 'ember-concurrency/async-arrow-runtime';
import Component from '@glimmer/component';
import 'ember-concurrency';
import { on } from '@ember/modifier';
import TpkInputComponent from '../tpk-input.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TpkSearchPrefabComponent;
class TpkSearchPrefabComponent extends Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "performSearch", buildTask(() => ({
      context: this,
      generator: function* (value, e) {
        e.preventDefault();
        return this.args.onSearch(e, value);
      }
    }), {
      drop: true
    }, "performSearch", null));
    _defineProperty(this, "submitSearch", e => {
      e.preventDefault();
      const form = e.target;
      const input = form.querySelector('input');
      let value = '';
      if (input?.value) {
        value = input?.value;
      }
      this.performSearch.perform(value, e);
    });
  }
  get labelOrDefault() {
    return this.args.label ?? '';
  }
}
_TpkSearchPrefabComponent = TpkSearchPrefabComponent;
setComponentTemplate(precompileTemplate("\n    <form {{on \"submit\" this.submitSearch}}>\n      <TpkInputComponent @label={{this.labelOrDefault}} @placeholder={{@placeholder}} @type=\"search\" as |C|>\n        <div class=\"tpk-search\" data-test-tpk-prefab-search-container ...attributes>\n          <C.Label class=\"tpk-search-label\">\n            {{#if this.performSearch.isRunning}}\n              <div class=\"tpk-search-button\">\n                <i class=\"tpk-search-loader\"></i>\n              </div>\n            {{else}}\n            <button type=\"submit\" data-test-search-submit>\n              <img src=\"/assets/icons/search.svg\" data-test-tpk-search-icon alt=\"magnyfying glass\" class=\"tpk-search-button\" />\n            </button>\n            {{/if}}\n            <C.Input class=\"tpk-search-input\" />\n          </C.Label>\n        </div>\n      </TpkInputComponent>\n    </form>\n  ", {
  strictMode: true,
  scope: () => ({
    on,
    TpkInputComponent
  })
}), _TpkSearchPrefabComponent);

export { TpkSearchPrefabComponent as default };
//# sourceMappingURL=tpk-search.js.map
