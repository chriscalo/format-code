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
  const input = fs.readFileSync('input.html', 'utf-8');
  const expected = fs.readFileSync('expected.html', 'utf-8');
  
  console.log('Running formatter...');
  const output = await runFormatter(input);
  
  // Save actual output for inspection
  fs.writeFileSync('actual-output.html', output);
  
  // Compare line by line
  const expectedLines = expected.split('\n');
  const outputLines = output.split('\n');
  
  let allMatch = true;
  let differences = 0;
  
  for (let i = 0; i < Math.max(expectedLines.length, outputLines.length); i++) {
    if (expectedLines[i] !== outputLines[i]) {
      if (differences < 10) { // Show first 10 differences
        console.log(`\nLine ${i + 1} differs:`);
        console.log('Expected:', JSON.stringify(expectedLines[i] || ''));
        console.log('Actual:  ', JSON.stringify(outputLines[i] || ''));
      }
      differences++;
      allMatch = false;
    }
  }
  
  if (allMatch) {
    console.log('\n✅ Output matches expected perfectly!');
  } else {
    console.log(`\n❌ Found ${differences} line differences`);
    console.log('\nOutput saved to actual-output.html for inspection');
  }
}

main().catch(console.error);