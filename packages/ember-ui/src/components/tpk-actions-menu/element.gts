import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import type { TOC } from '@ember/component/template-only';
import type { Invokable } from '@glint/template/-private/integration';

export interface TpkActionsMenuElementComponentSignature {
  Args: {
    handleAction: (action: (...args: unknown[]) => void, e: Event) => void;
    action?: (...args: unknown[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: TOC<{ Element: SVGSVGElement }> | Invokable<any>;
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
          <@icon class='size-4' />
        {{/if}}
        {{yield}}
      </button>
    </li>
  </template>
}
