import Component from '@glimmer/component';

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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select/options/option': typeof TpkSelectContainerOptionsOption;
  }
}
