import Component from '@glimmer/component';
import { ComponentLike } from '@glint/template';
import type TpkStepperStepHeaderComponent from './step/header';

interface TpkStepperStepArgs {
  active?: TpkStepperStepComponent;
  steps: TpkStepperStepComponent[];
  guid: string;
  registerStep: (
    element: HTMLDivElement,
    args: [TpkStepperStepComponent],
  ) => unknown;
  unregisterStep: (
    element: HTMLDivElement,
    args: [TpkStepperStepComponent],
  ) => unknown;
  classless?: boolean;
}

export interface TpkStepperStepSignature {
  Args: TpkStepperStepArgs;
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Header: ComponentLike<TpkStepperStepHeaderComponent>;
        isActive: boolean;
        index: number;
      },
    ];
  };
}

export default class TpkStepperStepComponent extends Component<TpkStepperStepSignature> {
  get isActive() {
    return this.args.active === this;
  }

  get index() {
    return this.args.steps.findIndex((e) => e === this) + 1;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-stepper/step': typeof TpkStepperStepComponent;
  }
}
