import Component from '@glimmer/component';

export interface TpkStepperStepperComponentSignature {
  Args: {
    classless?: boolean;
    guid: string;
  };
  Element: HTMLOListElement;
  Blocks: {
    default: [];
  };
}

export default class TpkStepperStepperComponent extends Component<TpkStepperStepperComponentSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-stepper/stepper': typeof TpkStepperStepperComponent;
  }
}
