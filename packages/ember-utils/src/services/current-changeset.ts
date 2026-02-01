import { action } from '@ember/object';
import type Owner from '@ember/owner';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

interface DirtyAbleObject {
  isDirty: boolean;
}

export default class CurrentChangeset extends Service {
  @service declare router: RouterService;
  @tracked changeset?: DirtyAbleObject;
  @tracked waitingTransition?: Transition;
  @tracked approvalNeeded?: boolean;

  constructor(props: Owner | undefined) {
    super(props);
    this.router.on('routeWillChange', this.checkTransition.bind(this));
    this.router.on('routeDidChange', this.resetTransition.bind(this));
  }

  @action
  resetTransition(transition: Transition) {
    if (transition.to?.name === transition.from?.name) {
      return;
    }
    this.approvalNeeded = false;
    this.changeset = undefined;
  }

  @action
  checkTransition(transition: Transition) {
    /**
     * Same route transition ? Don't block
     * Aproved ? Don't block
     */
    if (
      transition.to?.name === transition.from?.name ||
      transition.data['approved']
    ) {
      return;
    }

    if (this.changeset?.isDirty) {
      this.approvalNeeded = true;
      this.waitingTransition = transition;
      transition.abort();
    }
  }

  @action
  approveTransition() {
    this.approvalNeeded = false;
    /**
     * Need to set data otherwise it will be blocked again
     */
    this.waitingTransition!.data['approved'] = true;
    this.waitingTransition?.retry();
  }

  @action
  denyTransition() {
    this.approvalNeeded = false;
    this.waitingTransition = undefined;
  }

  willDestroy = () => {
    this.router.off('routeWillChange', this.checkTransition.bind(this));
    this.router.off('routeDidChange', this.resetTransition.bind(this));
    super.willDestroy();
  };
}
