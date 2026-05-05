import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { templateCompatSupport } from '@embroider/compat/babel';
import { buildMacros } from '@embroider/macros/babel';
import { setConfig } from '@warp-drive/core/build-config';

const __filename = fileURLToPath(import.meta.url);

const macros = buildMacros({
  configure: (config) => {
    config.setGlobalConfig(__filename, '@embroider/core', { active: true });
    setConfig(config, {
      // for universal apps this MUST be at least 5.6
      compatWith: '5.6',
    });
  },
});

export default {
  plugins: [
    ['ember-concurrency/async-arrow-task-transform', {}],
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        onlyRemoveTypeImports: true,
        allowDeclareFields: true,
      },
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        enableLegacyModules: [
          'ember-cli-htmlbars',
          'ember-cli-htmlbars-inline-precompile',
          'htmlbars-inline-precompile',
        ],
        transforms: [...templateCompatSupport()],
      },
    ],
    [
      'module:decorator-transforms',
      {
        runtime: {
          import: fileURLToPath(
            import.meta.resolve('decorator-transforms/runtime-esm'),
          ),
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: dirname(fileURLToPath(import.meta.url)),
        useESModules: true,
        regenerator: false,
      },
    ],
    ...macros.babelMacros,
  ],

  generatorOpts: {
    compact: false,
  },
};
