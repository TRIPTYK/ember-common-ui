import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

class BaseUIComponent extends Component {
  guid = guidFor(this);
  constructor(owner, args) {
    super(owner, args);
  }
  get changeEvent() {
    return this.args.changeEvent ?? 'change';
  }
}

export { BaseUIComponent };
//# sourceMappingURL=base.js.map
