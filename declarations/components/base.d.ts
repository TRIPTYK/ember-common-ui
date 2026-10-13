import Component from '@glimmer/component';
import type Owner from '@ember/owner';
export interface BaseUIArgs {
    Args: {
        label: string;
        changeEvent?: 'input' | 'change';
    };
}
export interface HtmlInputEvent extends Event {
    target: HTMLInputElement | null;
}
export declare abstract class BaseUI<T extends BaseUIArgs> extends Component<T> {
    guid: string;
    constructor(owner: Owner, args: BaseUIArgs['Args']);
    get changeEvent(): 'input' | 'change';
}
//# sourceMappingURL=base.d.ts.map