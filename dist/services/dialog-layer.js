import Service from '@ember/service';
import { trackedArray } from '@ember/reactive/collections';

class DialogLayerService extends Service {
  dialogs = trackedArray([]);
  get dialogIsOpen() {
    return this.dialogs.length !== 0;
  }
  hasOpenChild = dialog => {
    return this.dialogs[this.dialogs.length - 1] !== dialog;
  };
  add = dialog => {
    this.dialogs.push(dialog);
  };
  remove = dialog => {
    const ix = this.dialogs.findIndex(guid => guid === dialog);
    if (ix === -1) {
      return;
    }
    this.dialogs.splice(ix, 1);
  };
}

export { DialogLayerService as default };
//# sourceMappingURL=dialog-layer.js.map
