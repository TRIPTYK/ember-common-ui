import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

// We have a base class to keep consistency between the inputs
export interface BaseUIComponentArgs {
  classless?: boolean;
  label?: string;
  value: unknown;
  changeEvent: 'input' | 'change';
  // eslint-disable-next-line no-unused-vars
  onChange?: (...args: unknown[]) => unknown;
}

export interface HtmlInputEvent extends Event {
  target: HTMLInputElement | null;
}

export abstract class BaseUIComponent<
  T extends BaseUIComponentArgs
> extends Component<T> {
  guid = guidFor(this);

  // eslint-disable-next-line no-unused-vars
  abstract onChange(e: HtmlInputEvent): unknown;
}
