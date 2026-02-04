import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CatchState<T = unknown> extends Service {
  @tracked state?: T;
}
