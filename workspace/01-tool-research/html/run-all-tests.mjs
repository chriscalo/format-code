import { execSync } from 'child_process';
import fs from 'fs';

console.log('Running comprehensive HTML formatter tests...\n');

// First format the input
console.log('1. Formatting input.html...');
const input = fs.readFileSync('input.html', 'utf-8');
let output;

try {
  output = execSync('node format-html.js', {
    input: input,
    encoding: 'utf-8',
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
  });
  fs.writeFileSync('output.html', output);
  console.log('   ✓ Formatted successfully\n');
} catch (error) {
  console.error('   ✗ Formatter error:', error.message);
  process.exit(1);
}

// Compare with expected
console.log('2. Comparing with expected.html...');
const expected = fs.readFileSync('expected.html', 'utf-8');

if (output === expected) {
  console.log('   ✓ Perfect match!\n');
} else {
  console.log('   ✗ Differences found\n');
  
  // Show line differences
  const outputLines = output.split('\n');
  const expectedLines = expected.split('\n');
  
  let diffCount = 0;
  for (let i = 0; i < Math.max(outputLines.length, expectedLines.length); i++) {
    if (outputLines[i] !== expectedLines[i]) {
      diffCount++;
      if (diffCount <= 3) {
        console.log(`   Line ${i + 1}:`);
        console.log(`     Expected: ${JSON.stringify(expectedLines[i] || '<EOF>')}`);
        console.log(`     Actual:   ${JSON.stringify(outputLines[i] || '<EOF>')}`);
      }
    }
  }
  
  if (diffCount > 3) {
    console.log(`   ... and ${diffCount - 3} more differences`);
  }
  console.log('');
}

// Run the actual test suite
console.log('3. Running test suite...');
try {
  const testOutput = execSync('npm test', {
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
    encoding: 'utf-8'
  });
  
  // Count pass/fail
  const passMatch = testOutput.match(/✔ pass (\d+)/);
  const failMatch = testOutput.match(/✖ fail (\d+)/);
  
  const passed = passMatch ? parseInt(passMatch[1]) : 0;
  const failed = failMatch ? parseInt(failMatch[1]) : 0;
  
  console.log(`   Tests: ${passed} passed, ${failed} failed\n`);
  
  if (failed === 0) {
    console.log('✅ All tests passed!');
    process.exit(0);
  }
} catch (error) {
  // Test failed, parse the output
  const testOutput = error.stdout || '';
  
  // Extract test results
  const lines = testOutput.split('\n');
  const failingTests = [];
  
  for (const line of lines) {
    if (line.includes('✖') && line.includes('ms)')) {
      const match = line.match(/✖ (.+?) \(/);
      if (match) failingTests.push(match[1]);
    }
  }
  
  if (failingTests.length > 0) {
    console.log('   Failing tests:');
    failingTests.forEach(test => console.log(`     - ${test}`));
  }
  
  console.log('\n❌ Some tests are failing');
  process.exit(1);
}