import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export interface ActionsMenuElementComponentSignature {
  Args: {
    handleAction: (action: (...args: unknown[]) => void, e: Event) => void;
    action?: (...args: unknown[]) => void;
    icon?: string;
    label?: string;
  };
  Element: HTMLLIElement;
  Blocks: {
    default: [];
  };
}

export default class ActionsMenuElementComponent extends Component<ActionsMenuElementComponentSignature> {
  get handleAction() {
    assert(
      '@handleAction is mandatory',
      typeof this.args.handleAction === 'function',
    );
    return this.args.handleAction;
  }

  get action() {
    assert('@action is mandatory', typeof this.args.action === 'function');
    return this.args.action;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-actions-menu/element': typeof ActionsMenuElementComponent;
  }
}
