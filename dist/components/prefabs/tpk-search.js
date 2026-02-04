import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { on } from '@ember/modifier';
import TpkInputComponent from '../tpk-input.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var img = "data:image/svg+xml,%3csvg width='28' height='29' viewBox='0 0 28 29' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.1101 21.9667C18.0486 23.6358 15.4231 24.6357 12.564 24.6357C5.93655 24.6357 0.563965 19.2632 0.563965 12.6357C0.563965 6.00833 5.93655 0.635742 12.564 0.635742C19.1914 0.635742 24.564 6.00833 24.564 12.6357C24.564 15.6839 23.4275 18.4666 21.5551 20.5833L27.6292 26.6573C28.0197 27.0479 28.0197 27.681 27.6292 28.0716C27.2386 28.4621 26.6055 28.4621 26.215 28.0716L20.1101 21.9667ZM22.564 12.6357C22.564 18.1586 18.0868 22.6357 12.564 22.6357C7.04112 22.6357 2.56396 18.1586 2.56396 12.6357C2.56396 7.11289 7.04112 2.63574 12.564 2.63574C18.0868 2.63574 22.564 7.11289 22.564 12.6357Z' fill='black'/%3e%3c/svg%3e";

class TpkSearchPrefabComponent extends Component {
  performSearch = task(this, {
    drop: true
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async (value, e) => {
    e.preventDefault();
    return this.args.onSearch(e, value);
  });
  submitSearch = e => {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input');
    let value = '';
    if (input?.value) {
      value = input?.value;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.performSearch.perform(value, e);
  };
  get labelOrDefault() {
    return this.args.label ?? '';
  }
  static {
    setComponentTemplate(precompileTemplate("<form {{on \"submit\" this.submitSearch}}>\n  <TpkInputComponent @label={{this.labelOrDefault}} @placeholder={{@placeholder}} @type=\"search\" as |C|>\n    <div class=\"tpk-search\" data-test-tpk-prefab-search-container ...attributes>\n      <C.Label class=\"tpk-search-label\">\n        {{#if this.performSearch.isRunning}}\n          <div class=\"tpk-search-button\">\n            <i class=\"tpk-search-loader\"></i>\n          </div>\n        {{else}}\n          <button type=\"submit\" data-test-search-submit>\n            <img src={{searchSvg}} data-test-tpk-search-icon alt=\"magnyfying glass\" class=\"tpk-search-button\" />\n          </button>\n        {{/if}}\n        <C.Input class=\"tpk-search-input\" />\n      </C.Label>\n    </div>\n  </TpkInputComponent>\n</form>", {
      strictMode: true,
      scope: () => ({
        on,
        TpkInputComponent,
        searchSvg: img
      })
    }), this);
  }
}

export { TpkSearchPrefabComponent as default };
//# sourceMappingURL=tpk-search.js.map
