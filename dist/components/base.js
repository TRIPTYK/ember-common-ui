import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

class BaseUI extends Component {
  guid = guidFor(this);
  constructor(owner, args) {
    super(owner, args);
  }
  get changeEvent() {
    return this.args.changeEvent ?? 'change';
  }
}

export { BaseUI };
//# sourceMappingURL=base.js.map
