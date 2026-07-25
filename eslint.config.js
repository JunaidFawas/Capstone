// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expo = require('eslint-plugin-expo');
const pluginReact = require('eslint-plugin-react');
const pluginReactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');

module.exports = defineConfig([
  {
    ignores: ['dist/*', '.expo/**'],
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      expo,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        console: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      eqeqeq: ['warn', 'smart'],
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty-character-class': 'warn',
      'no-empty-pattern': 'warn',
      'no-extend-native': 'warn',
      'no-extra-bind': 'warn',
      'no-redeclare': 'warn',
      'no-undef': 'error',
      'no-unreachable': 'warn',
      'no-unsafe-negation': 'warn',
      'no-unused-expressions': [
        'warn',
        {
          allowShortCircuit: true,
          enforceForJSX: true,
        },
      ],
      'no-unused-labels': 'warn',
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none',
          ignoreRestSiblings: true,
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-with': 'warn',
      'unicode-bom': ['warn', 'never'],
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'no-var': 'error',
      'react/no-unknown-property': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/no-this-in-sfc': 'warn',
      'expo/use-dom-exports': ['error'],
      'expo/no-env-var-destructuring': ['error'],
      'expo/no-dynamic-env-var': ['error'],
    },
  },
]);
