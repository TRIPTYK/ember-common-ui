import type { HTMLInputTDElement } from '../components/tpk-datepicker-new/input';
import { find } from '@ember/test-helpers';
import { DateTime } from '@eonasdan/tempus-dominus';

/**
 * Checks if the tempus dominus calendar is being displayed.
 *
 * @param {Number} [index=0] - Index of tempus dominus calendar to be targeted (for when multiple exist)
 * @return {Boolean} Whether or not the calendar is visible
 * @function isTempusDominusOpen
 */
export function isTempusDominusOpen(index = 0) {
  const tempusDominus = document.getElementsByClassName(
    'tempus-dominus-widget',
  )[index];
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
export function openTempusDominus(selector: string | HTMLElement) {
  const tdInput = _getTempusDominusElement(selector, 'openTempusDominus');
  if (!tdInput) return;
  tdInput._tempusDominus.show();
}

/**
 * Close tempus dominus datepicker
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @function closeTempusDominusDate
 */
export function closeTempusDominus(selector: string | HTMLElement) {
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
export function setTempusDominusDate(
  selector: string | HTMLElement,
  date: Date,
  index?: number,
) {
  const tdInput = _getTempusDominusElement(selector, 'setTempusDominusDate');
  if (!tdInput) return;
  tdInput._tempusDominus.dates.setValue(new DateTime(date), index);
}

/**
 * Clears out the tempus dominus dates attribute as well as the associated input.
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @function clearTempusDominusDate
 */
export function clearTempusDominusDate(selector: string | HTMLElement) {
  const tdInput = _getTempusDominusElement(selector, 'clearTempusDominusDate');
  if (!tdInput) return;
  tdInput._tempusDominus.dates.clear();
}

function _getTempusDominusElement(
  selector: string | HTMLElement,
  functionName: string,
): HTMLInputTDElement | void {
  const tdInput = selector instanceof HTMLElement ? selector : find(selector);
  if (!tdInput) return _throwSelectorError(selector, functionName);
  return tdInput as HTMLInputTDElement;
}

function _throwSelectorError(
  selector: string | HTMLElement,
  functionName: string,
) {
  throw new Error(
    `${functionName}() - No input was found using selector '${selector}'`,
  );
}
