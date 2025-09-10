import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const input = fs.readFileSync('input.html', 'utf-8');
const formatter = spawn('node', ['format-html.js']);

let output = '';
formatter.stdout.on('data', (data) => {
  output += data.toString();
});

formatter.stderr.on('data', (data) => {
  console.error('Error:', data.toString());
});

formatter.on('close', (code) => {
  if (code === 0) {
    fs.writeFileSync('test-output.html', output);
    console.log('Output written to test-output.html');
  } else {
    console.error('Formatter exited with code', code);
  }
});

formatter.stdin.write(input);
formatter.stdin.end();