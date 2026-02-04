import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentTransitionService extends Service {
  @tracked currentTransition?: Transition;
  @service declare router: RouterService;

  @action
  setCurrentTransition(t: Transition) {
    this.currentTransition = t;
  }

  @action
  goBack(route: string) {
    if (!this.currentTransition?.from?.name) {
      this.router.transitionTo(route);
      return;
    }

    this.router.transitionTo(
      this.currentTransition.from.name,
      ...Object.values(this.currentTransition.from.params ?? {}),
      {
        queryParams: this.currentTransition.from.queryParams,
      },
    );
  }
}
