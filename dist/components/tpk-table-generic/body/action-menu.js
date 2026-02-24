import Component from '@glimmer/component';
import TableGenericBodyActionComponent from './action.js';
import TpkActionsMenuComponent from '../../tpk-actions-menu.js';
import { modifier } from 'ember-modifier';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

class TableGenericBodyActionMenuComponent extends Component {
  registerActionMenu = modifier(element => {
    this.args.registerActionMenu(element, []);
  });
  static {
    setComponentTemplate(precompileTemplate("{{#if (has-block-params)}}\n  {{!-- A simple td, cannot use ember-yeti-table row beacause it  does not seems to understand the did-insert helper   --}}\n  <td {{this.registerActionMenu}} data-test-action-menu-cell class=\"tpk-action-menu\" ...attributes>\n    <TpkActionsMenu as |Action|>\n      {{yield (component TableGenericBodyActionComponent Action=Action)}}\n    </TpkActionsMenu>\n  </td>\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        TpkActionsMenu: TpkActionsMenuComponent,
        TableGenericBodyActionComponent
      })
    }), this);
  }
}

export { TableGenericBodyActionMenuComponent as default };
//# sourceMappingURL=action-menu.js.map
