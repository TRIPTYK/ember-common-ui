import Application from 'doc-app/app';
import config from 'doc-app/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { setupWorker } from './worker';

setApplication(Application.create(config.APP));

QUnit.begin(() => {
  setupWorker();
});

setup(QUnit.assert);

start();
