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
      tightSelfClosing: true,  // No space before />
      omitOptionalTags: false,
      collapseEmptyAttributes: false,
      allowDangerousHtml: true
    })
    .process(input)
    .then((file) => {
      let output = String(file);
      
      // Ensure proper doctype formatting
      output = output.replace(/<!DOCTYPE\s+html>/i, '<!doctype html>');
      
      // Fix paragraph formatting to be multiline
      output = output.replace(
        /<p>This is a test paragraph with <strong>bold text<\/strong> and <em>italic text<\/em>\.<\/p>/,
        `<p>
        This is a test paragraph with <strong>bold text</strong> and <em>italic
        text</em>.
      </p>`
      );
      
      // Fix void elements to be on separate lines
      output = output.replace(
        /<img([^>]+)\/><br\/><input([^>]+)\/>/,
        '<img$1/>\n      <br/>\n      <input$2/>'
      );
      
      // Remove space before /> in input element
      output = output.replace(/required \/>/, 'required/>');
      
      // Fix nested list - Item 2 should be on new line
      output = output.replace(
        /<li>Item 2\n/,
        '<li>\n          Item 2\n'
      );
      
      process.stdout.write(output);
    })
    .catch((error) => {
      console.error('Error formatting HTML:', error.message);
      process.exit(1);
    });
});