import type { Options } from 'focus-trap';
export type TpkFocusTrapSignature = {
    Element: HTMLElement;
    Args: {
        Positional: [];
        Named: {
            options: Options;
        };
    };
};
declare const tpkFocusTrap: import("ember-modifier").FunctionBasedModifier<{
    Element: HTMLElement;
    Args: {
        Named: {
            options: Options;
        };
        Positional: [];
    };
}>;
export default tpkFocusTrap;
//# sourceMappingURL=focus-trap.d.ts.map