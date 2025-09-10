import { execSync } from 'child_process';
import fs from 'fs';

// Create a basic formatter without the regex replacements
const basicFormatter = `#!/usr/bin/env node
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
    });
});`;

fs.writeFileSync('basic-formatter.js', basicFormatter);

const input = fs.readFileSync('input.html', 'utf-8');
const output = execSync('node basic-formatter.js', {
  input: input,
  encoding: 'utf-8',
  cwd: '/Volumes/src/format-code/workspace/01-tool-research/html'
});

// Extract key parts
const paragraph = output.match(/<p>[\s\S]*?<\/p>/)?.[0];
const item2 = output.match(/<li>Item 2[\s\S]*?<\/li>\s*<\/ul>/)?.[0];

console.log('Current paragraph:');
console.log(JSON.stringify(paragraph));

console.log('\nCurrent Item 2:');
console.log(JSON.stringify(item2));

// Clean up
fs.unlinkSync('basic-formatter.js');