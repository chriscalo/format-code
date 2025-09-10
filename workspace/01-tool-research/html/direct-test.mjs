import { execSync } from 'child_process';
import fs from 'fs';

// Run formatter
const input = fs.readFileSync('input.html', 'utf-8');
let output;

try {
  output = execSync('node format-html.js', {
    input: input,
    encoding: 'utf-8',
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
  });
} catch (error) {
  console.error('Formatter error:', error.message);
  process.exit(1);
}

// Save the output
fs.writeFileSync('output.html', output);

// Read expected
const expected = fs.readFileSync('expected.html', 'utf-8');

// Character-by-character comparison
let firstDiff = -1;
for (let i = 0; i < Math.max(output.length, expected.length); i++) {
  if (output[i] !== expected[i]) {
    firstDiff = i;
    break;
  }
}

if (firstDiff === -1) {
  console.log('✅ Perfect match!');
} else {
  console.log('❌ First difference at character', firstDiff);
  
  // Find which line this is on
  const beforeDiff = expected.substring(0, firstDiff);
  const lineNum = beforeDiff.split('\n').length;
  
  console.log(`This is on line ${lineNum}`);
  
  // Show context
  const start = Math.max(0, firstDiff - 50);
  const end = Math.min(expected.length, firstDiff + 50);
  
  console.log('\nExpected around difference:');
  console.log(JSON.stringify(expected.substring(start, end)));
  
  console.log('\nActual around difference:');
  console.log(JSON.stringify(output.substring(start, end)));
  
  // Show the specific lines
  const expectedLines = expected.split('\n');
  const outputLines = output.split('\n');
  
  console.log(`\nLine ${lineNum}:`);
  console.log('Expected:', JSON.stringify(expectedLines[lineNum - 1]));
  console.log('Actual:  ', JSON.stringify(outputLines[lineNum - 1]));
}

console.log('\nOutput saved to output.html');