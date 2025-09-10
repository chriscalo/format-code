import fs from 'fs';
import { spawn } from 'child_process';
import { test, describe } from 'node:test';
import assert from 'node:assert';

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

describe('Full formatter test', () => {
  test('should match expected output exactly', async () => {
    const input = fs.readFileSync('input.html', 'utf-8');
    const expected = fs.readFileSync('expected.html', 'utf-8');
    
    const output = await runFormatter(input);
    
    // Save for debugging
    fs.writeFileSync('actual-output.html', output);
    
    // Compare line by line for better error messages
    const expectedLines = expected.split('\n');
    const outputLines = output.split('\n');
    
    console.log('\nComparing output line by line:');
    for (let i = 0; i < Math.max(expectedLines.length, outputLines.length); i++) {
      if (expectedLines[i] !== outputLines[i]) {
        console.log(`Line ${i + 1} differs:`);
        console.log('Expected:', JSON.stringify(expectedLines[i] || ''));
        console.log('Actual:  ', JSON.stringify(outputLines[i] || ''));
      }
    }
    
    assert.strictEqual(output, expected, 'Output should match expected exactly');
  });
});