import Component from '@glimmer/component';
import { action } from '@ember/object';

export interface TableGenericPaginationData {
  isFirstPage: boolean;
  isLastPage: boolean;
  totalRows: number;
  pageStart: number;
  pageEnd: number;
  pageSize: number;
}

export interface TableGenericTheme {
  pagination: {
    controls: string;
    previous: string;
    previousPage: string;
    next: string;
    info: string;
    pageSize: string;
  };
}

export interface TableGenericPaginationActions {
  changePageSize: (value: string) => void;
  previousPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
}

interface PaginationArgs {
  pageSizes?: number[];
  disabled: boolean;
  theme: TableGenericTheme;
  paginationData: TableGenericPaginationData;
  paginationActions: TableGenericPaginationActions;
}

interface PaginationComponentSignature {
  Args: PaginationArgs;
  Element: HTMLDivElement;
}

export default class TableGenericPaginationComponent extends Component<PaginationComponentSignature> {
  isPageSizeSelected(pageSize: number): boolean {
    return this.args['paginationData'].pageSize === pageSize;
  }

  get pageSizes(): number[] {
    return this.args.pageSizes || [50, 60, 70, 80, 90, 100];
  }

  get hasRows(): boolean {
    return this.args['paginationData'].totalRows === 0;
  }

  get shouldDisablePrevious(): boolean {
    return this.args['paginationData'].isFirstPage || this.args['disabled'];
  }

  get shouldDisableNext(): boolean {
    return this.args['paginationData'].isLastPage || this.args['disabled'];
  }

  @action
  changePageSize(ev: Event) {
    this.args['paginationActions'].changePageSize(
      (ev.target as HTMLInputElement).value,
    );
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'table-generic/pagination': typeof TableGenericPaginationComponent;
    'TableGeneric::Pagination': typeof TableGenericPaginationComponent;
  }
}
