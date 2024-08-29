'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const sideWatch = require('@embroider/broccoli-side-watch');

module.exports = async function (defaults) {
  process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  });
  let app = new EmberAddon(defaults, {
    'ember-fetch': {
      nativePromise: true,
    },
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
    postcssOptions: {
      compile: {
        enabled: true,
        includePaths: ['app', 'addon', 'tests'],
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('./tailwind.config.js'),
        ],
        cacheInclude: [/.*\.(css|hbs|html|ts)$/, /config\.js/],
      },
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app);
};
