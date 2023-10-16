import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import type { WithBoundArgs } from '@glint/template';
import TableGenericSearchBarComponent from './table-generic/search-bar.gts';
import TableGenericTableComponent, {
  type TableApi,
} from './table-generic/table.gts';
import { hash } from '@ember/helper';
import t from 'ember-intl/helpers/t';

export interface TableGenericComponentSignature {
  Args: {
    entity: never;
    relationships: string;
    pageSizes?: number[];
    filterText?: string;
    pageSize?: number;
    // eslint-disable-next-line no-unused-vars
    registerApi?: (api: TableApi) => unknown;
    rowClick: () => void;
    additionalFilters: Record<string, unknown>;
  };
  Blocks: {
    default: [
      {
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
        >;
      },
    ];
  };
}

export default class TableGenericComponent extends Component<TableGenericComponentSignature> {
  @tracked filterText?: string;

  @action
  onSearch(value: string) {
    this.filterText = value;
  }

  <template>
    {{yield
      (hash
        SearchBar=(component
          TableGenericSearchBarComponent
          onSearch=this.onSearch
          label=(t 'global.search')
          placeholder=(t 'global.search')
        )
        Table=(component
          TableGenericTableComponent
          rowClick=@rowClick
          filterText=this.filterText
          relationships=@relationships
          registerApi=@registerApi
          entity=@entity
          pageSizes=@pageSizes
          pageSize=@pageSize
          additionalFilters=@additionalFilters
        )
      )
    }}
  </template>
}
