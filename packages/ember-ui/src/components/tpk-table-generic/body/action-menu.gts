import type { WithBoundArgs } from '@glint/template';
import Component from '@glimmer/component';
import TableGenericBodyActionComponent from './action.gts';
import TpkActionsMenu from '../../tpk-actions-menu.gts';
import { modifier } from 'ember-modifier';

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

export default class TableGenericBodyActionMenuComponent extends Component<TableGenericBodyActionMenuComponentSignature> {
  registerActionMenu = modifier((element: HTMLTableCellElement) => {
    this.args.registerActionMenu(element, []);
  });

  <template>
    {{#if (has-block-params)}}
      {{! A simple td, cannot use ember-yeti-table row beacause it  does not seems to understand the did-insert helper   }}
      <td
        {{this.registerActionMenu}}
        data-test-action-menu-cell
        class='tpk-action-menu'
        ...attributes
      >
        <TpkActionsMenu as |Action|>
          {{yield (component TableGenericBodyActionComponent Action=Action)}}
        </TpkActionsMenu>
      </td>
    {{/if}}
  </template>
}
