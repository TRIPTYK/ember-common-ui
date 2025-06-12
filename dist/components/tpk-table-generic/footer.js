import Component from '@glimmer/component';
import TableGenericPaginationComponent from './pagination.js';
import { hash } from '@ember/helper';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var _TableGenericFooterComponent;
class TableGenericFooterComponent extends Component {
  get colspan() {
    return this.args.hasActionMenu ? this.args.table.visibleColumns.length + 1 : this.args.table.visibleColumns.length;
  }
}
_TableGenericFooterComponent = TableGenericFooterComponent;
setComponentTemplate(precompileTemplate("\n    <@table.tfoot as |foot|>\n      <foot.row as |row|>\n        <row.cell @visible={{true}} colspan={{this.colspan}}>\n          <TableGenericPaginationComponent @disabled={{@table.isLoading}} @theme={{@table.mergedTheme}} @paginationData={{@table.paginationData}} @pageSizes={{@pageSizes}} @paginationActions={{hash previousPage=@table.actions.previousPage nextPage=@table.actions.nextPage goToPage=@table.actions.goToPage changePageSize=@table.actions.changePageSize}} />\n        </row.cell>\n      </foot.row>\n    </@table.tfoot>\n  ", {
  strictMode: true,
  scope: () => ({
    TableGenericPaginationComponent,
    hash
  })
}), _TableGenericFooterComponent);

export { TableGenericFooterComponent as default };
//# sourceMappingURL=footer.js.map
