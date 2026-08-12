module.exports = [{
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'script',
    globals: {
      console: 'readonly',
      process: 'readonly',
      Buffer: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
      exports: 'writable',
      module: 'writable',
      require: 'readonly',
      global: 'readonly',
      Date: 'readonly',
      Error: 'readonly'
    }
  },
  rules: {
    'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'off'
  }
}];