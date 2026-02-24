import Component from '@glimmer/component';
export type TpkButtonSignature = {
    Args: {
        label: string;
        allowSpam?: boolean;
        disabled?: boolean;
        class?: string;
        onClick?: (e: Event) => void | Promise<void>;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLButtonElement;
};
export default class TpkButtonComponent extends Component<TpkButtonSignature> {
    guid: string;
    performClick: import("ember-concurrency").TaskForAsyncTaskFunction<this, (e: Event) => Promise<void | undefined>>;
    onClick: import("ember-concurrency").TaskForAsyncTaskFunction<this, (e: Event) => Promise<void | undefined>>;
    get disabled(): boolean;
}
//# sourceMappingURL=tpk-button.d.ts.map