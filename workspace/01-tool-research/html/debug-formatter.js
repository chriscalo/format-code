import fs from 'fs';
import { spawn } from 'child_process';

async function runFormatter(input) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['format-html.js']);
    let output = '';
    let error = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      error += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Process exited with code ${code}: ${error}`));
      } else {
        resolve(output);
      }
    });

    child.stdin.write(input);
    child.stdin.end();
  });
}

async function main() {
  // Test with a simple example first
  const simpleInput = '<div class=test><p>Hello</p></div>';
  console.log('Testing simple input:', simpleInput);
  const simpleOutput = await runFormatter(simpleInput);
  console.log('Simple output:', simpleOutput);
  console.log('---');
  
  // Now test with actual input
  const input = fs.readFileSync('input.html', 'utf-8');
  const expected = fs.readFileSync('expected.html', 'utf-8');
  
  const output = await runFormatter(input);
  
  // Check key differences
  console.log('Checking key formatting features:');
  console.log('1. Doctype:');
  console.log('   Expected:', expected.split('\n')[0]);
  console.log('   Actual:  ', output.split('\n')[0]);
  
  console.log('\n2. HTML tag:');
  console.log('   Expected:', expected.split('\n')[1]);
  console.log('   Actual:  ', output.split('\n')[1]);
  
  console.log('\n3. Self-closing tags:');
  console.log('   Expected has <meta ... />:', expected.includes('/>'));
  console.log('   Actual has <meta ... />:', output.includes('/>'));
  
  console.log('\n4. Attribute quoting:');
  console.log('   Expected: id="main"');
  console.log('   Actual has id="main":', output.includes('id="main"'));
  
  // Save for inspection
  fs.writeFileSync('actual-output.html', output);
  console.log('\nFull output saved to actual-output.html');
}

main().catch(console.error);