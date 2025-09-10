import fs from 'fs';
import { execSync } from 'child_process';

// Read input
const input = fs.readFileSync('input.html', 'utf-8');

// Run formatter
const output = execSync('node format-html.js', {
  input: input,
  encoding: 'utf-8'
});

// Save to output.html
fs.writeFileSync('output.html', output);

console.log('Formatted HTML saved to output.html');