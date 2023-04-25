import { modifier } from 'ember-modifier';
import { createFocusTrap } from 'focus-trap';
import type { Options } from 'focus-trap';

export default modifier(function tpkFocusTrap(
  element: HTMLElement,
  _params,
  options: Options
) {
  let trap = createFocusTrap(element, options);
  trap.activate();
  return () => trap.deactivate();
});
