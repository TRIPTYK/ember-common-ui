import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { BaseUIComponentArgs } from './base';
import { MergeDeep } from 'type-fest';

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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-button': typeof TpkButtonComponent;
  }
}
