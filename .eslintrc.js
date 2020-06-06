
/*
 * Copyright 2020 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  ignorePatterns: ['dist/**/*.js'],
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/ban-types': [
      'warn'
    ],
    'no-console': [
      'error',
      { allow: ['warn', 'error'] }
    ],
    'indent': [
      'error',
      2,
      // { flatTernaryExpressions: false, offsetTernaryExpressions: true, ignoredNodes: ["TemplateLiteral > *"] }
    ],
    'multiline-ternary': [
      'error',
      'always-multiline'
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'always', asyncArrow: 'always' }
    ],
    'space-in-parens': [
      'error',
      'never'
    ],
    'space-before-blocks': [
      'error',
      'always'
    ],
    'arrow-spacing': [
      'error',
      { before: true, after: true }
    ],
    'space-infix-ops': [
      'error',
      { int32Hint: false }
    ],
    'keyword-spacing': [
      'error',
      { before: true, after: true }
    ],
    'no-multiple-empty-lines': [
      'error',
      { max: 2, maxBOF: 1, maxEOF: 1 }
    ]
  }
};
