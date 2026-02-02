import EmberRouter from '@embroider/router';
import config from 'doc-app/config/environment';

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
          // Add more prefab routes here
        });
      });

      this.route('ember-input', function () {
        // Add ember-input routes
      });

      this.route('ember-ui', function () {
        // Add ember-ui routes
      });
    });
  });
});
