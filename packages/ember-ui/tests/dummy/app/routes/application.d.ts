import Route from '@ember/routing/route';
import { IntlService } from 'ember-intl';
export default class ApplicationRoute extends Route {
    intl: IntlService;
    beforeModel(): Promise<void>;
}
//# sourceMappingURL=application.d.ts.map