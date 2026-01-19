import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CatchState extends Service {
  @tracked state: unknown;
}
