const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended'
  ],
  env: {
    browser: true,
    node: true,
    es2020: true,
    'shared-node-browser': true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};
