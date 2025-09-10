#!/usr/bin/env node

// Example custom YAML formatter using js-yaml
// Demonstrates how to build stdin/stdout CLI tool for YAML formatting

const yaml = require('js-yaml');
const fs = require('fs');

// Configuration options for style guide compliance
const yamlOptions = {
  indent: 2,
  lineWidth: 120,
  noRefs: true,
  sortKeys: true,
  flowLevel: -1, // Always use block style
  skipInvalid: false
};

// Read from stdin
let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    // Parse YAML
    const data = yaml.load(input);
    
    // Format and output to stdout
    const formatted = yaml.dump(data, yamlOptions);
    process.stdout.write(formatted);
  } catch (error) {
    console.error('Error formatting YAML:', error.message);
    process.exit(1);
  }
});