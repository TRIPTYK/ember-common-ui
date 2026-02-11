import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { action } from '@ember/object';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import TableGenericBodyCellComponent from './body/cell.gts';
import TableGenericBodyActionMenuComponent from './body/action-menu.gts';
import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import t from 'ember-intl/helpers/t';

export interface TableGenericBodyComponentSignature {
  Args: {
    classless?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
    rowClick: (...args: unknown[]) => void;
    registerActionMenu: (element: HTMLTableCellElement, args: []) => unknown;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Cell: ComponentLike<typeof TableGenericBodyCellComponent>;
        ActionMenu: WithBoundArgs<
          typeof TableGenericBodyActionMenuComponent,
          'registerActionMenu'
        >;
      },
      unknown,
    ];
  };
}

export default class TableGenericBodyComponent extends Component<TableGenericBodyComponentSignature> {
  @tracked isExpanded = false;

  get bodyClass() {
    if (this.args.classless) {
      return '';
    }
    return this.isExpanded ? 'body expanded' : 'body';
  }

  @action toggle() {
    this.isExpanded = !this.isExpanded;
  }

  @action handleRowClick(element: unknown, event: Event) {
    const target = event.target as HTMLElement;

    // Check if the click originated from an interactive element
    // that should not trigger row click
    const isInteractiveElement = target.closest(
      'button, input, select, textarea, a, [role="button"]'
    );

    if (!isInteractiveElement) {
      this.args.rowClick(element);
    }
  }

  <template>
    <@table.tbody class='tpk-table-body' ...attributes as |body data|>
      {{#each data as |element|}}
        <body.row
          data-test-row={{element.id}}
          {{on 'click' (fn this.handleRowClick element)}}
          as |row|
        >
          {{yield
            (hash
              Cell=(component TableGenericBodyCellComponent element=element row=row)
              ActionMenu=(component
                TableGenericBodyActionMenuComponent
                registerActionMenu=@registerActionMenu
              )
            )
            element
          }}
        </body.row>
      {{else}}
        <body.row as |row|>
          <row.cell colspan={{@table.visibleColumns.length}}>
            <div class='flex justify-center py-4'>
              {{t 'global.missing'}}
            </div>
          </row.cell>
        </body.row>
      {{/each}}
    </@table.tbody>
  </template>
}
