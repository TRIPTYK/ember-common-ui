import Service from '@ember/service';
export default class DialogLayerService extends Service {
    dialogs: string[];
    get dialogIsOpen(): boolean;
    hasOpenChild(dialog: string): boolean;
    add(dialog: string): void;
    remove(dialog: string): void;
}
//# sourceMappingURL=dialog-layer.d.ts.map