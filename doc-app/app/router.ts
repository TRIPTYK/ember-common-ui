// @ts-expect-error no types
import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';
import RouterDSL from '@ember/routing/-private/router-dsl';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function (this: RouterDSL) {
  docsRoute(this, function (this: RouterDSL) {
    this.route('ember-ui', function (this: RouterDSL) {
      this.route('prefabs', function () {
        this.route('confirm-modal')
      })
      this.route('installation');
      this.route('lazy-image');
      this.route('actions-menu');
      this.route('modal');
      this.route('table-generic');
      this.route('file-list');
      this.route('stack-list');
    });
    this.route('ember-input', function () {
      this.route('installation');
      this.route('prefabs', function () {
        this.route('button')
        this.route('toggle');
      });
      this.route('input');
      this.route('button');
      this.route('checkbox');
      this.route('datepicker');
      this.route('file');
      this.route('radio');
      this.route('select');
      this.route('select-search');
      this.route('textarea');
    });
    this.route('ember-input-validation', function () {
      this.route('prefabs', function () {
        this.route('input');
        this.route('textarea');
        this.route('checkbox');
        this.route('radio');
        this.route('radio-group');
        this.route('password');
        this.route('mobile');
        this.route('iban');
        this.route('bic');
        this.route('currency');
        this.route('select-search');
        this.route('vat');
        this.route('email');
        this.route('national-number');
        this.route('select');
        this.route('select-create');
        this.route('integer');
        this.route('number');
        this.route('timepicker');
        this.route('datepicker');
        this.route('datepicker-range');
        this.route('file');
        this.route('file-list');
      });
      this.route('installation');
      this.route('checkbox');
      this.route('datepicker');
      this.route('file');
      this.route('input');
      this.route('radio-group');
      this.route('select');
      this.route('textarea');
      this.route('tpk-form');
    });
  });
});

export default Router;
