import Service from '@ember/service';
import { trackedArray } from '@ember/reactive/collections';

export default class DialogLayerService extends Service {
  dialogs: string[] = trackedArray([]);

  get dialogIsOpen() {
    return this.dialogs.length !== 0;
  }

  hasOpenChild = (dialog: string) => {
    return this.dialogs[this.dialogs.length - 1] !== dialog;
  };

  add = (dialog: string) => {
    this.dialogs.push(dialog);
  };

  remove = (dialog: string) => {
    const ix = this.dialogs.findIndex((guid) => guid === dialog);

    if (ix === -1) {
      return;
    }

    this.dialogs.splice(ix, 1);
  };
}
