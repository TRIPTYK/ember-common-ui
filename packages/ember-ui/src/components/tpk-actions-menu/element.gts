import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';

export interface TpkActionsMenuElementComponentSignature {
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

export default class TpkActionsMenuElementComponent extends Component<TpkActionsMenuElementComponentSignature> {
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

  <template>
    <li ...attributes>
      <button {{on 'click' (fn this.handleAction this.action)}} type='button'>
        {{#if @icon}}
          <img src={{@icon}} class='w-6' alt='' />
        {{/if}}
        {{yield}}
      </button>
    </li>
  </template>
}
