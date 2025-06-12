import Component from '@glimmer/component';
export interface BaseUIComponentArgs {
    Args: {
        label: string;
        changeEvent?: 'input' | 'change';
    };
}
export interface HtmlInputEvent extends Event {
    target: HTMLInputElement | null;
}
export declare abstract class BaseUIComponent<T extends BaseUIComponentArgs> extends Component<T> {
    guid: string;
    constructor(owner: unknown, args: BaseUIComponentArgs['Args']);
    get changeEvent(): 'input' | 'change';
}
//# sourceMappingURL=base.d.ts.map