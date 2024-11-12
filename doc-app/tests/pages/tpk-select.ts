import {
  attribute,
  clickable,
  collection,
  create,
  property,
  triggerable,
} from 'ember-cli-page-object';
import { findOne } from 'ember-cli-page-object/extend';
import { getter } from 'ember-cli-page-object/macros';

export default create({
  scope: '.tpk-select',
  isOpen: attribute('data-is-open'),
  click: clickable(),
  escape: triggerable('keydown', undefined, {
    eventProperties: { key: 'Escape' },
  }),
  tab: triggerable('keydown', undefined, {
    eventProperties: { key: 'Tab' },
  }),
  button: create({
    scope: '.tpk-select-button',
    click: clickable(),
    hasFocus: getter(function () {
      return document.activeElement === findOne(this);
    }),
    isExpanded: attribute('aria-expanded'),
    arrowDown: triggerable('keydown', undefined, {
      eventProperties: { key: 'ArrowDown' },
    }),
    type: triggerable('keydown'),
    enter: triggerable('keydown', undefined, {
      eventProperties: { key: 'Enter' },
    }),
    space: triggerable('keydown', undefined, {
      eventProperties: { key: ' ' },
    }),
    home: triggerable('keydown', undefined, {
      eventProperties: { key: 'Home' },
    }),
    end: triggerable('keydown', undefined, {
      eventProperties: { key: 'End' },
    }),
    arrowUp: triggerable('keydown', undefined, {
      eventProperties: { key: 'ArrowUp' },
    }),
    tab: triggerable('keydown', undefined, {
      eventProperties: { key: 'Tab' },
    }),
    altArrowDown: triggerable('keydown', undefined, {
      eventProperties: {
        key: 'ArrowDown',
        altKey: true,
      } as Partial<KeyboardEvent>,
    }),
    altArrowUp: triggerable('keydown', undefined, {
      eventProperties: {
        key: 'ArrowUp',
        altKey: true,
      } as Partial<KeyboardEvent>,
    }),
  }),
  listbox: create({
    scope: '.tpk-select-options',
    multiSelectable: attribute('aria-multiselectable'),
    options: collection('.tpk-select-options-option', {
      ariaSelected: attribute('aria-selected'),
      id: property('id'),
      hasFocus: attribute('data-has-focus'),
    }),
  }),
});
