import { test } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formatterPath = path.join(__dirname, 'format-html.js');
const inputFile = path.join(__dirname, 'input.html');
const expectedFile = path.join(__dirname, 'expected.html');

async function runFormatter(input) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [formatterPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

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

test('formatter output matches expected.html', async () => {
  const input = fs.readFileSync(inputFile, 'utf-8');
  const expected = fs.readFileSync(expectedFile, 'utf-8');
  
  const output = await runFormatter(input);
  
  assert.strictEqual(output, expected, 'Output should match expected.html exactly');
});