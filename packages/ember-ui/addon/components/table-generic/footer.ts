import Component from '@glimmer/component';

interface TableGenericFooterComponentArgs {
  hasActionMenu: boolean;
  table: {
    visibleColumns: unknown[];
  };
}

export default class TableGenericFooterComponent extends Component<TableGenericFooterComponentArgs> {
  get colspan() {
    return this.args.hasActionMenu
      ? this.args.table.visibleColumns.length + 1
      : this.args.table.visibleColumns.length;
  }
}
