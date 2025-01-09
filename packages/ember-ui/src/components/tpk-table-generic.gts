import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import type { WithBoundArgs } from '@glint/template';
import TableGenericSearchBarComponent from './tpk-table-generic/search-bar.gts';
import TableGenericTableComponent, {
  type TableApi,
} from './tpk-table-generic/table.gts';
import { hash } from '@ember/helper';
import IntlService from 'ember-intl/services/intl';
import { service } from '@ember/service';

export interface TableGenericComponentSignature {
  Args: {
    entity: string;
    relationships?: string;
    pageSizes?: number[];
    filterText?: string;
    pageSize?: number;
    defaultSortColumn?: string;
    // eslint-disable-next-line no-unused-vars
    registerApi?: (api: TableApi) => unknown;
    rowClick?: (...elements: unknown[]) => void;
    placeholder?: string;
    label?: string;
    additionalFilters?: Record<string, unknown>;
  };
  Blocks: {
    default: [
      {
        onSearch: (value: string) => void;
        SearchBar: WithBoundArgs<
          typeof TableGenericSearchBarComponent,
          'onSearch' | 'label' | 'placeholder'
        >;
        Table: WithBoundArgs<
          typeof TableGenericTableComponent,
          | 'rowClick'
          | 'filterText'
          | 'relationships'
          | 'registerApi'
          | 'entity'
          | 'pageSizes'
          | 'additionalFilters'
          | 'defaultSortColumn'
        >;
      },
    ];
  };
}

export default class TableGenericComponent extends Component<TableGenericComponentSignature> {
  @service declare intl: IntlService;
  @tracked filterText?: string;

  get label(){
    if (this.args.label){
      return this.args.label;
    }
    return this.intl.t('global.search');
  }

  get placeholder(){
    if(this.args.placeholder){
      return this.args.placeholder;
    }
    return this.intl.t('global.search');
  }

  @action
  onSearch(value: string) {
    console.log('searching', value);
    
    this.filterText = value;
  }

  @action rowClick(...args: unknown[]) {
    return this.args.rowClick?.(...args);
  }

  <template>
    {{log 'generic table' this.label this.placeholder}}
    {{yield
      (hash
        onSearch= this.onSearch
        SearchBar=(component
          TableGenericSearchBarComponent
          onSearch=this.onSearch
          label=this.label
          placeholder=this.placeholder
        )
        Table=(component
          TableGenericTableComponent
          rowClick=this.rowClick
          filterText=this.filterText
          relationships=@relationships
          registerApi=@registerApi
          entity=@entity
          pageSizes=@pageSizes
          pageSize=@pageSize
          additionalFilters=@additionalFilters
          defaultSortColumn=@defaultSortColumn
        )
      )
    }}
  </template>
}
