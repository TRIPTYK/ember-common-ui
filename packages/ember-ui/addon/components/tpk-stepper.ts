import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TpkStepperStep from './tpk-stepper/step';

interface TpkStepperArgs {
  startStep?: number;
  classless?: boolean;
}

export default class TpkStepper extends Component<TpkStepperArgs> {
  @tracked active?: TpkStepperStep;
  @tracked steps: TpkStepperStep[] = [];
  guid = guidFor(this);

  get activeIndex() {
    const idx = this.steps.findIndex((s) => s === this.active);
    return idx === -1 ? undefined : idx + 1;
  }

  @action registerStep(_: HTMLElement, [step]: [TpkStepperStep]) {
    this.steps = [...this.steps, step];
    if (this.args.startStep && this.steps.length === this.args.startStep) {
      this.goTo(this.args.startStep);
    }
  }

  @action unregisterStep(_: HTMLElement, [step]: [TpkStepperStep]) {
    this.steps = this.steps.filter((s) => s !== step);
  }

  @action goTo(step: TpkStepperStep | number) {
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
