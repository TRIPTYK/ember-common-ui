// .eslintrc.js
module.exports = {
  overrides: [
    {
      files: ['**/*.{js,ts}'],
      plugins: ['ember'],
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:ember/recommended', // or other configuration
      ],
      rules: {
        // override / enable optional rules
        'ember/no-replace-test-comments': 'error',
        'no-unused-vars': 'off',
        'no-undef': 'off',
      }
    },
    {
      files: ['**/*.gts'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:ember/recommended',
        'plugin:ember/recommended-gts',
      ],
    },
    {
      files: ['**/*.gjs'],
      parser: 'ember-eslint-parser',
      plugins: ['ember'],
      extends: [
        'eslint:recommended',
        'plugin:ember/recommended',
        'plugin:ember/recommended-gjs',
      ],
    },
    {
      files: ['tests/**/*.{js,ts,gjs,gts}'],
      rules: {
        // override / enable optional rules
        'ember/no-replace-test-comments': 'error',
        'no-unused-vars': 'off',
        'no-undef': 'off',
      }
    },
    {
      files: [
        '*.js'
      ],
      env: {
        node: true
      },
      rules: {
        // rules specific to nodejs files
        'no-console': 'off',
        'strict': ['error', 'global']
      }
    }
  ],
};
