import { execSync } from 'child_process';
import fs from 'fs';

// Test the formatter
const input = fs.readFileSync('input.html', 'utf-8');
const output = execSync('node format-html.js', {
  input: input,
  encoding: 'utf-8',
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
});

// Save output
fs.writeFileSync('output.html', output);

// Compare with expected
const expected = fs.readFileSync('expected.html', 'utf-8');

if (output === expected) {
  console.log('✅ Perfect match!');
  process.exit(0);
}

// Show differences
const outputLines = output.split('\n');
const expectedLines = expected.split('\n');

console.log('Differences found:\n');
let diffCount = 0;
for (let i = 0; i < Math.max(outputLines.length, expectedLines.length); i++) {
  if (outputLines[i] !== expectedLines[i]) {
    diffCount++;
    if (diffCount <= 3) {
      console.log(`Line ${i + 1}:`);
      console.log('  Expected:', JSON.stringify(expectedLines[i] || '<EOF>'));
      console.log('  Actual:  ', JSON.stringify(outputLines[i] || '<EOF>'));
    }
  }
}

if (diffCount > 3) {
  console.log(`\n... and ${diffCount - 3} more differences`);
}

console.log(`\nTotal: ${diffCount} line differences`);