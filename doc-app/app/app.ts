import EmberApp from 'ember-strict-application-resolver';
import '@warp-drive/ember/install';
import config from './config/environment';
import Router from './router';
import 'doc-app/styles/app.css';
import compatModules from '@embroider/virtual/compat-modules';
import PageTitleService from 'ember-page-title/services/page-title';
import RouterService from '@ember/routing/router-service';
import IntlService from 'ember-intl/services/intl';
import { moduleRegistry as EmberUtilsRegistry } from '@triptyk/ember-utils';
import { moduleRegistry as EmberInputValidationRegistry } from '@triptyk/ember-input-validation';
import { moduleRegistry as EmberUIRegistry } from '@triptyk/ember-ui';

export default class App extends EmberApp {
  modulePrefix = config.modulePrefix;
  podModulePrefix = '';
  modules = {
    ...import.meta.glob('./routes/**/*.ts', { eager: true }),
    ...import.meta.glob('./templates/**/*.{ts,gts}', { eager: true }),
    ...import.meta.glob('./components/**/*.gts', { eager: true }),
    ...import.meta.glob('./services/*.ts', { eager: true }),
    ...import.meta.glob('./helpers/*.ts', { eager: true }),
    ...import.meta.glob('./models/*.ts', { eager: true }),
    ...compatModules,
    './router': { default: Router },
    './services/intl': { default: IntlService },
    './services/page-title': { default: PageTitleService },
    './services/router': { default: RouterService },
    ...EmberUtilsRegistry(),
    ...EmberInputValidationRegistry(),
    ...EmberUIRegistry(),
  };
}
