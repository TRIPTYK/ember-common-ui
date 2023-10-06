/* eslint-disable no-fallthrough */
import { action } from '@ember/object';
import TpkSelectComponent, {
  moveOperations,
  SelectActions,
} from './tpk-select';
import { ComponentLike } from '@glint/template';
import TpkSelectSearchLabelComponent from './tpk-select-search/label';
import TpkSelectSearchOptionsComponent from './tpk-select-search/options';
import TpkSelectSearchButtonComponent from './tpk-select-search/button';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { guidFor } from '@ember/object/internals';
import TpkSelectSearchInputComponent from './tpk-select-search/input';

export interface TpkSelectSearchSignature {
  Args: {
    options: unknown[];
    selected: (unknown | undefined) | unknown[];
    multiple?: boolean;
    label: string;
    classless?: boolean;
    onInput: (value: string) => void;
    generatedClassPrefix: string;
    defaultText?: string;
    onChange: (
      newSelected: unknown | string,
      alreadySelected: boolean,
    ) => unknown;
  };
  Blocks: {
    default: [
      {
        Label: ComponentLike<TpkSelectSearchLabelComponent>;
        Options: ComponentLike<TpkSelectSearchOptionsComponent>;
        Input: ComponentLike<TpkSelectSearchInputComponent>;
        Button: ComponentLike<TpkSelectSearchButtonComponent>;
        isOpen: boolean;
        selected: unknown;
        guid: string;
        onChange: TpkSelectComponent['onChange'];
        onSelectButtonClick: () => void;
        hasSelection: boolean;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class TpkSelectSearchComponent extends Component<TpkSelectSearchSignature> {
  protected keyToOpenSelectAction: { [key: string]: SelectActions } = {
    ArrowUp: SelectActions.Previous,
    ArrowDown: SelectActions.Next,
    PageUp: SelectActions.PageUp,
    PageDown: SelectActions.PageDown,
    Escape: SelectActions.Close,
    Enter: SelectActions.CloseSelect,
    Tab: SelectActions.CloseSelect,
  };

  @tracked isOpen = false;
  @tracked activeChildIndex?: number;
  @tracked children: HTMLLIElement[] = [];
  @tracked optionListId?: string;
  @tracked labelId?: string;
  @tracked controller?: HTMLDivElement;

  private searchString = '';
  private typeTimer?: number;

  guid = guidFor(this);

  private getActionFromKey(event: KeyboardEvent): SelectActions | undefined {
    const { key, altKey, ctrlKey, metaKey } = event;
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action

    if (!this.isOpen && openKeys.includes(key)) {
      if (key === 'ArrowUp') {
        return SelectActions.OpenFocus;
      }
      return SelectActions.Open;
    }

    // home and end move the selected option when open or closed
    if (key === 'Home') {
      return SelectActions.First;
    }
    if (key === 'End') {
      return SelectActions.Last;
    }

    if (
      key === 'Backspace' ||
      key === 'Clear' ||
      (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
    ) {
      return SelectActions.Type;
    }

    // handle typing characters when open or closed
    if (
      key === 'Backspace' ||
      key === 'Clear' ||
      (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
    ) {
      return SelectActions.Type;
    }

    // handle keys when open
    if (this.isOpen) {
      if (key === 'ArrowUp' && altKey) {
        return SelectActions.CloseSelect;
      } else if (Object.keys(this.keyToOpenSelectAction).includes(key)) {
        return this.keyToOpenSelectAction[key];
      }
    }

    return;
  }

  @action
  refreshChildren(e: HTMLUListElement) {
    this.optionListId = e.id;
    this.children = Array.from(e.querySelectorAll('li')) as HTMLLIElement[];
  }

  @action
  registerControllerDiv(d: HTMLDivElement) {
    this.controller = d;
  }

  @action
  registerLabel(label: HTMLLabelElement) {
    this.labelId = label.id;
  }

  @action
  close() {
    this.isOpen = false;
    this.activeChildIndex = undefined;
  }

  @action
  keyDown(event: KeyboardEvent) {
    const action = this.getActionFromKey(event);

    switch (action) {
      case SelectActions.Last:
      case SelectActions.First:
        this.isOpen = true;
      case SelectActions.Next:
      case SelectActions.Previous:
      case SelectActions.PageUp:
      case SelectActions.PageDown:
        event.preventDefault();
        this.navigate(action);
        return;
      case SelectActions.Close:
        event.preventDefault();
        return this.close();
      case SelectActions.OpenFocus:
        this.activeChildIndex = 0;
      case SelectActions.Open:
        event.preventDefault();
        this.controller!.focus();
        return (this.isOpen = true);
      case SelectActions.Select:
      case SelectActions.CloseSelect: {
        if (this.activeChildIndex !== undefined && this.activeChildIndex >= 0) {
          const selectedOption = this.args.options[this.activeChildIndex];
          this.close();
          return this.onChange(
            selectedOption,
            this.isElementSelected(selectedOption),
          );
        }
        this.close();
        return;
      }
      case SelectActions.Type:
        return this.onComboType(event.key);
    }

    return;
  }

  /**
   * Handles typing on combobox
   */
  private onComboType(letter: string) {
    this.isOpen = true;
    clearTimeout(this.typeTimer);
    this.typeTimer = setTimeout(() => {
      this.searchString = '';
      this.typeTimer = undefined;
    }, 400) as unknown as number;

    if (letter === this.searchString[this.searchString.length - 1]) {
      this.searchString = letter;
      const nextChild = this.children[this.activeChildIndex! + 1];
      if (nextChild?.innerText.trim().startsWith(this.searchString)) {
        this.activeChildIndex!++;
      } else {
        this.activeChildIndex = this.children.findIndex((c) => {
          return c.innerText.trim().startsWith(this.searchString);
        });
      }
      return;
    }

    this.searchString += letter;
    const match = this.children.findIndex((c) => {
      return c.innerText.trim().startsWith(this.searchString);
    });

    if (match !== -1) {
      this.activeChildIndex = match;
    } else {
      clearTimeout(this.typeTimer);
      this.searchString = '';
      this.typeTimer = undefined;
    }
  }

  private isElementSelected(option: unknown) {
    if (this.args.multiple === true) {
      return (this.args.selected as unknown[]).includes(option);
    }
    return (this.args.selected as unknown | undefined) === option;
  }

  @action
  onSelectButtonClick() {
    this.isOpen = !this.isOpen;
  }

  @action
  onChange(e: unknown, alreadySelected: boolean) {
    this.close();
    this.args.onChange(e, alreadySelected);
  }

  get hasSelection() {
    return this.args.multiple === true
      ? (this.args.selected as unknown[]).length > 0
      : !!this.args.selected;
  }

  get activeChild() {
    return this.children[this.activeChildIndex ?? -1];
  }

  @action
  onInput(e: Event) {
    this.isOpen = true;
    this.args.onInput((e.target as HTMLInputElement).value);
  }

  protected navigate(
    action:
      | keyof typeof moveOperations
      | SelectActions.First
      | SelectActions.Last,
  ) {
    if (action === SelectActions.First) {
      this.activeChildIndex = 0;
      return;
    }

    if (action === SelectActions.Last) {
      this.activeChildIndex = this.children.length - 1;
      return;
    }

    if (this.activeChildIndex === undefined) {
      this.activeChildIndex = 0;
      return;
    }

    const value = moveOperations[action];

    const res = this.activeChildIndex + value;

    if (res > this.args.options.length - 1) {
      this.activeChildIndex = 0;
    } else if (res < 0) {
      this.activeChildIndex = this.args.options.length - 1;
    } else if (res === 0) {
      this.activeChildIndex = 0;
    } else {
      this.activeChildIndex = res;
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'tpk-select-search': typeof TpkSelectSearchComponent;
    TpkSelectSearch: typeof TpkSelectSearchComponent;
  }
}
