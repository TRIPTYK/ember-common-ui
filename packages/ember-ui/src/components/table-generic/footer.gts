import Component from '@glimmer/component';
import TableGenericPaginationComponent, {
  type TableGenericPaginationActions,
  type TableGenericPaginationData,
  type TableGenericTheme,
} from './pagination.gts';
import { hash } from '@ember/helper';

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

  <template>
    <@table.tfoot as |foot|>
      <foot.row as |row|>
        <row.cell @visible={{true}} colspan={{this.colspan}}>
          <TableGenericPaginationComponent
            @disabled={{@table.isLoading}}
            @theme={{@table.mergedTheme}}
            @paginationData={{@table.paginationData}}
            @pageSizes={{@pageSizes}}
            @paginationActions={{hash
              previousPage=@table.actions.previousPage
              nextPage=@table.actions.nextPage
              goToPage=@table.actions.goToPage
              changePageSize=@table.actions.changePageSize
            }}
          />
        </row.cell>
      </foot.row>
    </@table.tfoot>
  </template>
}
