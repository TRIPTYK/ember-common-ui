import Component from '@glimmer/component';
import type { FactoryArg, InputMask } from 'imask';
import type Owner from '@ember/owner';
import { type FunctionBasedModifier } from 'ember-modifier';
import type { EmptyObject } from 'type-fest';
export interface TpkInputInputComponentSignature {
    Args: {
        guid: string;
        type?: string;
        placeholder?: string;
        mask?: unknown;
        maskOptions?: Record<string, unknown>;
        unmaskValue?: boolean;
        disabled?: boolean;
        min?: number;
        step?: number;
        max?: number;
        value?: string | number | boolean | null | undefined;
        changeEvent: 'input' | 'change';
        onChange?: (value: string | number | Date | null, e: Event) => unknown;
    };
    Element: HTMLInputElement;
    Blocks: {
        default: unknown[];
    };
}
export default class TpkInputInputComponent extends Component<TpkInputInputComponentSignature> {
    mask?: InputMask<FactoryArg>;
    constructor(owner: Owner, args: TpkInputInputComponentSignature['Args']);
    get value(): string | number | boolean | null | undefined;
    onChange(e: Event): void;
    private inputValue;
    setMask(element: HTMLInputElement): void;
    setupMask: FunctionBasedModifier<{
        Args: {
            Positional: unknown[];
            Named: EmptyObject;
        };
        Element: HTMLElement;
    }>;
}
//# sourceMappingURL=input.d.ts.map