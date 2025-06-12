import { modifier } from 'ember-modifier';
import { runTask } from 'ember-lifeline';

function scrollToFirstError(target, element, errors) {
  const firstValidError = errors.find(error => element.querySelector(`[anchorScrollUp="${error?.key}"]`) !== null);
  if (firstValidError) {
    const errorElement = document.querySelector(`[anchorScrollUp="${firstValidError?.key}"]`);
    errorElement.style.transition = '0.3s ease-out';
    const targetTop = errorElement.getBoundingClientRect().top + window.scrollY - 85;
    runTask(target, () => {
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }, 20);
  }
}
var scrollOnError = modifier(function scrollOnError(element, [errors]) {
  scrollToFirstError(this, element, errors);
});

export { scrollOnError as default, scrollToFirstError };
//# sourceMappingURL=scroll-on-error.js.map
