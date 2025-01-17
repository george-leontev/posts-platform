module.exports = {
    root: true,
    'parser': '@typescript-eslint/parser',
    'plugins': ['react', 'react-hooks', 'prettier', '@typescript-eslint'],
    'extends': [
      'prettier',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    'globals': {
      'JSX': true,
    },
    'parserOptions': {
      'sourceType': 'module',
      'ecmaVersion': 'latest',
      'ecmaFeatures': {
        'jsx': true,
        'modules': true
      },
    },
    'rules': {
      'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': false }],
      'object-curly-spacing': [2, 'always'],
      'prettier/prettier': [0, 'always'],
      'quotes': [
        'error',
        'single'
      ],
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-curly-spacing': ['error', 'always'],
      'no-debugger': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    },
    'overrides': [
      {
        'files': [ 'src//*.tsx', 'src//*.ts' ],
      }
    ],
    'env': {
      'browser': true,
      'es6': true,
      'node': true,
      'jasmine': true
    },
  };