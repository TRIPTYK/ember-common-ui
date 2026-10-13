import Component from '@glimmer/component';
export interface TpkRadioInputSignature {
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
export default class TpkRadioInput extends Component<TpkRadioInputSignature> {
    get isChecked(): boolean;
}
//# sourceMappingURL=input.d.ts.map