import { _ as _defineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

class BaseUIComponent extends Component {
  constructor(owner, args) {
    super(owner, args);
    _defineProperty(this, "guid", guidFor(this));
  }
  get changeEvent() {
    return this.args.changeEvent ?? 'change';
  }
}

export { BaseUIComponent };
//# sourceMappingURL=base.js.map
