import Service from '@ember/service';
export default class CatchState extends Service {
    state: unknown;
}
declare module '@ember/service' {
    interface Registry {
        'catch-state': CatchState;
    }
}
//# sourceMappingURL=catch-state.d.ts.map