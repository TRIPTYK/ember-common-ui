'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const sideWatch = require('@embroider/broccoli-side-watch');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    trees: {
      app: sideWatch('app', {
        watching: [
          '@triptyk/ember-input',
          '@triptyk/ember-ui',
          '@triptyk/ember-input-validation',
        ],
      }),
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    'ember-cli-addon-docs': {
      documentingAddonAt: '../packages/ember-input',
    },
    postcssOptions: {
      compile: {
        enabled: true,
        cacheInclude: [/.*\.(css|hbs|html|ts|gts|gjs)$/, /config\.js/],
        includePaths: ['app', 'tests'],
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: ['node_modules'],
            },
          },
          require('tailwindcss')('tailwind.config.js'), // If you have a Tailwind config file.
        ],
      },
    },
    // Add options here
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    // https://github.com/ember-cli/ember-fetch/issues/622#issuecomment-860399885,
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.(gif|svg|jpg|png)$/,
              loader: 'file-loader',
            },
          ],
        },
      },
    },
    staticAddonTrees: false,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    staticEmberSource: true,
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
