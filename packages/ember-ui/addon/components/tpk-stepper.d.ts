import Component from '@glimmer/component';
import TpkStepperStep from './tpk-stepper/step';
interface TpkStepperArgs {
    startStep?: number;

}
export default class TpkStepper extends Component<TpkStepperArgs> {
    active?: TpkStepperStep;
    steps: TpkStepperStep[];
    guid: any;
    get activeIndex(): number | undefined;
    get lastIndex(): number;
    get nextIndex(): number;
    get previousIndex(): number;
    registerStep(_: HTMLElement, [step]: [TpkStepperStep]): void;
    unregisterStep(_: HTMLElement, [step]: [TpkStepperStep]): void;
    goTo(step: TpkStepperStep | number): void;
    goToNext(): void;
    goToPrevious(): void;
    get isLast(): boolean;
    get isFirst(): boolean;
}
export {};
//# sourceMappingURL=tpk-stepper.d.ts.map
