import { execSync } from 'child_process';
import fs from 'fs';

console.log('Validating HTML formatter...\n');

// Format the input
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

// Check if they match exactly
if (output === expected) {
  console.log('✅ Output matches expected.html perfectly!\n');
  
  // Now run the test suite
  console.log('Running test suite...');
  try {
    execSync('npm test', {
      cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
      stdio: 'inherit'
    });
    console.log('\n✅ All tests pass!');
    process.exit(0);
  } catch (e) {
    console.log('\n❌ Test suite failed');
    process.exit(1);
  }
} else {
  console.log('❌ Output does not match expected.html\n');
  
  // Find differences
  const outputLines = output.split('\n');
  const expectedLines = expected.split('\n');
  
  console.log('Line-by-line comparison:');
  let diffCount = 0;
  
  for (let i = 0; i < Math.max(outputLines.length, expectedLines.length); i++) {
    if (outputLines[i] !== expectedLines[i]) {
      diffCount++;
      if (diffCount <= 5) {
        console.log(`\nLine ${i + 1}:`);
        console.log('Expected:', JSON.stringify(expectedLines[i] || '<EOF>'));
        console.log('Actual:  ', JSON.stringify(outputLines[i] || '<EOF>'));
      }
    }
  }
  
  if (diffCount > 5) {
    console.log(`\n... and ${diffCount - 5} more differences`);
  }
  
  console.log(`\nTotal: ${diffCount} lines differ`);
  console.log('\nOutput saved to output.html for inspection');
  process.exit(1);
}