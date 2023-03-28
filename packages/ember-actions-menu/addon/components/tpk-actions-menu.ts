import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';

export default class ActionsMenuComponent extends Component {
  @tracked isOpen = false;

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
