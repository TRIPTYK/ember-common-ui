import Component from '@glimmer/component';
interface TpkSelectContainerSearchbarArgs<T = unknown> {
    options: T[];
    selected: T;
    isOpen: boolean;
    onSearch: (searchValue: string) => void;
}
export default class TpkSelectContainerSearchbar extends Component<TpkSelectContainerSearchbarArgs> {
    /**
     * Focus on deploy
     */
    focus(e: HTMLElement, [isOpen]: [boolean]): void;
    search(e: Event): void;
}
export {};
