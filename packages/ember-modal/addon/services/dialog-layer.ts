import { action } from '@ember/object';
import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';

export default class DialogLayer extends Service {
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
    console.log(dialog);
    this.dialogs.push(dialog);
  }

  @action
  remove(dialog: string) {
    console.log('rr', dialog);
    let ix = this.dialogs.findIndex((guid) => guid === dialog);

    this.dialogs.splice(ix, 1);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    'dialog-layer': DialogLayer;
  }
}
