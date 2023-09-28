/* eslint-disable no-fallthrough */
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

export interface TpkSelectArgs<T> {
  options: T[];
  selected: (T | undefined) | T[];
  multiple?: boolean;
  label?: string;
  classless?: boolean;
  generatedClassPrefix: string;
  defaultText?: string;
  onChange: (newSelected: T | string, alreadySelected: boolean) => unknown;
}

export enum SelectActions {
  Close = 0,
  CloseSelect = 1,
  First = 2,
  Last = 3,
  Next = 4,
  Open = 5,
  OpenFocus = 11,
  PageDown = 6,
  PageUp = 7,
  Previous = 8,
  Select = 9,
  Type = 10,
}

export const moveOperations = {
  [SelectActions.Next]: 1,
  [SelectActions.PageDown]: -10,
  [SelectActions.PageUp]: 10,
  [SelectActions.Previous]: -1,
};

export default class TpkSelect<
  T extends TpkSelectArgs<any>,
> extends Component<T> {
  @tracked isOpen = false;
  @tracked activeChildIndex?: number;
  @tracked children: HTMLLIElement[] = [];
  @tracked optionListId?: string;
  @tracked labelId?: string;
  @tracked controller?: HTMLDivElement;

  private searchString = '';
  private typeTimer?: number;

  protected keyToOpenSelectAction: { [key: string]: SelectActions } = {
    ArrowUp: SelectActions.Previous,
    ArrowDown: SelectActions.Next,
    PageUp: SelectActions.PageUp,
    PageDown: SelectActions.PageDown,
    Escape: SelectActions.Close,
    Enter: SelectActions.CloseSelect,
    ' ': SelectActions.CloseSelect,
    Tab: SelectActions.CloseSelect,
  };

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

  constructor(owner: unknown, args: TpkSelectArgs<T>) {
    super(owner, args);
    assert(
      'Please provide an @options array to component',
      args.options !== undefined,
    );
    assert(
      'Please provide an @onChange function',
      typeof args.onChange === 'function',
    );
    if (this.args.multiple === true) {
      assert(
        'Please provide an array for @selected',
        Array.isArray(args.selected),
      );
    }
  }

  @action
  refreshChildren(e: HTMLDivElement) {
    this.optionListId = e.id;
    this.children = Array.from(e.querySelectorAll('li')) as HTMLLIElement[];
  }

  @action
  registerControllerDiv(d: HTMLDivElement) {
    this.controller = d;
  }

  @action
  registerLabel(label: HTMLDivElement) {
    this.labelId = label.id;
  }

  @action
  close() {
    this.isOpen = false;
    this.activeChildIndex = undefined;
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

    let value = moveOperations[action];

    const res = this.activeChildIndex + value;

    if (res > this.args.options.length - 1) {
      this.activeChildIndex = this.args.options.length - 1;
    } else if (res <= 0) {
      this.activeChildIndex = 0;
    } else {
      this.activeChildIndex = res;
    }
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

  private isElementSelected(option: T) {
    if (this.args.multiple === true) {
      return (this.args.selected as T[]).includes(option);
    }
    return (this.args.selected as T | undefined) === option;
  }

  @action
  onSelectButtonClick() {
    this.isOpen = !this.isOpen;
  }

  @action
  onChange(e: T | string, alreadySelected: boolean) {
    this.close();
    this.args.onChange(e, alreadySelected);
  }

  get hasSelection() {
    return this.args.multiple === true
      ? (this.args.selected as T[]).length > 0
      : !!this.args.selected;
  }

  get activeChild() {
    return this.children[this.activeChildIndex ?? -1];
  }
}