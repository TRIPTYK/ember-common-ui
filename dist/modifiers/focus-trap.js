import { modifier } from 'ember-modifier';
import { createFocusTrap } from 'focus-trap';

const tpkFocusTrap = modifier(function tpkFocusTrap(element, _params, {
  options
}) {
  const trap = createFocusTrap(element, options);
  trap.activate();
  return () => trap.deactivate();
});

export { tpkFocusTrap as default };
//# sourceMappingURL=focus-trap.js.map
