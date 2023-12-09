'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  });
  let app = new EmberAddon(defaults, {
    autoImport: {
      watchDependencies: [
        '@triptyk/ember-ui',
        '@triptyk/ember-input',
        '@triptyk/ember-input-validation',
      ],
    },
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

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    extraPublicTrees: [],
    staticAddonTrees: true,
    staticAddonTestSupportTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    splitControllers: true,
    splitRouteClasses: true,
    packagerOptions: {
      webpackConfig: {
        // Highest fidelity
        devtool: 'source-map',
      },
    },
  });
};
