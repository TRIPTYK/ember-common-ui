import type { TOC } from '@ember/component/template-only';
export interface TpkCheckboxInputSignature {
    Args: {
        guid: string;
        value?: string;
        checked?: boolean;
        disabled?: boolean;
        changeEvent: 'input' | 'change';
        onChange: (event: Event) => void;
    };
    Element: HTMLInputElement;
}
declare const TpkCheckboxInput: TOC<TpkCheckboxInputSignature>;
export default TpkCheckboxInput;
//# sourceMappingURL=tpk-checkbox-input.d.ts.map