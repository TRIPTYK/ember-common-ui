/* eslint-disable */
module.exports = {
    mode: 'jit',
    purge:  ['./app/**/*.{hbs,js,ts,html}', './tests/**/*.{hbs,js,ts,html}','./addon/**/*.{hbs,js,ts,html}'],
    corePlugins: {},
    plugins: [],
    variants: {
      extend: {
        backgroundColor: ['checked'],
        borderColor: ['checked'],
      }
    },
  };
  