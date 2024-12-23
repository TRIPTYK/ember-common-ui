import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import type { BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import { on } from '@ember/modifier';
import perform from 'ember-concurrency/helpers/perform';
import { task } from 'ember-concurrency';

export type TpkButtonSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      allowSpam?: boolean;
      disabled?: boolean;
      class?: string;
      onClick?: (e: Event) => void | Promise<void>;
    }
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLButtonElement;
};

export default class TpkButtonComponent extends Component<TpkButtonSignature> {
  guid = guidFor(this);

  performClick = task(this, { drop: true }, async (e: Event) => {
    return this.args.onClick?.(e);
  });

  onClick = task(this, async (e: Event) => {
    if (this.args.allowSpam !== true) {
      return this.performClick.perform(e);
    }
    return this.args.onClick?.(e);
  });

  get disabled() {
    return this.args.disabled ?? false;
  }

  <template>
    <button
      id={{this.guid}}
      disabled={{this.disabled}}
      type='button'
      class='tpk-button'
      {{on 'click' (perform this.onClick)}}
      data-test-tpk-button
      ...attributes
    >
      {{yield}}
    </button>
  </template>
}
