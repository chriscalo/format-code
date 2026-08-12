#!/usr/bin/env node

const { remark } = require('remark');

// Read from stdin
let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    input += chunk;
  }
});

process.stdin.on('end', () => {
  formatMarkdown(input)
    .then(result => {
      process.stdout.write(result);
      process.exit(0);
    })
    .catch(error => {
      console.error('Error formatting markdown:', error.message);
      process.exit(1);
    });
});

async function formatMarkdown(markdown) {
  try {
    const processor = remark()
      .data('settings', {
        bullet: '-',           // Use '-' for unordered lists
        fence: '`',           // Use backticks for code blocks  
        fences: true,         // Always use fenced code blocks
        emphasis: '*',        // Use '*' for emphasis
        strong: '*',          // Use '**' for strong
        listItemIndent: 'one', // Use one space for list indentation
        incrementListMarker: true, // Increment ordered list markers
        rule: '-',            // Use '-' for horizontal rules
        ruleSpaces: false,    // Don't add spaces around rules
        ruleRepetition: 3,    // Use 3 characters for rules
        closeAtx: false,      // Don't close ATX headings with #
        tableCellPadding: true, // Add padding to table cells
        tablePipeAlign: false,  // Don't align table pipes
        stringLength: (s) => s.length // Use string length for wrapping
      });

    const result = await processor.process(markdown);
    return String(result);
  } catch (error) {
    throw new Error(`Failed to format markdown: ${error.message}`);
  }
}

// Handle SIGINT gracefully
process.on('SIGINT', () => {
  process.exit(0);
});