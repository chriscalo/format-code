#!/usr/bin/env node
const { ESLint } = require('eslint');

// Custom formatting configuration
const eslintConfig = {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    // Code quality rules (not deprecated formatting ones)
    'quotes': ['error', 'double'],
    'semi': ['error', 'always'],
    'indent': ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'no-unused-vars': 'off' // Turn off for formatting-only use
  }
};

// Read from stdin
let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', async () => {
  try {
    const eslint = new ESLint({
      baseConfig: eslintConfig,
      ignore: false,
      fix: true
    });

    // Lint and fix the code
    const results = await eslint.lintText(input, { filePath: 'stdin.js' });
    
    if (results && results.length > 0) {
      const result = results[0];
      
      if (result.output !== undefined) {
        // ESLint provided fixed output
        process.stdout.write(result.output);
      } else {
        // No fixes needed or applied, output original
        process.stdout.write(input);
      }
    } else {
      process.stdout.write(input);
    }
  } catch (error) {
    console.error('Error formatting JavaScript:', error.message);
    process.exit(1);
  }
});