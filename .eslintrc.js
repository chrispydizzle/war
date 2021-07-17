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
    "no-useless-escape": 0,
    "no-debugger": 1,
    "no-unused-vars": 0,
    "no-prototype-builtins": 0,
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    "camelcase": [0, {"properties": "never"}],
    "new-cap": 0
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
