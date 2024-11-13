import Component from '@glimmer/component';
import { assert } from '@ember/debug';

interface TpkStepperStepHeaderArgs {
  guid: string;

  isActive: boolean;
}

export interface TpkStepperStepHeaderSignature {
  Args: TpkStepperStepHeaderArgs;
  Element: HTMLElement;
  Blocks: {
    default: [];
  };
}

export default class TpkStepperStepHeaderComponent extends Component<TpkStepperStepHeaderSignature> {
  get container() {
    const element = document.getElementById(this.args.guid);
    assert(`The element ${this.args.guid} was not found in the DOM`, element);
    return element;
  }

  <template>
    {{#in-element this.container insertBefore=null}}
      <li
        role='tab'
        aria-selected='{{@isActive}}'
        class='tpk-stepper-step-header'
        ...attributes
      >
        {{yield}}
      </li>
    {{/in-element}}
  </template>
}
