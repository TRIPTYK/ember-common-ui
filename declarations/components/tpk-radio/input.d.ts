import Component from '@glimmer/component';
export interface TpkRadioInputComponentSignature {
    Args: {
        name: string;
        guid: string;
        value?: string;
        selected: unknown;
        disabled?: boolean;
        changeEvent: 'input' | 'change';
        onChange: (event: Event) => void;
    };
    Element: HTMLInputElement;
    Blocks: {
        default: unknown[];
    };
}
export default class TpkRadioInputComponent extends Component<TpkRadioInputComponentSignature> {
    get isChecked(): boolean;
}
//# sourceMappingURL=input.d.ts.map