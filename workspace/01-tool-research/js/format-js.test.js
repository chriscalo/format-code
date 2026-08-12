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
    const child = spawn('node', ['format-js.js'], {
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

describe('JavaScript Formatter Tests', () => {
  
  test('should format input.js to match expected.js', async () => {
    const inputContent = fs.readFileSync(path.join(__dirname, 'input.js'), 'utf-8');
    const expectedContent = fs.readFileSync(path.join(__dirname, 'expected.js'), 'utf-8');
    
    const result = await runFormatter(inputContent);
    assert.strictEqual(result.stdout.trim(), expectedContent.trim(), 'Formatted output should match expected.js');
  });

  test('should enforce double quotes for strings', async () => {
    const input = `const name = 'John';`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('"John"'), 'Should convert single quotes to double quotes');
    assert.ok(!result.stdout.includes("'John'"), 'Should not contain single quotes');
  });

  test('should require semicolons', async () => {
    const input = `const x = 1\nconst y = 2`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('const x = 1;'), 'Should add semicolon after first statement');
    assert.ok(result.stdout.includes('const y = 2;'), 'Should add semicolon after second statement');
  });

  test('should add trailing commas in objects', async () => {
    const input = `const obj = {
  a: 1,
  b: 2
};`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('b: 2,'), 'Should add trailing comma in multiline object');
  });

  test('should add trailing commas in arrays', async () => {
    const input = `const arr = [
  'item1',
  'item2'
];`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('"item2",'), 'Should add trailing comma in multiline array');
  });

  test('should apply consistent indentation', async () => {
    const input = `function test() {
if (true) {
return 'hello';
}
}`;
    const result = await runFormatter(input);
    const lines = result.stdout.split('\n');
    // Check that nested blocks are properly indented with 2 spaces
    assert.ok(lines.some(line => line.startsWith('  if')), 'If statement should be indented 2 spaces');
    assert.ok(lines.some(line => line.startsWith('    return')), 'Return statement should be indented 4 spaces');
  });

  test('should handle object spacing correctly', async () => {
    const input = `const obj = {a:1,b:2};`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('{ a: 1, b: 2 }'), 'Should add proper object spacing');
  });

  test('should handle array spacing correctly', async () => {
    const input = `const arr = [ 1, 2, 3 ];`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('[1, 2, 3]'), 'Should remove spaces inside array brackets');
  });

  test('should add space before blocks', async () => {
    const input = `if (true){
  console.log('test');
}`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('if (true) {'), 'Should add space before opening brace');
  });

  test('should add space around infix operators', async () => {
    const input = `const result = a+b*c;`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('a + b * c'), 'Should add spaces around operators');
  });

  test('should be idempotent (running twice produces same output)', async () => {
    const input = fs.readFileSync(path.join(__dirname, 'input.js'), 'utf-8');
    
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

  test('should handle malformed input gracefully', async () => {
    const input = `const broken = {
  missing: quote
  invalid syntax here
}`;
    
    // The formatter should either fix what it can or handle errors gracefully
    try {
      const result = await runFormatter(input);
      // If it succeeds, that's fine - it fixed what it could
      assert.strictEqual(result.code, 0, 'Should handle malformed input gracefully');
    } catch (error) {
      // If it fails, it should fail with a meaningful error message
      assert.ok(error.message.includes('Process exited with code 1'), 'Should fail with proper error code for malformed input');
    }
  });

  test('should handle function declarations correctly', async () => {
    const input = `function test(param1,param2){
return param1+param2;
}`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('function test(param1, param2) {'), 'Should format function parameters with proper spacing');
    assert.ok(result.stdout.includes('return param1 + param2;'), 'Should format return statement with proper spacing');
  });

  test('should handle class definitions correctly', async () => {
    const input = `class MyClass{
constructor(name){
this.name=name;
}
}`;
    const result = await runFormatter(input);
    assert.ok(result.stdout.includes('class MyClass {'), 'Should format class declaration with proper spacing');
    assert.ok(result.stdout.includes('constructor(name) {'), 'Should format constructor with proper spacing');
    assert.ok(result.stdout.includes('this.name = name;'), 'Should format assignment with proper spacing');
  });
});