import { execSync } from 'child_process';
import fs from 'fs';

console.log('Testing formatter...\n');

// Format input
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
  console.log('✅ Output matches expected perfectly!\n');
  console.log('Running test suite...');
  
  try {
    const testResult = execSync('npm test', {
      cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
      encoding: 'utf-8'
    });
    
    // Check for failures
    if (testResult.includes('✖ fail 0') || testResult.includes('✔ pass')) {
      console.log('✅ All tests pass!');
      process.exit(0);
    }
  } catch (error) {
    // Parse test output
    const output = error.stdout || '';
    if (output.includes('✖ fail 0')) {
      console.log('✅ All tests pass!');
      process.exit(0);
    } else {
      console.log('❌ Some tests failed');
      console.log(output);
      process.exit(1);
    }
  }
} else {
  console.log('❌ Output does not match expected\n');
  
  // Show differences
  const outLines = output.split('\n');
  const expLines = expected.split('\n');
  
  for (let i = 0; i < Math.max(outLines.length, expLines.length); i++) {
    if (outLines[i] !== expLines[i]) {
      console.log(`First difference at line ${i + 1}:`);
      console.log('Expected:', JSON.stringify(expLines[i]));
      console.log('Actual:  ', JSON.stringify(outLines[i]));
      
      // Show a few more lines for context
      if (i + 1 < expLines.length) {
        console.log('\nNext expected line:', JSON.stringify(expLines[i + 1]));
        console.log('Next actual line:  ', JSON.stringify(outLines[i + 1] || '<EOF>'));
      }
      break;
    }
  }
  
  process.exit(1);
}