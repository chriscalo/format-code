import { execSync } from 'child_process';
import fs from 'fs';

// Format input
const input = fs.readFileSync('input.html', 'utf-8');
const output = execSync('node format-html.js', {
  input: input,
  encoding: 'utf-8',
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
});

fs.writeFileSync('output.html', output);

// Run tests
try {
  execSync('npm test', {
    cwd: '/Volumes/src/format-code/workspace/01-tool-research/html',
    stdio: 'inherit'
  });
  console.log('\n✅ All tests pass!');
} catch (e) {
  console.log('\n❌ Tests failed - checking specific issues...');
  
  // Check specific formatting
  const expected = fs.readFileSync('expected.html', 'utf-8');
  
  console.log('\nChecking key features:');
  console.log('1. Doctype:', output.startsWith('<!doctype html>') ? '✓' : '✗');
  console.log('2. Quoted attributes:', output.includes('id="main"') ? '✓' : '✗');
  console.log('3. Self-closing tags:', output.includes('/>') ? '✓' : '✗');
  console.log('4. Indentation:', output.includes('  <head>') ? '✓' : '✗');
  
  // Check paragraph formatting
  const hasParagraphNewline = output.includes('and <em>italic\n');
  console.log('5. Paragraph newline:', hasParagraphNewline ? '✓' : '✗');
  
  if (!hasParagraphNewline) {
    // Extract paragraph from both
    const outputP = output.match(/<p>[\s\S]*?<\/p>/);
    const expectedP = expected.match(/<p>[\s\S]*?<\/p>/);
    
    if (outputP && expectedP) {
      console.log('\nParagraph comparison:');
      console.log('Expected:\n', expectedP[0]);
      console.log('\nActual:\n', outputP[0]);
    }
  }
}