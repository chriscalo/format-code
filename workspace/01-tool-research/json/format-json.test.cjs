#!/usr/bin/env node

const { spawn } = require('child_process');
const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

/**
 * Helper function to run the formatter with input
 */
function runFormatter(input) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', ['format-json.js'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: __dirname
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
        resolve({ stdout, stderr, code });
      } else {
        reject(new Error(`Process exited with code ${code}: ${stderr}`));
      }
    });

    child.stdin.write(input);
    child.stdin.end();
  });
}

describe('JSON Formatter Tests', () => {
  
  test('should format input.json to match expected.json', async () => {
    const inputContent = fs.readFileSync(path.join(__dirname, 'input.json'), 'utf-8');
    const expectedContent = fs.readFileSync(path.join(__dirname, 'expected.json'), 'utf-8');
    
    const result = await runFormatter(inputContent);
    assert.strictEqual(result.stdout.trim(), expectedContent.trim(), 'Formatted output should match expected.json');
  });

  test('should apply consistent 2-space indentation', async () => {
    const input = `{"level1":{"level2":{"level3":"value"}}}`;
    const result = await runFormatter(input);
    
    const lines = result.stdout.split('\n');
    // Check indentation levels
    assert.ok(lines.some(line => line.startsWith('  "level1":')), 'Level 1 should be indented 2 spaces');
    assert.ok(lines.some(line => line.startsWith('    "level2":')), 'Level 2 should be indented 4 spaces');
    assert.ok(lines.some(line => line.startsWith('      "level3":')), 'Level 3 should be indented 6 spaces');
  });

  test('should format arrays correctly', async () => {
    const input = `{"items":["a","b","c"]}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.includes('[\n    "a",\n    "b",\n    "c"\n  ]'), 'Array items should be on separate lines with proper indentation');
  });

  test('should format empty arrays correctly', async () => {
    const input = `{"empty":[]}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.includes('"empty": []'), 'Empty arrays should remain compact');
  });

  test('should format empty objects correctly', async () => {
    const input = `{"empty":{}}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.includes('"empty": {}'), 'Empty objects should remain compact');
  });

  test('should handle null values correctly', async () => {
    const input = `{"value":null}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.includes('"value": null'), 'Null values should be preserved');
  });

  test('should handle boolean values correctly', async () => {
    const input = `{"flag1":true,"flag2":false}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.includes('"flag1": true'), 'True values should be preserved');
    assert.ok(result.stdout.includes('"flag2": false'), 'False values should be preserved');
  });

  test('should handle numeric values correctly', async () => {
    const input = `{"int":42,"float":3.14,"negative":-1,"zero":0}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.includes('"int": 42'), 'Integer values should be preserved');
    assert.ok(result.stdout.includes('"float": 3.14'), 'Float values should be preserved');
    assert.ok(result.stdout.includes('"negative": -1'), 'Negative values should be preserved');
    assert.ok(result.stdout.includes('"zero": 0'), 'Zero should be preserved');
  });

  test('should preserve key order', async () => {
    const input = `{"z":1,"a":2,"m":3}`;
    const result = await runFormatter(input);
    
    const lines = result.stdout.split('\n').filter(line => line.includes('"'));
    const zIndex = lines.findIndex(line => line.includes('"z"'));
    const aIndex = lines.findIndex(line => line.includes('"a"'));
    const mIndex = lines.findIndex(line => line.includes('"m"'));
    
    assert.ok(zIndex < aIndex && aIndex < mIndex, 'Key order should be preserved');
  });

  test('should be idempotent (running twice produces same output)', async () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.json'), 'utf-8');
    
    const firstRun = await runFormatter(input);
    const secondRun = await runFormatter(firstRun.stdout);
    
    assert.strictEqual(firstRun.stdout, secondRun.stdout, 'Running formatter twice should produce identical output');
  });

  test('should handle empty input gracefully', async () => {
    const input = '';
    const result = await runFormatter(input);
    assert.strictEqual(result.code, 0, 'Should handle empty input without error');
    assert.strictEqual(result.stdout, '', 'Empty input should produce empty output');
  });

  test('should handle malformed JSON gracefully', async () => {
    const input = `{"incomplete": "json" missing closing brace`;
    
    try {
      await runFormatter(input);
      assert.fail('Should have failed for malformed JSON');
    } catch (error) {
      assert.ok(error.message.includes('Process exited with code 1'), 'Should fail with proper error code for malformed JSON');
    }
  });

  test('should handle strings with special characters', async () => {
    const input = `{"text":"Hello\\nWorld\\t!","unicode":"emoji: ❤"}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.includes('"Hello\\nWorld\\t!"'), 'Should preserve escaped characters');
    assert.ok(result.stdout.includes('"emoji: ❤"'), 'Should preserve unicode characters');
  });

  test('should handle deeply nested structures', async () => {
    const input = `{"a":{"b":{"c":{"d":{"e":"deep"}}}}}`;
    const result = await runFormatter(input);
    
    // Check that it formats without issues and maintains structure
    const parsed = JSON.parse(result.stdout);
    assert.strictEqual(parsed.a.b.c.d.e, 'deep', 'Deep nesting should be preserved');
  });

  test('should handle mixed data types in arrays', async () => {
    const input = `{"mixed":[1,"string",true,null,{"nested":"object"}]}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.includes('1,'), 'Should handle numbers in arrays');
    assert.ok(result.stdout.includes('"string",'), 'Should handle strings in arrays');
    assert.ok(result.stdout.includes('true,'), 'Should handle booleans in arrays');
    assert.ok(result.stdout.includes('null,'), 'Should handle null in arrays');
    assert.ok(result.stdout.includes('{\n      "nested": "object"\n    }'), 'Should handle objects in arrays');
  });

  test('should add trailing newline', async () => {
    const input = `{"test":"value"}`;
    const result = await runFormatter(input);
    
    assert.ok(result.stdout.endsWith('\n'), 'Output should end with newline');
  });

  test('should handle large JSON files efficiently', async () => {
    // Create a moderately large JSON structure
    const largeObject = {
      users: Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        active: i % 2 === 0,
        metadata: {
          created: `2023-01-${String(i % 30 + 1).padStart(2, '0')}`,
          tags: [`tag${i}`, `category${i % 10}`]
        }
      }))
    };
    
    const input = JSON.stringify(largeObject);
    const start = Date.now();
    const result = await runFormatter(input);
    const duration = Date.now() - start;
    
    assert.strictEqual(result.code, 0, 'Should handle large JSON without error');
    assert.ok(duration < 5000, 'Should process large JSON in reasonable time (< 5s)');
    
    // Verify the structure is maintained
    const parsed = JSON.parse(result.stdout);
    assert.strictEqual(parsed.users.length, 100, 'Should preserve array length');
    assert.strictEqual(parsed.users[0].name, 'User 0', 'Should preserve data integrity');
  });
});