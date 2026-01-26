import Route from '@ember/routing/route';
import { service } from '@ember/service';
import '@warp-drive/ember/install';
import type { IntlService } from 'ember-intl';

export default class ApplicationRoute extends Route {
  @service intl!: IntlService;

  model() {
    this.intl.setLocale(['en-us']);
  }
}
