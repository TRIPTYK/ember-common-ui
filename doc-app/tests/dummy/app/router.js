import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  docsRoute(this, function () {
    this.route('ember-ui', function() {
      this.route('lazy-image');
      this.route('actions-menu');
      this.route('modal');
      this.route('table-generic');
      this.route('file-list');
      this.route('stack-list');
      this.route('stepper');
    });
  });
});

export default Router;
