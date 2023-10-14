import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import type { WithBoundArgs } from '@glint/template';
import TpkActionsMenuElementComponent from './tpk-actions-menu/element';
import { on } from '@ember/modifier';
import onClickOutside from 'ember-click-outside/modifiers/on-click-outside';

interface TpkActionsMenuComponentArgs {
  classless?: boolean;
}

export interface TpkActionsMenuElementComponentSignature {
  Args: TpkActionsMenuComponentArgs;
  Element: HTMLDivElement;
  Blocks: {
    default: [
      WithBoundArgs<typeof TpkActionsMenuElementComponent, 'handleAction'>,
    ];
  };
}

export default class TpkActionsMenuComponent extends Component<TpkActionsMenuElementComponentSignature> {
  @tracked isOpen = false;

  get actionsMenuClass() {
    if (this.args.classless) {
      return '';
    }
    return this.isOpen ? 'actions aopened' : 'actions';
  }

  @action closeMenu() {
    this.isOpen = false;
  }

  @action handleKeyUp(e: KeyboardEvent) {
    if (!this.isOpen) {
      return;
    }

    if (e.key === 'Escape') {
      this.isOpen = false;
    }
  }

  @action handleAction(action: (...args: unknown[]) => void, e: Event) {
    e.stopImmediatePropagation();
    this.isOpen = false;
    action(e);
  }

  @action toggle(e: Event) {
    e.stopImmediatePropagation();
    this.isOpen = !this.isOpen;
  }

  <template>
    {{! template-lint-disable no-invalid-interactive }}
    <div
      class={{this.actionsMenuClass}}
      data-test-actions-menu
      {{onClickOutside this.closeMenu}}
      {{on 'keyup' this.handleKeyUp}}
      ...attributes
    >
      <button
        type='button'
        class={{unless @classless 'open_actions'}}
        {{on 'click' this.toggle}}
        title='actions'
        data-test-actions-open-action
      >
        <img src='/assets/icons/kebab.svg' alt='seeAllAction' />
      </button>
      {{#if this.isOpen}}
        <ul>
          {{yield
            (component
              TpkActionsMenuElementComponent handleAction=this.handleAction
            )
          }}
        </ul>
      {{/if}}
    </div>
  </template>
}
