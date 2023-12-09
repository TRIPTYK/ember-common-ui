import type { ComponentLike } from '@glint/template';
import TableGenericHeaderCellComponent from './header/cell.gts';
import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';

export interface TableGenericHeaderComponentSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: any;
    hasActionMenu: boolean;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Cell: ComponentLike<typeof TableGenericHeaderCellComponent>;
      },
    ];
  };
}

// eslint-disable-next-line prettier/prettier
const TableGenericHeaderComponent: TOC<TableGenericHeaderComponentSignature> =
  <template>
    <@table.header class='tpk-table-header' as |header|>
      {{yield
        (hash Cell=(component TableGenericHeaderCellComponent header=header))
      }}
      {{#if @hasActionMenu}}
        {{! A simple th,  no need to register this column to yeti table }}
        <th data-test-action-menu-header></th>
      {{/if}}
    </@table.header>
  </template>;

export default TableGenericHeaderComponent;
