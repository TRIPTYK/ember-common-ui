/* eslint-disable no-unused-vars */
import { action } from '@ember/object';
import Component from '@glimmer/component';

interface TpkInputInputArgs {
  classLess?: boolean;
  label?: string;
  guid: string;
  onChange?: (value: string, e: Event) => unknown;
  onInput?: (value: string, e: Event) => unknown;
}

interface HtmlElementInputEvent extends Event {
  target: HTMLInputElement | null;
}

export default class TpkInputInput extends Component<TpkInputInputArgs> {
  @action
  public on(type: 'change' | 'input', e: HtmlElementInputEvent) {
    e.preventDefault();
    this.args[type === 'change' ? 'onChange' : 'onInput']?.(
      e.target?.value ?? '',
      e
    );
  }
}
