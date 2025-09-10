import { test, describe } from 'node:test';
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

describe('HTML Formatter (rehype) Tests', () => {
  test('should add proper indentation', async () => {
    const input = fs.readFileSync(inputFile, 'utf-8');
    const output = await runFormatter(input);
    
    // Check indentation
    assert(output.includes('  <head>'), 'Should have 2-space indentation for head');
    assert(output.includes('    <meta'), 'Should have 4-space indentation for nested elements');
    assert(output.includes('      <ul>'), 'Should handle deep nesting properly');
  });

  test('should quote all attributes', async () => {
    const input = fs.readFileSync(inputFile, 'utf-8');
    const output = await runFormatter(input);
    
    // Check attribute quoting
    assert(output.includes('lang="en"'), 'Should quote lang attribute');
    assert(output.includes('id="main"'), 'Should quote id attribute');
    assert(output.includes('class="content"'), 'Should quote class attribute');
    assert(output.includes('src="test.jpg"'), 'Should quote src attribute');
    assert(output.includes('width="300"'), 'Should quote width attribute');
  });

  test('should handle void elements correctly', async () => {
    const input = fs.readFileSync(inputFile, 'utf-8');
    const output = await runFormatter(input);
    
    // Check void elements with self-closing slashes (may have space before />)
    assert(output.includes('<meta charset="UTF-8" />') || output.includes('<meta charset="UTF-8"/>') || output.includes('<meta charset="UTF-8">'), 'Should handle meta elements');
    assert(output.includes('<br />') || output.includes('<br/>') || output.includes('<br>'), 'Should handle br elements');
    assert(output.includes('<hr />') || output.includes('<hr/>') || output.includes('<hr>'), 'Should handle hr elements');
    assert(output.includes('<img'), 'Should handle img elements');
  });


  test('should handle nested lists properly', async () => {
    const input = fs.readFileSync(inputFile, 'utf-8');
    const output = await runFormatter(input);
    
    // Check nested list structure - Item 2 may have various indentations
    assert(output.includes('Item 2'), 'Should have Item 2 in list');
    assert(output.includes('<li>Nested item</li>'), 'Should handle nested items');
    
    // Check proper indentation in nested structures
    const lines = output.split('\n');
    const hasNestedIndentation = lines.some(line => 
      line.includes('<ul>') && (line.includes('    ') || line.includes('        ') || line.includes('          '))
    );
    assert(hasNestedIndentation, 'Should properly indent nested ul elements');
  });

  test('should maintain proper document structure', async () => {
    const input = fs.readFileSync(inputFile, 'utf-8');
    const output = await runFormatter(input);
    
    // Check document structure
    assert(output.includes('<!doctype html>') || output.includes('<!DOCTYPE html>'), 'Should have proper doctype');
    assert(output.includes('<html lang="en">'), 'Should have html element with lang');
    assert(output.includes('<head>'), 'Should have head section');
    assert(output.includes('<body>'), 'Should have body section');
  });

  test('should handle stdin/stdout correctly', async () => {
    const input = '<div class=test><p>Hello</p></div>';
    const output = await runFormatter(input);
    
    assert(output.includes('class="test"'), 'Should process stdin correctly and quote attributes');
    assert(output.includes('<p>Hello</p>'), 'Should preserve content from stdin');
    assert(output.includes('  <div'), 'Should add proper indentation');
  });

  test('should handle error gracefully', async () => {
    const invalidInput = '<div><span>unclosed';
    
    // HTML parser is generally very forgiving, so this should still work
    const output = await runFormatter(invalidInput);
    assert(output.includes('<div>'), 'Should handle malformed HTML gracefully');
  });
});