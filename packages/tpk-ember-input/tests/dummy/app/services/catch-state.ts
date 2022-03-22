import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CatchState extends Service {
  @tracked state: unknown;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  // eslint-disable-next-line no-unused-vars
  interface Registry {
    'catch-state': CatchState;
  }
}
