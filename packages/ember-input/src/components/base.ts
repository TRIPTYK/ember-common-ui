import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';

export interface BaseUIArgs {
  Args: {
    label: string;
    changeEvent?: 'input' | 'change';
  };
}

export interface HtmlInputEvent extends Event {
  target: HTMLInputElement | null;
}

export abstract class BaseUI<T extends BaseUIArgs> extends Component<T> {
  guid = guidFor(this);

  constructor(owner: Owner, args: BaseUIArgs['Args']) {
    super(owner, args);
  }

  get changeEvent(): 'input' | 'change' {
    return this.args.changeEvent ?? 'change';
  }
}
