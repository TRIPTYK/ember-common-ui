import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';

export interface BaseUIComponentArgs {
  Args: {
    label: string;
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

  constructor(owner: Owner, args: BaseUIComponentArgs['Args']) {
    super(owner, args);
  }

  get changeEvent(): 'input' | 'change' {
    return this.args.changeEvent ?? 'change';
  }
}
