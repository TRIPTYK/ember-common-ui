import Application from 'doc-app/app';
import config from 'doc-app/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { setupWorker } from './worker';
import { setupGlobalA11yHooks } from 'ember-a11y-testing/test-support';

setApplication(Application.create(config.APP));

QUnit.begin(() => {
  setupWorker();
});

setupGlobalA11yHooks(() => true);

setup(QUnit.assert);

start();
