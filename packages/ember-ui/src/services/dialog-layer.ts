import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

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
    this.dialogs = [...this.dialogs, dialog];
  }

  @action
  remove(dialog: string) {
    const ix = this.dialogs.findIndex((guid) => guid === dialog);

    this.dialogs = [
      ...this.dialogs.slice(0, ix),
      ...this.dialogs.slice(ix + 1),
    ];
  }
}
