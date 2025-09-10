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
      process.stdout.write(output);
    })
    .catch((error) => {
      console.error('Error formatting HTML:', error.message);
      process.exit(1);
    });
});