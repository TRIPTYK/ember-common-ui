import Component from '@glimmer/component';
export interface TpkSelectContainerOptionsOptionArgs<T = unknown> {
    multiple?: boolean;
    option: T;
    selected?: (T | undefined) | T[];
    activeChild?: HTMLElement;
    guid: string;
    index: number;
}
export default class TpkSelectContainerOptionsOption<T> extends Component<TpkSelectContainerOptionsOptionArgs<T>> {
    get id(): string;
    get isSelected(): boolean;
    get hasVirtualFocus(): boolean;
}
