import type { TOC } from '@ember/component/template-only';
export interface TpkCheckboxInputComponentSignature {
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
declare const TpkCheckboxInputComponent: TOC<TpkCheckboxInputComponentSignature>;
export default TpkCheckboxInputComponent;
//# sourceMappingURL=tpk-checkbox-input.d.ts.map