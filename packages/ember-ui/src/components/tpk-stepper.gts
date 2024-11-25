import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import TpkStepperStepComponent from './tpk-stepper/step.gts';
import TpkStepperStepperComponent from './tpk-stepper/stepper.gts';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';

interface TpkStepperComponentArgs {
  startStep?: number;

}

export interface TpkStepperComponentSignature {
  Args: TpkStepperComponentArgs;
  Blocks: {
    default: [
      {
        Stepper: WithBoundArgs<
          typeof TpkStepperStepperComponent,
          'guid'
        >;
        Step: WithBoundArgs<
          typeof TpkStepperStepComponent,
          | 'active'
          | 'steps'

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

  <template>
    <div class='tpk-stepper' role='tablist' ...attributes>
      {{yield
        (hash
          Stepper=(component
            TpkStepperStepperComponent  guid=this.guid
          )
          Step=(component
            TpkStepperStepComponent
            active=this.active
            steps=this.steps

            unregisterStep=this.unregisterStep
            registerStep=this.registerStep
            guid=this.guid
          )
          goTo=this.goTo
          goToNext=this.goToNext
          goToPrevious=this.goToPrevious
          isFirst=this.isFirst
          isLast=this.isLast
          nextIndex=this.nextIndex
          previousIndex=this.previousIndex
          lastIndex=this.lastIndex
        )
      }}
    </div>
  </template>
}
