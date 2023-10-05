import Component from '@glimmer/component';
import {
  TableGenericPaginationActions,
  TableGenericPaginationData,
  TableGenericTheme,
} from './pagination';

interface TableGenericFooterComponentArgs {
  hasActionMenu: boolean;
  pageSizes?: number[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: {
    visibleColumns: unknown[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tfoot: any;
    actions: TableGenericPaginationActions;
    isLoading: boolean;
    mergedTheme: TableGenericTheme;
    paginationData: TableGenericPaginationData;
  };
}

export interface TableGenericFooterComponentSignature {
  Args: TableGenericFooterComponentArgs;
  Element: never;
}

export default class TableGenericFooterComponent extends Component<TableGenericFooterComponentArgs> {
  get colspan() {
    return this.args.hasActionMenu
      ? this.args.table.visibleColumns.length + 1
      : this.args.table.visibleColumns.length;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/footer': typeof TableGenericFooterComponent;
  }
}
