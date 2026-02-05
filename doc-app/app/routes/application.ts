/* app/routes/application.ts */
import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';
import translationsForFrFr from 'virtual:ember-intl/translations/fr-fr';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.addTranslations('en-us', translationsForEnUs);
    this.intl.addTranslations('fr-fr', translationsForFrFr);
    this.intl.setLocale(['en-us']);
  }
}
