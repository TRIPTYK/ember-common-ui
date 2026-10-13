import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import TableGenericBodyCell from './body/cell.js';
import TableGenericBodyActionMenu from './body/action-menu.js';
import { hash, fn } from '@ember/helper';
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime-esm';

class TableGenericBody extends Component {
  static {
    g(this.prototype, "isExpanded", [tracked], function () {
      return false;
    });
  }
  #isExpanded = (i(this, "isExpanded"), void 0);
  get bodyClass() {
    return this.isExpanded ? 'body expanded' : 'body';
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  static {
    n(this.prototype, "toggle", [action]);
  }
  handleRowClick(element, event) {
    if (!this.args.rowClick) {
      return;
    }
    const target = event.target;
    const isInteractiveElement = target.closest('button, input, select, textarea, a, [role="button"], .tpk-no-row-click');
    if (!isInteractiveElement) {
      this.args.rowClick(element, event);
    }
  }
  static {
    n(this.prototype, "handleRowClick", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<@table.tbody class=\"tpk-table-body\" ...attributes as |body data|>\n  {{#each data as |element index|}}\n    <body.row data-test-row={{element.id}} class={{if @rowClick \"cursor-pointer\"}} {{on \"click\" (fn this.handleRowClick element)}} as |row|>\n      {{yield (hash Cell=(component TableGenericBodyCellComponent element=element row=row) ActionMenu=(component TableGenericBodyActionMenuComponent registerActionMenu=@registerActionMenu item=element isExpanded=this.isExpanded index=index)) element}}\n    </body.row>\n  {{else}}\n    <body.row as |row|>\n      <row.cell colspan={{@table.visibleColumns.length}}>\n        <div class=\"flex justify-center py-4\">\n          {{t \"global.missing\"}}\n        </div>\n      </row.cell>\n    </body.row>\n  {{/each}}\n</@table.tbody>", {
      strictMode: true,
      scope: () => ({
        on,
        fn,
        hash,
        TableGenericBodyCellComponent: TableGenericBodyCell,
        TableGenericBodyActionMenuComponent: TableGenericBodyActionMenu,
        t
      })
    }), this);
  }
}

export { TableGenericBody as default };
//# sourceMappingURL=body.js.map
