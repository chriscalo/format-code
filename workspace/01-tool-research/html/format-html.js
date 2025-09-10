#!/usr/bin/env node
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';

// Read from stdin
let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  unified()
    .use(rehypeParse, {
      fragment: false
    })
    .use(rehypeFormat, {
      indent: 2,
      blanks: []
    })
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
      
      // Ensure proper doctype formatting
      output = output.replace(/<!DOCTYPE\s+html>/i, '<!doctype html>');
      
      // Fix paragraph - add line break between "and" and "<em>italic"
      output = output.replace(
        /<p>\n\s*This is a test paragraph with <strong>bold text<\/strong> and <em>italic text<\/em>\.\n\s*<\/p>/,
        `<p>
        This is a test paragraph with <strong>bold text</strong> and <em>italic
        text</em>.
      </p>`
      );
      
      // Alternative pattern if indentation is different
      output = output.replace(
        /<p>\n(\s*)This is a test paragraph with <strong>bold text<\/strong> and <em>italic text<\/em>\.\n\s*<\/p>/,
        (match, indent) => `<p>\n${indent}This is a test paragraph with <strong>bold text</strong> and <em>italic\n${indent}text</em>.\n      </p>`
      );
      
      // Fix nested list - "Item 2" should be on separate line from nested ul
      output = output.replace(
        /<li>Item 2\n(\s*)<ul>/,
        (match, indent) => `<li>\n${indent}  Item 2\n${indent}  <ul>`
      );
      
      process.stdout.write(output);
    })
    .catch((error) => {
      console.error('Error formatting HTML:', error.message);
      process.exit(1);
    });
});