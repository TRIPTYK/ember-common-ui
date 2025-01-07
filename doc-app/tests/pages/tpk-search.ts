import {
  clickable,
  create,
  fillable,
  focusable,
  triggerable,
} from 'ember-cli-page-object';

export default create({
  scope: '.tpk-search',
  input: fillable('.tpk-search-input'),
  focus: focusable('.tpk-search-input'),
  button: create({
    scope: '.tpk-search-button',
    click: clickable(),
    enter: triggerable('keydown', undefined, {
      eventProperties: { key: 'Enter' },
    }),
  }),
});
