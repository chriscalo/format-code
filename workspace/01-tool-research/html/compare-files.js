import fs from 'fs';
import { execSync } from 'child_process';

// First, run the formatter
console.log('Running formatter...');
execSync('node format-and-save.js', { stdio: 'inherit' });

// Read the files
const output = fs.readFileSync('output.html', 'utf-8');
const expected = fs.readFileSync('expected.html', 'utf-8');

// Compare
if (output === expected) {
  console.log('\n✅ Output matches expected perfectly!');
  process.exit(0);
} else {
  console.log('\n❌ Output does not match expected\n');
  
  const outputLines = output.split('\n');
  const expectedLines = expected.split('\n');
  
  let differences = 0;
  for (let i = 0; i < Math.max(outputLines.length, expectedLines.length); i++) {
    if (outputLines[i] !== expectedLines[i]) {
      differences++;
      if (differences <= 5) {
        console.log(`Line ${i + 1} differs:`);
        console.log('  Expected:', JSON.stringify(expectedLines[i] || '<EOF>'));
        console.log('  Actual:  ', JSON.stringify(outputLines[i] || '<EOF>'));
      }
    }
  }
  
  if (differences > 5) {
    console.log(`\n... and ${differences - 5} more differences`);
  }
  
  process.exit(1);
}