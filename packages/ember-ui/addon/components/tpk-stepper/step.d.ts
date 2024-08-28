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
    get isActive(): boolean;
    get index(): number;
}
export {};
//# sourceMappingURL=step.d.ts.map