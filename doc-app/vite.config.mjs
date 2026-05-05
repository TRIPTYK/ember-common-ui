import { defineConfig } from 'vite';
import { extensions, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { webdriverio } from '@vitest/browser-webdriverio';
import { loadTranslations } from '@ember-intl/vite';
import { emberSsg } from 'vite-ember-ssr/vite-plugin';

export default defineConfig(({ mode, command }) => {
  return {
    base: mode === 'production' ? '/ember-common-ui/' : '/',
    mode: mode,
    plugins: [
      tailwindcss(),
      ember(),
      // extra plugins here
      babel({
        babelHelpers: 'runtime',
        extensions,
      }),
      loadTranslations(),
      command === 'build' &&
        mode === 'production' &&
        emberSsg({
          routes: [
            'index',
            'home',
            'login',
            'forgot-password',
            'reset-password',
            'docs/getting-started',
            'docs/installation',
            'docs/ember-input-validation/prefabs/input',
            'docs/ember-input-validation/prefabs/number',
            'docs/ember-input-validation/prefabs/bic',
            'docs/ember-input-validation/prefabs/currency',
            'docs/ember-input-validation/prefabs/datepicker-range',
            'docs/ember-input-validation/prefabs/datepicker',
            'docs/ember-input-validation/prefabs/email',
            'docs/ember-input-validation/prefabs/file',
            'docs/ember-input-validation/prefabs/file-list',
            'docs/ember-input-validation/prefabs/iban',
            'docs/ember-input-validation/prefabs/integer',
            'docs/ember-input-validation/prefabs/mobile',
            'docs/ember-input-validation/prefabs/national-number',
            'docs/ember-input-validation/prefabs/password',
            'docs/ember-input-validation/prefabs/radio',
            'docs/ember-input-validation/prefabs/radio-group',
            'docs/ember-input-validation/prefabs/select',
            'docs/ember-input-validation/prefabs/select-create',
            'docs/ember-input-validation/prefabs/select-search',
            'docs/ember-input-validation/prefabs/textarea',
            'docs/ember-input-validation/prefabs/timepicker',
            'docs/ember-input-validation/prefabs/vat',
            'docs/ember-input-validation/prefabs/checkbox',
            'docs/ember-input/prefabs/button',
            'docs/ember-input/prefabs/toggle',
            'docs/ember-input/prefabs/select-search',
            'docs/ember-ui/prefabs/confirm-modal',
            'docs/ember-ui/prefabs/table-generic',
            'docs/ember-ui/prefabs/tpk-form',
            'docs/ember-ui/prefabs/tpk-dashboard',
            'docs/ember-ui/prefabs/tpk-login',
            'docs/ember-ui/prefabs/tpk-forgot-password',
            'docs/ember-ui/prefabs/tpk-reset-password',
            'docs/ember-ui/prefabs/tpk-navbar',
            'docs/ember-ui/prefabs/tpk-sidebar',
            'docs/ember-ui/prefabs/tpk-theme-selector',
          ],
        }),
    ],
    ssr: {
      external: ['@warp-drive/utilities', 'msw', '@mswjs/interceptors'],
    },
    test: {
      include: ['tests/**/*-vitest-test.{gjs,gts,ts}'],
      maxConcurrency: 1,
      teardownTimeout: 5000,
      globalSetup: ['./tests/global-setup.ts'],
      browser: {
        provider: webdriverio(),
        enabled: true,
        headless: false,
        // at least one instance is required
        instances: [
          { browser: 'chrome' },
          // { browser: 'firefox' },
          // { browser: 'edge' },
          // { browser: 'safari' },
        ],
      },
    },
  };
});
