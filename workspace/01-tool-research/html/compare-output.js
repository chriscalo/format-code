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
  
  const output = await runFormatter(input);
  
  fs.writeFileSync('actual-output.html', output);
  
  console.log('Expected output length:', expected.length);
  console.log('Actual output length:', output.length);
  
  if (output === expected) {
    console.log('✅ Output matches expected!');
  } else {
    console.log('❌ Output does not match expected');
    console.log('\nFirst difference at character:', 
      [...expected].findIndex((char, i) => char !== output[i]));
    
    // Show lines that differ
    const expectedLines = expected.split('\n');
    const outputLines = output.split('\n');
    
    for (let i = 0; i < Math.max(expectedLines.length, outputLines.length); i++) {
      if (expectedLines[i] !== outputLines[i]) {
        console.log(`\nLine ${i + 1} differs:`);
        console.log('Expected:', JSON.stringify(expectedLines[i]));
        console.log('Actual:  ', JSON.stringify(outputLines[i]));
        if (i < 5) continue; // Show first 5 differences
        else break;
      }
    }
  }
}

main().catch(console.error);