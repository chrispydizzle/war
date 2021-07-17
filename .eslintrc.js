module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    '@typescript-eslint',
    'vue'
  ],
  rules: {
    'no-console': 'off',
    "vue/html-self-closing": 0,
    "vue/no-confusing-v-for-v-if": 0,
    "vue/no-use-v-if-with-v-for": 0,
    "vue/max-attributes-per-line": 0,
    "vue/require-prop-types": 0,
    "vue/no-v-html": 0,
    "no-useless-escape": 0,
    "no-debugger": 1,
    "no-unused-vars": 0,
    "vue/component-name-in-template-casing": 2,
    "no-prototype-builtins": 0,
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2]
  },
  env: {
    "browser": true,
    "jquery": true
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/*.spec.{j,t}s?(x)'
    ],
    env: {
      jest: true
    },
  }]
}
