import { setupWorker, stopWorker, teardownMock } from './worker';
import type Owner from '@ember/owner';
import IntlService from 'ember-intl/services/intl';
import Store from 'doc-app/services/store';
import TpkFormService from '@triptyk/ember-input-validation/services/tpk-form';
import dialogLayer from '@triptyk/ember-ui/services/dialog-layer';
import catchState from 'doc-app/services/catch-state';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';
import translationsForFrFr from 'virtual:ember-intl/translations/fr-fr';
import '@warp-drive/ember/install';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

export type VitestTestEnv = {
  owner: Owner;
  element: HTMLElement;
  pauseTest: () => Promise<void>;
};

export function setupTest(owner: Owner, locale = 'fr-fr') {
  owner.register('service:catch-state', catchState);
  owner.register('service:intl', IntlService);
  owner.register('config:environment', {});
  owner.register('service:store', Store);
  owner.register('service:dialog-layer', dialogLayer);
  owner.register('service:tpk-form', TpkFormService);
  const intl = owner.lookup('service:intl');
  intl.addTranslations('en-us', translationsForEnUs);
  intl.addTranslations('fr-fr', translationsForFrFr);
  intl.setLocale(locale);
}

beforeAll(async () => {
  await setupWorker();
});

afterEach(() => {
  teardownMock();
  vi.unstubAllGlobals();
  vi.resetAllMocks();
  vi.useRealTimers();
});

afterAll(() => {
  stopWorker();
});
