import Component from '@glimmer/component';

interface TpkStepperStepArgs {
  active?: TpkStepperStep;
  steps: TpkStepperStep[];
  guid: string;
  registerStep: Function;
  unregisterStep: Function;
  classless?: boolean;
}

export default class TpkStepperStep extends Component<TpkStepperStepArgs> {
  get isActive() {
    return this.args.active === this;
  }

  get index() {
    return this.args.steps.findIndex((e) => e === this) + 1;
  }
}
