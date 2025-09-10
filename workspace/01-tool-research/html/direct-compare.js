import fs from 'fs';
import { execSync } from 'child_process';

// Read input and expected
const input = fs.readFileSync('input.html', 'utf-8');
const expected = fs.readFileSync('expected.html', 'utf-8');

// Run formatter
const output = execSync('node format-html.js', {
  input: input,
  encoding: 'utf-8'
});

// Save actual output
fs.writeFileSync('actual-output.html', output);

// Compare
if (output === expected) {
  console.log('✅ Perfect match!');
} else {
  console.log('❌ Differences found\n');
  
  // Find differences
  const expectedLines = expected.split('\n');
  const outputLines = output.split('\n');
  
  let diffCount = 0;
  for (let i = 0; i < Math.max(expectedLines.length, outputLines.length); i++) {
    if (expectedLines[i] !== outputLines[i]) {
      diffCount++;
      if (diffCount <= 10) {
        console.log(`Line ${i + 1}:`);
        console.log('  Expected:', JSON.stringify(expectedLines[i] || '<EOF>'));
        console.log('  Actual:  ', JSON.stringify(outputLines[i] || '<EOF>'));
        console.log('');
      }
    }
  }
  
  if (diffCount > 10) {
    console.log(`... and ${diffCount - 10} more differences`);
  }
  
  console.log('\nSummary:');
  console.log('Expected lines:', expectedLines.length);
  console.log('Actual lines:', outputLines.length);
  console.log('Total differences:', diffCount);
}