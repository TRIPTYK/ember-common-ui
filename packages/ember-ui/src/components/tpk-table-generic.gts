import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import type { WithBoundArgs } from '@glint/template';
import type ArrayProxy from '@ember/array/proxy';
// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import type ModelRegistry from 'ember-data/types/registries/model';
import TableGenericSearchBarComponent from './tpk-table-generic/search-bar.gts';
import TableGenericTableComponent, {
  type TableApi,
} from './tpk-table-generic/table.gts';
import { hash } from '@ember/helper';
import t from 'ember-intl/helpers/t';

export interface TableGenericComponentSignature<K extends keyof ModelRegistry> {
  Args: {
    entity: K;
    relationships: string;
    pageSizes?: number[];
    filterText?: string;
    pageSize?: number;
    defaultSortColumn?: string;
    // eslint-disable-next-line no-unused-vars
    registerApi?: (api: TableApi) => unknown;
    rowClick?: (...elements: unknown[]) => void;
    additionalFilters: Record<string, unknown>;
    registerData?: (data: ArrayProxy<ModelRegistry[K]>, meta?: { fetched: number; total: number }) => void;
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

export default class TableGenericComponent<K extends keyof ModelRegistry> extends Component<TableGenericComponentSignature<K>> {
  @tracked filterText?: string;

  @action
  onSearch(value: string) {
    this.filterText = value;
  }

  get pageSizes(): number[] {
    return this.args.pageSizes ?? [
      20, 50, 100
    ];
  }

  @action rowClick(...args: unknown[]) {
    return this.args.rowClick?.(...args);
  }

  <template>
    {{yield
      (hash
        onSearch= this.onSearch
        SearchBar=(component
          TableGenericSearchBarComponent
          onSearch=this.onSearch
          label=(t 'global.search')
          placeholder=(t 'global.search')
        )
        Table=(component
          TableGenericTableComponent
          rowClick=this.rowClick
          filterText=this.filterText
          relationships=@relationships
          registerApi=@registerApi
          entity=@entity
          pageSizes=this.pageSizes
          pageSize=@pageSize
          additionalFilters=@additionalFilters
          defaultSortColumn=@defaultSortColumn
          registerData=@registerData
        )
      )
    }}
  </template>
}
