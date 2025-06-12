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
declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'focus-trap': typeof tpkFocusTrap;
    }
}
//# sourceMappingURL=focus-trap.d.ts.map