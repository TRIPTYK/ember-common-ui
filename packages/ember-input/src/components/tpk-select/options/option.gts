import Component from '@glimmer/component';
import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';

export interface TpkSelectContainerOptionsOptionArgs {
  Args: {
    multiple?: boolean;
    option: unknown;
    onChange: (option: unknown, isSelected: boolean, e: Event) => void;
    classless?: boolean;
    selected?: (unknown | undefined) | unknown[];
    activeChild?: HTMLElement;
    guid: string;
    index: number;
  };
  Element: HTMLLIElement;
  Blocks: {
    default: [{ option: unknown; isSelected: boolean }];
  };
}

export default class TpkSelectContainerOptionsOption extends Component<TpkSelectContainerOptionsOptionArgs> {
  get id() {
    return `${this.args.guid}-listbox-option-${this.args.index}`;
  }

  get isSelected() {
    if (this.args.multiple === true) {
      return (this.args.selected as unknown[]).includes(this.args.option);
    }
    return (this.args.selected as unknown | undefined) === this.args.option;
  }

  get hasVirtualFocus() {
    return this.args.activeChild?.id === this.id;
  }

  <template>
    <li
      {{on 'click' (fn @onChange @option this.isSelected)}}
      id={{this.id}}
      aria-selected='{{this.isSelected}}'
      role='option'
      class={{unless @classless 'tpk-select-options-option'}}
      data-has-focus='{{this.hasVirtualFocus}}'
      data-test-option={{@index}}
      ...attributes
    >
      {{yield (hash option=@option isSelected=this.isSelected)}}
    </li>
  </template>
}
