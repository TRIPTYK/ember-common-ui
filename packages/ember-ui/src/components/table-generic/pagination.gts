import Component from '@glimmer/component';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';

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

export interface PaginationComponentSignature {
  Args: PaginationArgs;
  Element: HTMLDivElement;
}

export default class TableGenericPaginationComponent extends Component<PaginationComponentSignature> {
  isPageSizeSelected = (pageSize: number) => {
    return this.args['paginationData'].pageSize === pageSize;
  };

  get pageSizes(): number[] {
    return this.args.pageSizes || [50, 60, 70, 80, 90, 100];
  }

  get hasRows(): boolean {
    return this.args['paginationData'].totalRows !== 0;
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

  <template>
    <div
      class='{{@theme.pagination.controls}} tpk-table-pagination'
      data-test-pagination
      ...attributes
    >
      {{#if this.hasRows}}
        <div class='yeti-table-pagination-buttons'>
          <button
            type='button'
            class='{{@theme.pagination.previous}}
              yeti-table-pagination-controls-previous'
            disabled={{this.shouldDisablePrevious}}
            title={{t 'global.previous'}}
            {{on 'click' @paginationActions.previousPage}}
            data-test-pagination-previous
          >
            <img
              src='/assets/icons/chevron-left.svg'
              alt={{t 'global.previous'}}
            />
            <span class='sr-only'>
              {{t 'global.previous'}}
            </span>
          </button>
          <button
            type='button'
            class='{{@theme.pagination.next}}
              yeti-table-pagination-controls-next'
            disabled={{this.shouldDisableNext}}
            title={{t 'global.next'}}
            {{on 'click' @paginationActions.nextPage}}
            data-test-pagination-next
          >
            <span class='sr-only'>
              {{t 'global.next'}}
            </span>
            <img
              src='/assets/icons/chevron-right.svg'
              alt={{t 'global.next'}}
            />
          </button>
        </div>
      {{/if}}
      <div>
        <div
          class='{{@theme.pagination.info}}
            yeti-table-pagination-controls-page-info'
          data-test-pagination-result
        >
          {{@paginationData.pageStart}}
          -
          {{@paginationData.pageEnd}}
          {{t 'global.on'}}
          {{@paginationData.totalRows}}
          {{t 'global.results'}}
        </div>
        <div
          class='{{@theme.pagination.pageSize}}
            yeti-table-pagination-controls-page-size'
        >
          {{t 'global.results_by_page'}}:
          <select
            disabled={{@disabled}}
            {{on 'change' this.changePageSize}}
            data-test-pagination-select
          >
            {{#each this.pageSizes as |pageSize|}}
              <option
                value={{pageSize}}
                selected={{this.isPageSizeSelected pageSize}}
              >
                {{pageSize}}
              </option>
            {{/each}}
          </select>
        </div>
      </div>
    </div>
  </template>
}
