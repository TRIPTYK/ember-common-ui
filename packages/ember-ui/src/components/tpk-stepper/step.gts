import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import TpkStepperStepHeaderComponent from './step/header';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';
import { hash } from '@ember/helper';

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
        Header: ComponentLike<typeof TpkStepperStepHeaderComponent>;
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

  <template>
    <div
      data-is-active='{{this.isActive}}'
      class={{unless @classless 'tpk-stepper-step'}}
      role='tabpanel'
      {{willDestroy @unregisterStep this}}
      {{didInsert @registerStep this}}
      ...attributes
    >
      {{yield
        (hash
          index=this.index
          isActive=this.isActive
          Header=(component
            TpkStepperStepHeaderComponent
            guid=@guid
            classless=@classless
            isActive=this.isActive
          )
        )
      }}
    </div>
  </template>
}
