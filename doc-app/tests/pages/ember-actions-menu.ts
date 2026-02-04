import {
  clickable,
  collection,
  create,
  isPresent,
  triggerable,
} from 'ember-cli-page-object';

export const actionMenuObject = create({
  scope: '[data-test-actions-menu]',
  seeAllAction: clickable('[data-test-actions-open-action]'),
  areActionsVisible: isPresent('ul'),
  escape: triggerable('keyup', undefined, {
    eventProperties: { key: 'Escape' },
  }),
  actions: collection(
    'ul li',
    create({
      trigger: clickable('button'),
      isIconRendered: isPresent('img'),
    })
  ),
});
