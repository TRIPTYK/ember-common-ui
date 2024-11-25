const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{gjs,gts,hbs,html,js,ts}',
    path.join(
      path.dirname(require.resolve('@triptyk/ember-input-validation')),
      '**/*.{gts,gjs,ts,js,css}',
    ),
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: true,
  },
  plugins: [require('daisyui')],
};
