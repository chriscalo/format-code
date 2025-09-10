import { execSync } from 'child_process';
import fs from 'fs';

// Run formatter
const input = fs.readFileSync('input.html', 'utf-8');
const output = execSync('node format-html.js', {
  input: input,
  encoding: 'utf-8',
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
});

fs.writeFileSync('output.html', output);

// Compare
const expected = fs.readFileSync('expected.html', 'utf-8');

if (output === expected) {
  console.log('✅ Output matches expected!');
  
  // Run tests
  try {
    execSync('npm test', {
      cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
      stdio: 'inherit'
    });
    console.log('\n✅ All tests pass!');
  } catch (e) {
    console.log('\n❌ Tests failed');
  }
} else {
  // Show first difference
  const outputLines = output.split('\n');
  const expectedLines = expected.split('\n');
  
  for (let i = 0; i < Math.max(outputLines.length, expectedLines.length); i++) {
    if (outputLines[i] !== expectedLines[i]) {
      console.log(`Line ${i + 1} differs:`);
      console.log('Expected:', JSON.stringify(expectedLines[i]));
      console.log('Actual:  ', JSON.stringify(outputLines[i]));
      break;
    }
  }
}