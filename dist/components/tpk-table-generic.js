import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TableGenericSearchBar from './tpk-table-generic/search-bar.js';
import TableGenericTable from './tpk-table-generic/table.js';
import { hash } from '@ember/helper';
import { service } from '@ember/service';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TableGeneric extends Component {
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  static {
    g(this.prototype, "filterText", [tracked]);
  }
  #filterText = (i(this, "filterText"), void 0);
  get label() {
    if (this.args.label) {
      return this.args.label;
    }
    return this.intl.t('global.search');
  }
  get placeholder() {
    if (this.args.placeholder) {
      return this.args.placeholder;
    }
    return this.intl.t('global.search');
  }
  onSearch(value) {
    this.filterText = value;
  }
  static {
    n(this.prototype, "onSearch", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash onSearch=this.onSearch SearchBar=(component TableGenericSearchBarComponent onSearch=this.onSearch label=this.label placeholder=this.placeholder) Table=(component TableGenericTableComponent rowClick=@rowClick filterText=this.filterText relationships=@relationships registerApi=@registerApi entity=@entity pageSizes=@pageSizes pageSize=@pageSize additionalFilters=@additionalFilters defaultSortColumn=@defaultSortColumn))}}", {
      strictMode: true,
      scope: () => ({
        hash,
        TableGenericSearchBarComponent: TableGenericSearchBar,
        TableGenericTableComponent: TableGenericTable
      })
    }), this);
  }
}

export { TableGeneric as default };
//# sourceMappingURL=tpk-table-generic.js.map
