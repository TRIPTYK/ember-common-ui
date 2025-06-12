import { find } from '@ember/test-helpers';
import { DateTime } from '@eonasdan/tempus-dominus';

/**
 * Checks if the tempus dominus calendar is being displayed.
 *
 * @param {Number} [index=0] - Index of tempus dominus calendar to be targeted (for when multiple exist)
 * @return {Boolean} Whether or not the calendar is visible
 * @function isTempusDominusOpen
 */
function isTempusDominusOpen(index = 0) {
  const tempusDominus = document.getElementsByClassName('tempus-dominus-widget')[index];
  if (!tempusDominus) {
    return false;
  }
  return tempusDominus.classList.contains('show');
}

/**
 * Open tempus dominus datepicker
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @function openTempusDominus
 */
function openTempusDominus(selector) {
  const tdInput = _getTempusDominusElement(selector, 'openTempusDominus');
  if (!tdInput) return;
  tdInput._tempusDominus.show();
}

/**
 * Close tempus dominus datepicker
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @function closeTempusDominusDate
 */
function closeTempusDominus(selector) {
  const tdInput = _getTempusDominusElement(selector, 'openTempusDominus');
  if (!tdInput) return;
  tdInput._tempusDominus.hide();
}

/**
 * Sets the date in tempus dominus datepicker
 *
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @param {Object} date - A Date Object or array of Date Objects to set as the selected date(s)
 * @param {Number} index - Index of the date in dates array store in tempus dominus
 * @function setTempusDominusDate
 */
function setTempusDominusDate(selector, date, index) {
  const tdInput = _getTempusDominusElement(selector, 'setTempusDominusDate');
  if (!tdInput) return;
  if (!date) {
    tdInput._tempusDominus.dates.setValue(undefined, index);
    return;
  }
  tdInput._tempusDominus.dates.setValue(new DateTime(date), index);
}

/**
 * Clears out the tempus dominus dates attribute as well as the associated input.
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @function clearTempusDominusDate
 */
function clearTempusDominusDate(selector) {
  const tdInput = _getTempusDominusElement(selector, 'clearTempusDominusDate');
  if (!tdInput) return;
  tdInput._tempusDominus.dates.clear();
}
function _getTempusDominusElement(selector, functionName) {
  const tdInput = selector instanceof HTMLElement ? selector : find(selector);
  if (!tdInput) return _throwSelectorError(selector, functionName);
  return tdInput;
}
function _throwSelectorError(selector, functionName) {
  throw new Error(`${functionName}() - No input was found using selector '${selector}'`);
}

export { clearTempusDominusDate, closeTempusDominus, isTempusDominusOpen, openTempusDominus, setTempusDominusDate };
//# sourceMappingURL=datepicker-helpers.js.map
