import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { WithBoundArgs } from '@glint/template';
import type ActionsMenuElementComponent from './tpk-actions-menu/element';

interface ActionsMenuComponentArgs {
  classless?: boolean;
}

export interface ActionsMenuElementComponentSignature {
  Args: ActionsMenuComponentArgs;
  Element: HTMLDivElement;
  Blocks: {
    default: [
      WithBoundArgs<typeof ActionsMenuElementComponent, 'handleAction'>,
    ];
  };
}

export default class ActionsMenuComponent extends Component<ActionsMenuElementComponentSignature> {
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-actions-menu': typeof ActionsMenuComponent;
    TpkActionsMenu: typeof ActionsMenuComponent;
  }
}
