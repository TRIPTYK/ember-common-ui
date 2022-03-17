/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiCheckboxArgs {
  onChange: (
    checked: boolean,
    value: string,
    e: CheckboxEvent
  ) => Promise<unknown> | unknown;
}

interface CheckboxEvent extends Event {
  target: HTMLInputElement | null;
}

export default class UiCheckbox extends Component<UiCheckboxArgs> {
  guid = guidFor(this);

  @action
  onChange(e: CheckboxEvent) {
    e.preventDefault();
    this.args.onChange(e.target!.checked, e.target!.value, e);
  }
}
