import { execSync } from 'child_process';
import fs from 'fs';

// Run the basic formatter without replacements first
const testCode = `#!/usr/bin/env node
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';

let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  unified()
    .use(rehypeParse, { fragment: false })
    .use(rehypeFormat, { indent: 2, blanks: [] })
    .use(rehypeStringify, {
      closeSelfClosing: true,
      preferUnquoted: false,
      quote: '"',
      quoteSmart: false,
      tightAttributes: false,
      omitOptionalTags: false,
      collapseEmptyAttributes: false,
      allowDangerousHtml: true
    })
    .process(input)
    .then((file) => {
      let output = String(file);
      output = output.replace(/<!DOCTYPE\\s+html>/i, '<!doctype html>');
      process.stdout.write(output);
    })
    .catch((error) => {
      console.error('Error:', error.message);
      process.exit(1);
    });
});`;

// Save temporary formatter
fs.writeFileSync('temp-formatter.js', testCode);

// Run it
const input = fs.readFileSync('input.html', 'utf-8');
const baseOutput = execSync('node temp-formatter.js', {
  input: input,
  encoding: 'utf-8',
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
});

// Clean up
fs.unlinkSync('temp-formatter.js');

// Find the paragraph in the output
const paragraphMatch = baseOutput.match(/<p>[\s\S]*?<\/p>/);
if (paragraphMatch) {
  console.log('Current paragraph output:');
  console.log(paragraphMatch[0]);
  console.log('\nJSON:', JSON.stringify(paragraphMatch[0]));
}

// Find the nested list
const listMatch = baseOutput.match(/<li>Item 2[\s\S]*?<\/li>/);
if (listMatch) {
  console.log('\n\nCurrent Item 2 list output:');
  console.log(listMatch[0]);
  console.log('\nJSON:', JSON.stringify(listMatch[0]));
}

// Show what we need to match
const expected = fs.readFileSync('expected.html', 'utf-8');
const expectedP = expected.match(/<p>[\s\S]*?<\/p>/);
const expectedList = expected.match(/<li>\s*Item 2[\s\S]*?<\/li>/);

console.log('\n\nExpected paragraph:');
console.log(expectedP?.[0]);

console.log('\n\nExpected Item 2:');
console.log(expectedList?.[0]);