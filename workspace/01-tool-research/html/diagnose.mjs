import { execSync } from 'child_process';
import fs from 'fs';

// Run formatter on input.html
const input = fs.readFileSync('input.html', 'utf-8');
const output = execSync('node format-html.js', {
  input: input,
  encoding: 'utf-8',
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
});

// Save to output.html
fs.writeFileSync('output.html', output);

// Read expected
const expected = fs.readFileSync('expected.html', 'utf-8');

// Compare
const outputLines = output.split('\n');
const expectedLines = expected.split('\n');

console.log('Diagnostic comparison:\n');

// Show key differences
let diffCount = 0;
for (let i = 0; i < Math.max(outputLines.length, expectedLines.length); i++) {
  if (outputLines[i] !== expectedLines[i]) {
    diffCount++;
    if (diffCount <= 5) {
      console.log(`Line ${i + 1}:`);
      console.log('  Expected:', JSON.stringify(expectedLines[i] || '<EOF>'));
      console.log('  Actual:  ', JSON.stringify(outputLines[i] || '<EOF>'));
      console.log('');
    }
  }
}

if (diffCount > 5) {
  console.log(`... and ${diffCount - 5} more differences\n`);
}

console.log('Summary:');
console.log('- Total differences:', diffCount);
console.log('- Output lines:', outputLines.length);
console.log('- Expected lines:', expectedLines.length);

// Check specific features
console.log('\nFeature checks:');
console.log('- Doctype lowercase:', output.startsWith('<!doctype html>') ? '✓' : '✗');
console.log('- Attributes quoted:', output.includes('id="main"') ? '✓' : '✗');
console.log('- Self-closing tags:', output.includes('/>') ? '✓' : '✗');
console.log('- 2-space indent:', output.includes('  <head>') ? '✓' : '✗');

fs.writeFileSync('output.html', output);
console.log('\nOutput saved to output.html');