import { modifier } from "ember-modifier";
import { createFocusTrap } from "focus-trap";

export default modifier(function tpkFocusTrap(
  element: HTMLElement,
  _params,
  {focusTrapOtions}:any
) {
  let trap = createFocusTrap(element, focusTrapOtions);
  trap.activate();
  return () => {
    trap.deactivate();
  };
});
