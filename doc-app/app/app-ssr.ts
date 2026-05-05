import EmberApp from 'ember-strict-application-resolver';

if (typeof window !== 'undefined') {
  const win = window as unknown as Record<string, unknown>;
  for (const name of ['ShadowRoot', 'DocumentFragment', 'Text', 'Comment']) {
    if (!(name in globalThis) && win[name]) {
      Object.defineProperty(globalThis, name, {
        value: win[name],
        writable: true,
        configurable: true,
      });
    }
  }
}

import '@warp-drive/ember/install';
import config from './config/environment';
import Router from './router';
import 'doc-app/styles/app.css';
import PageTitleService from 'ember-page-title/services/page-title';
import RouterService from '@ember/routing/router-service';
import IntlService from 'ember-intl/services/intl';
import { moduleRegistry as EmberUtilsRegistry } from '@triptyk/ember-utils';
import { moduleRegistry as EmberInputValidationRegistry } from '@triptyk/ember-input-validation';
import { moduleRegistry as EmberUIRegistry } from '@triptyk/ember-ui';

class App extends EmberApp {
  modulePrefix = config.modulePrefix;
  modules = {
    ...import.meta.glob('./routes/**/*.ts', { eager: true }),
    ...import.meta.glob('./templates/**/*.{ts,gts}', { eager: true }),
    ...import.meta.glob('./components/**/*.gts', { eager: true }),
    ...import.meta.glob('./services/*.ts', { eager: true }),
    ...import.meta.glob('./helpers/*.ts', { eager: true }),
    ...import.meta.glob('./models/*.ts', { eager: true }),
    './router': { default: Router },
    './services/intl': { default: IntlService },
    './services/page-title': { default: PageTitleService },
    './services/router': { default: RouterService },
    ...EmberUtilsRegistry(),
    ...EmberInputValidationRegistry(),
    ...EmberUIRegistry(),
  };
}

export function createSsrApp() {
  return App.create({
    ...config.APP,
    autoboot: false,
  });
}
