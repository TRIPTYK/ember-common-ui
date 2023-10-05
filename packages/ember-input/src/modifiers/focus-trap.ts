import { modifier } from 'ember-modifier';
import { createFocusTrap } from 'focus-trap';
import type { Options } from 'focus-trap';

export type TpkFocusTrapSignature = {
  Element: HTMLElement;
  Args: {
    Positional: [];
    Named: { options: Options };
  };
};

const tpkFocusTrap = modifier<TpkFocusTrapSignature>(function tpkFocusTrap(
  element: HTMLElement,
  _params,
  { options },
) {
  const trap = createFocusTrap(element, options);
  trap.activate();
  return () => trap.deactivate();
});

export default tpkFocusTrap;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'focus-trap': typeof tpkFocusTrap;
  }
}
