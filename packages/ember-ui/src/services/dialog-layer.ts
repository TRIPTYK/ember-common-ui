import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class DialogLayerService extends Service {
  @tracked dialogs: string[] = [];

  get dialogIsOpen() {
    return this.dialogs.length !== 0;
  }

  @action
  hasOpenChild(dialog: string) {
    return this.dialogs[this.dialogs.length - 1] !== dialog;
  }

  @action
  add(dialog: string) {
    this.dialogs.push(dialog);
  }

  @action
  remove(dialog: string) {
    const ix = this.dialogs.findIndex((guid) => guid === dialog);

    this.dialogs.splice(ix, 1);
  }
}
