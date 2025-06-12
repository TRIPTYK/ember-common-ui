import TableGenericBodyActionComponent from './action.js';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import TpkActionsMenuComponent from '../../tpk-actions-menu.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import templateOnly from '@ember/component/template-only';

const TableGenericBodyActionMenuComponent = setComponentTemplate(precompileTemplate("\n    {{#if (has-block-params)}}\n      {{!-- A simple td, cannot use ember-yeti-table row beacause it  does not seems to understand the did-insert helper   --}}\n      <td {{didInsert @registerActionMenu}} data-test-action-menu-cell class=\"tpk-action-menu\" ...attributes>\n        <TpkActionsMenu as |Action|>\n          {{yield (component TableGenericBodyActionComponent Action=Action)}}\n        </TpkActionsMenu>\n      </td>\n    {{/if}}\n  ", {
  strictMode: true,
  scope: () => ({
    didInsert,
    TpkActionsMenu: TpkActionsMenuComponent,
    TableGenericBodyActionComponent
  })
}), templateOnly());

export { TableGenericBodyActionMenuComponent as default };
//# sourceMappingURL=action-menu.js.map
