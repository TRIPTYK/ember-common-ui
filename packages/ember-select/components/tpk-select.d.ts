import Component from '@glimmer/component';
export interface TpkSelectArgs<T> {
    options: T[];
    selected: (T | undefined) | T[];
    multiple?: boolean;
    label?: string;
    classless?: boolean;
    generatedClassPrefix: string;
    defaultText?: string;
    onChange: (newSelected: T, alreadySelected: boolean) => unknown;
}
export declare enum SelectActions {
    Close = 0,
    CloseSelect = 1,
    First = 2,
    Last = 3,
    Next = 4,
    Open = 5,
    OpenFocus = 11,
    PageDown = 6,
    PageUp = 7,
    Previous = 8,
    Select = 9,
    Type = 10
}
export declare const moveOperations: {
    4: number;
    6: number;
    7: number;
    8: number;
};
export default class TpkSelect<T extends TpkSelectArgs<any>> extends Component<T> {
    isOpen: boolean;
    activeChildIndex?: number;
    children: HTMLLIElement[];
    optionListId?: string;
    labelId?: string;
    controller?: HTMLDivElement;
    private searchString;
    private typeTimer?;
    protected keyToOpenSelectAction: {
        [key: string]: SelectActions;
    };
    guid: string;
    private getActionFromKey;
    constructor(owner: unknown, args: TpkSelectArgs<T>);
    refreshChildren(e: HTMLDivElement): void;
    registerControllerDiv(d: HTMLDivElement): void;
    registerLabel(label: HTMLDivElement): void;
    close(): void;
    protected navigate(action: keyof typeof moveOperations | SelectActions.First | SelectActions.Last): void;
    keyDown(event: KeyboardEvent): true | void;
    /**
     * Handles typing on combobox
     */
    private onComboType;
    private isElementSelected;
    onSelectButtonClick(): void;
    onChange(e: T, alreadySelected: boolean): void;
    get hasSelection(): boolean;
    get activeChild(): HTMLLIElement;
}
