import {
  clickable,
  collection,
  create,
  isPresent,
} from 'ember-cli-page-object';

export const actionMenuObject = create({
  scope: '[data-test-actions-menu]',
  seeAllAction: clickable('[data-test-actions-open-action]'),
  areActionsVisible: isPopoverOpen('[data-test-actions-list]'),
  actions: collection(
    'ul li',
    create({
      trigger: clickable('button'),
      isIconRendered: isPresent('svg'),
    })
  ),
});

function isPopoverOpen(selector: string) {
  return {
    isDescriptor: true,
    get() {
      const el = document.querySelector(selector);
      return el?.matches(':popover-open') ?? false;
    },
  };
}
