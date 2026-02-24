import Component from '@glimmer/component';
import { task } from 'ember-concurrency';
import { on } from '@ember/modifier';
import TpkInputComponent from '../tpk-input.js';
import SearchIcon from '../../assets/icons/search.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

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
    setComponentTemplate(precompileTemplate("<form {{on \"submit\" this.submitSearch}}>\n  <TpkInputComponent @label={{this.labelOrDefault}} @placeholder={{@placeholder}} @type=\"search\" as |C|>\n    <C.Label class=\"tpk-search\">\n      {{#if this.performSearch.isRunning}}\n        <div class=\"tpk-search-icon\">\n          <i class=\"tpk-search-loader\"></i>\n        </div>\n      {{else}}\n        <button type=\"submit\" class=\"tpk-search-icon-button\" data-test-search-submit>\n          <SearchIcon class=\"tpk-search-icon\" data-test-tpk-search-icon />\n        </button>\n      {{/if}}\n      <C.Input class=\"tpk-search-input\" />\n    </C.Label>\n  </TpkInputComponent>\n</form>", {
      strictMode: true,
      scope: () => ({
        on,
        TpkInputComponent,
        SearchIcon
      })
    }), this);
  }
}

export { TpkSearchPrefabComponent as default };
//# sourceMappingURL=tpk-search.js.map
