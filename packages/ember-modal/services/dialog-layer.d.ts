import Service from '@ember/service';
export default class DialogLayer extends Service {
    dialogs: string[];
    get dialogIsOpen(): boolean;
    hasOpenChild(dialog: string): boolean;
    add(dialog: string): void;
    remove(dialog: string): void;
}
declare module '@ember/service' {
    interface Registry {
        'dialog-layer': DialogLayer;
    }
}
