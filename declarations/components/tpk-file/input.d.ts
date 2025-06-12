import { type TOC } from '@ember/component/template-only';
export interface TpkFileInputComponentSignature {
    Args: {
        guid: string;
        accept?: string;
        disabled?: boolean;
        multiple?: boolean;
        changeEvent: 'input' | 'change';
        onChange: (event: Event) => void;
    };
    Element: HTMLInputElement;
}
declare const TpkFileInputComponent: TOC<TpkFileInputComponentSignature>;
export default TpkFileInputComponent;
//# sourceMappingURL=input.d.ts.map