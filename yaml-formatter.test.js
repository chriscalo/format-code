import { test, describe } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';

describe('YAML Formatter', () => {
  test('formats input.yaml to match expected.yaml', async () => {
    // Read the input and expected files
    const input = await readFile('input.yaml', 'utf8');
    const expected = await readFile('expected.yaml', 'utf8');
    
    // Run the formatter
    const actual = await runFormatter(input);
    
    // Should match expected output exactly
    assert.strictEqual(actual.trim(), expected.trim(), 
      'Formatted output should match expected.yaml');
  });

  test('sorts keys alphabetically', async () => {
    const input = `zebra: last
apple: first
beta: middle`;

    const output = await runFormatter(input);
    const lines = output.trim().split('\n');
    
    assert.strictEqual(lines[0], 'apple: first');
    assert.strictEqual(lines[1], 'beta: middle'); 
    assert.strictEqual(lines[2], 'zebra: last');
  });

  test('cleans up messy formatting', async () => {
    const input = `key: value
other:   data  
nested:
  subkey:    "messy spacing"`;

    const output = await runFormatter(input);
    
    assert(output.includes('other: data'), 'Should clean up extra spaces');
    assert(output.includes('subkey: messy spacing'), 'Should normalize quotes and spacing');
  });

  test('handles invalid YAML with error', async () => {
    const input = `invalid: [unclosed bracket`;

    try {
      await runFormatter(input);
      assert.fail('Should have thrown an error for invalid YAML');
    } catch (error) {
      assert(error.code > 0, 'Should exit with non-zero code');
      assert(error.stderr.includes('Error formatting YAML'), 'Should show error message');
    }
  });

  test('maintains consistent 2-space indentation', async () => {
    const input = `services:
  app:
    ports:
      - 3000`;

    const output = await runFormatter(input);
    const lines = output.split('\n');
    
    // Find indented lines and check spacing
    const appLine = lines.find(line => line.includes('app:'));
    const portsLine = lines.find(line => line.includes('ports:'));
    const itemLine = lines.find(line => line.includes('- '));
    
    assert(appLine.startsWith('  '), 'app should have 2-space indent');
    assert(portsLine.startsWith('    '), 'ports should have 4-space indent'); 
    assert(itemLine.startsWith('      '), 'list item should have 6-space indent');
  });
});

// Helper function to run the formatter
async function runFormatter(input) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['yaml-formatter.js'], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const error = new Error(`Process exited with code ${code}`);
        error.code = code;
        error.stderr = stderr;
        reject(error);
      }
    });
    
    child.on('error', reject);
    
    // Send input to stdin
    child.stdin.write(input);
    child.stdin.end();
  });
}