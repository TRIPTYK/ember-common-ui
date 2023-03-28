import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

interface ActionsMenuComponentArgs {
  classless: boolean;
}

export default class ActionsMenuComponent extends Component<ActionsMenuComponentArgs> {
  @tracked isOpen = false;

  get ActionsMenuClass() {
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

  @action handleAction(action: Function, e: Event) {
    e.stopImmediatePropagation();
    this.isOpen = false;
    return action(e);
  }

  @action toggle(e: Event) {
    e.stopImmediatePropagation();
    this.isOpen = !this.isOpen;
  }
}
