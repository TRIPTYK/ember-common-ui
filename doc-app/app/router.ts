import EmberRouter from '@embroider/router';
import config from 'doc-app/config/environment';
import '@warp-drive/ember/install';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('dashboard', { path: '/' }, function () {
    this.route('docs', function () {
      this.route('ember-input-validation', function () {
        this.route('prefabs', function () {
          this.route('input');
          this.route('number');
          this.route('bic');
          this.route('currency');
          this.route('datepicker-range');
          this.route('datepicker');
          this.route('email');
          this.route('file');
          this.route('file-list');
          this.route('iban');
          this.route('integer');
          this.route('mobile');
          this.route('national-number');
          this.route('password');
          this.route('radio');
          this.route('radio-group');
          this.route('select');
          this.route('select-create');
          this.route('select-search');
          this.route('textarea');
          this.route('timepicker');
          this.route('vat');
        });
      });

      this.route('ember-input', function () {
        this.route('prefabs', function () {
        })
      });

      this.route('ember-ui', function () {
        this.route('confirm-modal', function(){})
      });
    });
  });
});
