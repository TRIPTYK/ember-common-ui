import { type FunctionBasedModifier } from 'ember-modifier';
import type { ValidationError } from 'ember-immer-changeset';
export declare function scrollToFirstError(target: object, element: Element | Document, errors: ValidationError[]): void;
declare const scrollOnErrorModifier: FunctionBasedModifier<{
    Args: {
        Positional: [ValidationError[]];
        Named: object;
    };
    Element: Element;
}>;
export default scrollOnErrorModifier;
//# sourceMappingURL=scroll-on-error.d.ts.map