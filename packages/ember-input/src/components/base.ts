import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

export interface BaseUIComponentArgs {
  Args: {
    classless?: boolean;
    label: string;
    value?: string;
    changeEvent?: 'input' | 'change';
  };
}

export interface HtmlInputEvent extends Event {
  target: HTMLInputElement | null;
}

export abstract class BaseUIComponent<
  T extends BaseUIComponentArgs,
> extends Component<T> {
  guid = guidFor(this);

  constructor(owner: unknown, args: BaseUIComponentArgs['Args']) {
    super(owner, args);
  }

  get changeEvent(): 'input' | 'change' {
    return this.args.changeEvent ?? 'change';
  }
}
