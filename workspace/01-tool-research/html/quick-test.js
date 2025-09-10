import { execSync } from 'child_process';
import fs from 'fs';

try {
  // Run the formatter
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
    console.log('✅ Output matches expected!');
  } else {
    console.log('❌ Output does not match');
    
    // Show first difference
    const outputLines = output.split('\n');
    const expectedLines = expected.split('\n');
    
    for (let i = 0; i < Math.max(outputLines.length, expectedLines.length); i++) {
      if (outputLines[i] !== expectedLines[i]) {
        console.log(`\nFirst difference at line ${i + 1}:`);
        console.log('Expected:', JSON.stringify(expectedLines[i]));
        console.log('Actual:  ', JSON.stringify(outputLines[i]));
        break;
      }
    }
  }
} catch (error) {
  console.error('Error:', error.message);
  if (error.stdout) console.log('Stdout:', error.stdout.toString());
  if (error.stderr) console.log('Stderr:', error.stderr.toString());
}