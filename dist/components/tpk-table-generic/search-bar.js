import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TpkSearch from '@triptyk/ember-input/components/prefabs/tpk-search';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TableGenericSearchBarComponent extends Component {
  static {
    g(this.prototype, "searchValue", [tracked], function () {
      return '';
    });
  }
  #searchValue = (i(this, "searchValue"), void 0);
  constructor(owner, args) {
    super(owner, args);
    assert('Please provide @onSearch to search input', args.onSearch !== undefined);
  }
  onSearch(e, value) {
    // prevent to submit form
    e.preventDefault();
    this.args.onSearch(value);
  }
  static {
    n(this.prototype, "onSearch", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<TpkSearch @label={{@label}} @placeholder={{@placeholder}} @onSearch={{this.onSearch}} />", {
      strictMode: true,
      scope: () => ({
        TpkSearch
      })
    }), this);
  }
}

export { TableGenericSearchBarComponent as default };
//# sourceMappingURL=search-bar.js.map
