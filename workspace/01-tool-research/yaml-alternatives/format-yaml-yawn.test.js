import { test, describe } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('YAML Formatter (YAWN)', () => {
  test('formats input.yaml to match expected.yaml', async () => {
    // Read the input and expected files
    const input = await readFile(join(__dirname, 'input.yaml'), 'utf8');
    const expected = await readFile(join(__dirname, 'expected.yaml'), 'utf8');
    
    // Run the formatter
    const actual = await runFormatter(input);
    
    // Should match expected output exactly
    assert.strictEqual(actual.trim(), expected.trim(), 
      'Formatted output should match expected.yaml');
  });

  test('preserves comments', async () => {
    const input = `# Document comment
version: 1.0
# Line comment
name: test # Inline comment`;

    const output = await runFormatter(input);
    
    assert(output.includes('# Document comment'), 'Should preserve document comment');
    assert(output.includes('# Line comment'), 'Should preserve line comment');
    assert(output.includes('# Inline comment'), 'Should preserve inline comment');
  });

  test('preserves key order (no sorting)', async () => {
    const input = `zebra: last
apple: first  
beta: middle`;

    const output = await runFormatter(input);
    const lines = output.trim().split('\n');
    
    // Should preserve original order
    assert.strictEqual(lines[0], 'zebra: last');
    assert.strictEqual(lines[1], 'apple: first'); 
    assert.strictEqual(lines[2], 'beta: middle');
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
    const formatterPath = join(__dirname, 'format-yaml-yawn.js');
    const child = spawn('node', [formatterPath], {
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