import type { WithBoundArgs } from '@glint/template';
import TableGenericBodyActionComponent from './action.gts';
import type { TOC } from '@ember/component/template-only';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import TpkActionsMenu from '../../tpk-actions-menu.gts';

export interface TableGenericBodyActionMenuComponentSignature {
  Args: {
    item: unknown;
    index: number;
    isExpanded: boolean;
    registerActionMenu: (element: HTMLTableCellElement, args: []) => unknown;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [WithBoundArgs<typeof TableGenericBodyActionComponent, 'Action'>];
  };
}

const TableGenericBodyActionMenuComponent: TOC<TableGenericBodyActionMenuComponentSignature> =
  <template>
    {{#if (has-block-params)}}
      {{! A simple td, cannot use ember-yeti-table row beacause it  does not seems to understand the did-insert helper   }}
      <td
        {{didInsert @registerActionMenu}}
        data-test-action-menu-cell
        class="tpk-action-menu"
        ...attributes
      >
        <TpkActionsMenu  as |Action|>
          {{yield (component TableGenericBodyActionComponent Action=Action)}}
        </TpkActionsMenu>
      </td>
    {{/if}}
  </template>;

export default TableGenericBodyActionMenuComponent;
