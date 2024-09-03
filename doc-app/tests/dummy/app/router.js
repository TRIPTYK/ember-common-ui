import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  docsRoute(this, function () {
    this.route('ember-ui', function () {
      this.route('installation');
      this.route('lazy-image');
      this.route('actions-menu');
      this.route('modal');
      this.route('table-generic');
      this.route('file-list');
      this.route('stack-list');
      this.route('stepper');
    });
    this.route('ember-input', function () {
      this.route('installation');
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
        this.route('integer');
        this.route('number');
      });
      this.route('installation');
      this.route('checkbox');
      this.route('datepicker');
      this.route('file');
      this.route('input');
      this.route('radio-group');
      this.route('radio');
      this.route('select');
      this.route('textarea');
      this.route('tpk-form');
    });
  });
});

export default Router;
