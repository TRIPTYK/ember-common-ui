import Component from '@glimmer/component';
import { assert } from '@ember/debug';

interface TpkStepperStepHeaderArgs {
  guid: string;
  classless?: boolean;
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-stepper/step/header': typeof TpkStepperStepHeaderComponent;
  }
}
