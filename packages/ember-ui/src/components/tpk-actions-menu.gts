import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import TpkActionsMenuElementComponent from './tpk-actions-menu/element.gts';
import { guidFor } from '@ember/-internals/utils';
import EllipsisIcon from '../assets/icons/ellipsis.gts';
import { on } from '@ember/modifier';

export interface TpkActionsMenuElementComponentSignature {
  Args: object;
  Element: HTMLDivElement;
  Blocks: {
    default: [
      WithBoundArgs<typeof TpkActionsMenuElementComponent, 'handleAction'>,
    ];
  };
}

export default class TpkActionsMenuComponent extends Component<TpkActionsMenuElementComponentSignature> {
  index = guidFor(this);

  stopPropagation(e: Event) {
    e.stopImmediatePropagation();
  }

  @action handleAction(action: (...args: unknown[]) => void, e: Event) {
    e.stopImmediatePropagation();
    this.hidePopover(e);
    action(e);
  }

  hidePopover(e: Event) {
    const ulElement = (e.target as HTMLElement).closest(
      '[popover]',
    ) as HTMLElement;
    if (ulElement) {
      ulElement.hidePopover();
    }
  }

  <template>
    {{! template-lint-disable no-invalid-interactive }}
    {{! template-lint-disable no-inline-styles }}
    {{! template-lint-disable style-concatenation }}
    <div class='actions' data-test-actions-menu ...attributes>
      <button
        type='button'
        class='open_actions'
        popovertarget='popover-{{this.index}}'
        style='anchor-name:--anchor-{{this.index}}'
        {{on 'click' this.stopPropagation}}
        data-test-actions-open-action
      >
        <EllipsisIcon />
      </button>
      <ul
        class='actions_list'
        popover
        id='popover-{{this.index}}'
        style='position-anchor:--anchor-{{this.index}}'
        data-test-actions-list
      >
        {{yield
          (component
            TpkActionsMenuElementComponent handleAction=this.handleAction
          )
        }}
      </ul>
    </div>
  </template>
}
