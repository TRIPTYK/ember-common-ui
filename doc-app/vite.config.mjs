import { defineConfig } from 'vite';
import { extensions, classicEmberSupport, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { webdriverio } from '@vitest/browser-webdriverio';
import { loadTranslations } from '@ember-intl/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
    loadTranslations(),
  ],
  test: {
    include: ['tests/**/*-vitest-test.{gjs,gts}'],
    maxConcurrency: 1,
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
});
