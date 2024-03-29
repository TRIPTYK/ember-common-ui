import Application from 'dummy/app';
import config from 'dummy/config/environment';
import QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { setupWorker, stopWorker } from './worker';

setApplication(Application.create(config.APP));

QUnit.begin(() => {
  setupWorker();
});

QUnit.done(async function () {
  stopWorker();
});

setup(QUnit.assert);

start();
