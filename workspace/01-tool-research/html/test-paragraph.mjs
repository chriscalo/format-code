import { execSync } from 'child_process';

// Test just the paragraph
const testInput = `<p>This is a test paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>`;

const output = execSync('node format-html.js', {
  input: testInput,
  encoding: 'utf-8',
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
});

console.log('Input:');
console.log(testInput);
console.log('\nOutput:');
console.log(output);

// Expected format based on expected.html
const expected = `<p>
  This is a test paragraph with <strong>bold text</strong> and <em>italic
  text</em>.
</p>`;

console.log('\nExpected:');
console.log(expected);

console.log('\nMatches:', output.trim() === expected.trim() ? '✓' : '✗');