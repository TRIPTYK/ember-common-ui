import Application from 'doc-app/app';
import config from 'doc-app/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start as qunitStart, setupEmberOnerrorValidation } from 'ember-qunit';
import { setupGlobalA11yHooks } from 'ember-a11y-testing/test-support';
import { setupWorker } from './worker';

export function start() {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  setupGlobalA11yHooks(() => true);

  setupWorker();

  qunitStart();
}
