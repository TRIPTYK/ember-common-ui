import { type TOC } from '@ember/component/template-only';
export interface TpkTextareaInputComponentSignature {
    Args: {
        guid: string;
        value?: string;
        disabled?: boolean;
        maxLength?: number;
        placeholder?: string;
        updateCharacterCount: (event: Event) => void;
        setupCharacterCount: (element: HTMLTextAreaElement) => void;
        changeEvent: 'input' | 'change';
        onChange: (event: Event) => void;
    };
    Element: HTMLTextAreaElement;
}
declare const TpkTextareaInputComponent: TOC<TpkTextareaInputComponentSignature>;
export default TpkTextareaInputComponent;
//# sourceMappingURL=input.d.ts.map