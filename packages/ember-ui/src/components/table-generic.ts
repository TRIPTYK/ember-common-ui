import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { WithBoundArgs } from '@glint/template';
import TableGenericSearchBarComponent from './table-generic/search-bar';
import TableGenericTableComponent, { TableApi } from './table-generic/table';

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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic': typeof TableGenericComponent;
    TpkTableGeneric: typeof TableGenericComponent;
  }
}
