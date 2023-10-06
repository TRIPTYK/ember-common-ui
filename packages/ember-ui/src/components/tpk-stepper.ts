import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import TpkStepperStepComponent from './tpk-stepper/step';
import TpkStepperStepperComponent from './tpk-stepper/stepper';
import { WithBoundArgs } from '@glint/template';

interface TpkStepperComponentArgs {
  startStep?: number;
  classless?: boolean;
}

export interface TpkStepperComponentSignature {
  Args: TpkStepperComponentArgs;
  Blocks: {
    default: [
      {
        Stepper: WithBoundArgs<
          typeof TpkStepperStepperComponent,
          'classless' | 'guid'
        >;
        Step: WithBoundArgs<
          typeof TpkStepperStepComponent,
          | 'active'
          | 'steps'
          | 'classless'
          | 'unregisterStep'
          | 'registerStep'
          | 'guid'
        >;
        goTo: TpkStepperComponent['goTo'];
        goToNext: TpkStepperComponent['goToNext'];
        goToPrevious: TpkStepperComponent['goToPrevious'];
        isFirst: TpkStepperComponent['isFirst'];
        isLast: TpkStepperComponent['isLast'];
        nextIndex: TpkStepperComponent['nextIndex'];
        previousIndex: TpkStepperComponent['previousIndex'];
        lastIndex: TpkStepperComponent['lastIndex'];
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkStepperComponent extends Component<TpkStepperComponentSignature> {
  @tracked active?: TpkStepperStepComponent;
  @tracked steps: TpkStepperStepComponent[] = [];
  guid = guidFor(this);

  get activeIndex() {
    const idx = this.steps.findIndex((s) => s === this.active);
    return idx === -1 ? undefined : idx + 1;
  }

  get lastIndex() {
    return this.steps.length;
  }

  get nextIndex() {
    return this.activeIndex! + 1;
  }

  get previousIndex() {
    return this.activeIndex! - 1;
  }

  @action registerStep(_: HTMLElement, [step]: [TpkStepperStepComponent]) {
    this.steps = [...this.steps, step];
    if (this.args.startStep && this.steps.length === this.args.startStep) {
      this.goTo(this.args.startStep);
    }
  }

  @action unregisterStep(_: HTMLElement, [step]: [TpkStepperStepComponent]) {
    this.steps = this.steps.filter((s) => s !== step);
  }

  @action goTo(step: TpkStepperStepComponent | number) {
    if (typeof step === 'number') {
      if (step > this.steps.length) {
        return;
      }
      if (step < 1) {
        return;
      }
      this.active = this.steps[step - 1];
      return;
    }
    this.active = step;
  }

  @action goToNext() {
    this.goTo(this.activeIndex! + 1);
  }

  @action goToPrevious() {
    this.goTo(this.activeIndex! - 1);
  }

  get isLast() {
    if (this.activeIndex === undefined) {
      return false;
    }
    return this.activeIndex === this.steps.length;
  }

  get isFirst() {
    if (this.activeIndex === undefined) {
      return false;
    }
    return this.activeIndex === 1;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-stepper': typeof TpkStepperComponent;
  }
}
