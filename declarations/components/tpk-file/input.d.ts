import { type TOC } from '@ember/component/template-only';
export interface TpkFileInputSignature {
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
declare const TpkFileInput: TOC<TpkFileInputSignature>;
export default TpkFileInput;
//# sourceMappingURL=input.d.ts.map