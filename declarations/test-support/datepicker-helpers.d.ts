/**
 * Checks if the tempus dominus calendar is being displayed.
 *
 * @param {Number} [index=0] - Index of tempus dominus calendar to be targeted (for when multiple exist)
 * @return {Boolean} Whether or not the calendar is visible
 * @function isTempusDominusOpen
 */
export declare function isTempusDominusOpen(index?: number): boolean;
/**
 * Open tempus dominus datepicker
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @function openTempusDominus
 */
export declare function openTempusDominus(selector: string | HTMLElement): void;
/**
 * Close tempus dominus datepicker
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @function closeTempusDominusDate
 */
export declare function closeTempusDominus(selector: string | HTMLElement): void;
/**
 * Sets the date in tempus dominus datepicker
 *
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @param {Object} date - A Date Object or array of Date Objects to set as the selected date(s)
 * @param {Number} index - Index of the date in dates array store in tempus dominus
 * @function setTempusDominusDate
 */
export declare function setTempusDominusDate(selector: string | HTMLElement, date: Date | string | undefined, index?: number): void;
/**
 * Clears out the tempus dominus dates attribute as well as the associated input.
 * @param {String} selector - CSS3 selector of the element to pull the tempus dominus instance from
 * @function clearTempusDominusDate
 */
export declare function clearTempusDominusDate(selector: string | HTMLElement): void;
//# sourceMappingURL=datepicker-helpers.d.ts.map