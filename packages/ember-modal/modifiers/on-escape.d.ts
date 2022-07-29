import Modifier from 'ember-modifier';
interface onEscapeModifierArgs {
    positional: [Function];
    named: {
        relative: boolean;
    };
}
export default class OnEscapeModifier extends Modifier<onEscapeModifierArgs> {
    eh?: (this: Document, ev: KeyboardEvent) => any;
    didInstall(): void;
    willDestroy(): void;
}
export {};
