import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { type BaseUIComponentArgs } from './base.ts';
import type { MergeDeep } from 'type-fest';
import { on } from '@ember/modifier';

export type TpkButtonSignature = {
  Args: MergeDeep<
    BaseUIComponentArgs['Args'],
    {
      onClick?: (e: Event) => void;
    }
  >;
  Blocks: {
    default: [];
  };
  Element: HTMLButtonElement;
};

export default class TpkButtonComponent extends Component<TpkButtonSignature> {
  guid = guidFor(this);

  @action
  onClick(e: Event) {
    return this.args.onClick?.(e);
  }

  <template>
    <button
      id={{this.guid}}
      type='button'
      class='tpk-button'
      {{on 'click' this.onClick}}
      data-test-tpk-button
      ...attributes
    >
      {{yield}}
    </button>
  </template>
}
