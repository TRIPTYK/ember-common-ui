import { a as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-DQMK6eDu.js';
import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

var _class, _descriptor;
let DialogLayerService = (_class = class DialogLayerService extends Service {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "dialogs", _descriptor, this);
  }
  get dialogIsOpen() {
    return this.dialogs.length !== 0;
  }
  hasOpenChild(dialog) {
    return this.dialogs[this.dialogs.length - 1] !== dialog;
  }
  add(dialog) {
    this.dialogs.push(dialog);
  }
  remove(dialog) {
    const ix = this.dialogs.findIndex(guid => guid === dialog);
    this.dialogs.splice(ix, 1);
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "dialogs", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "hasOpenChild", [action], Object.getOwnPropertyDescriptor(_class.prototype, "hasOpenChild"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "add", [action], Object.getOwnPropertyDescriptor(_class.prototype, "add"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "remove", [action], Object.getOwnPropertyDescriptor(_class.prototype, "remove"), _class.prototype), _class);

export { DialogLayerService as default };
//# sourceMappingURL=dialog-layer.js.map
