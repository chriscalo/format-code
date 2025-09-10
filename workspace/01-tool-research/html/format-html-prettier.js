#!/usr/bin/env node
const prettier = require('prettier');

// Read from stdin
let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', async () => {
  try {
    const formatted = await prettier.format(input, {
      parser: 'html',
      printWidth: 80,
      tabWidth: 2,
      useTabs: false,
      singleQuote: false,
      bracketSameLine: false,
      htmlWhitespaceSensitivity: 'css',
      singleAttributePerLine: false
    });
    
    // Ensure lowercase doctype
    let output = formatted.replace(/<!DOCTYPE\s+html>/i, '<!doctype html>');
    
    // Ensure self-closing tags have />
    output = output.replace(/<(meta|br|hr|img|input)([^>]*?)>/g, '<$1$2/>');
    
    process.stdout.write(output);
  } catch (error) {
    console.error('Error formatting HTML:', error.message);
    process.exit(1);
  }
});