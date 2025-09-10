#!/usr/bin/env node
import YAML from 'yaml';

// Read from stdin
let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    // Parse the YAML document preserving comments
    const doc = YAML.parseDocument(input, { keepSourceTokens: true });
    
    // Configure formatting options to match style guide
    doc.options = {
      indent: 2,
      lineWidth: 80,
      minContentWidth: 20,
      doubleQuotedAsJSON: false,
      simpleKeys: false,
      singleQuote: false,
      quotingType: '"',
      blockQuote: 'literal'
    };
    
    // Apply formatting transformations to the document
    visitNodes(doc.contents, (node) => {
      // Apply formatting rules here
      if (node && node.value !== undefined) {
        // Handle string values - remove unnecessary quotes
        if (typeof node.value === 'string') {
          const str = node.value;
          // For simple paths, remove quotes
          if (str.match(/^\.\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/) ||
              str.match(/^[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+$/) ||
              str.match(/^[a-zA-Z0-9_-]+$/) && !str.match(/^\d/)) {
            node.type = 'PLAIN';
          }
        }
      }
    });
    
    // Output the formatted YAML
    process.stdout.write(doc.toString());
  } catch (error) {
    console.error('Error formatting YAML:', error.message);
    process.exit(1);
  }
});

function visitNodes(node, callback) {
  if (!node) return;
  
  callback(node);
  
  if (node.items) {
    // Array/sequence
    node.items.forEach(item => visitNodes(item, callback));
  } else if (node.items === undefined && node.value !== undefined) {
    // Scalar - already handled in callback
  } else if (node.key || node.value) {
    // Key-value pair
    visitNodes(node.key, callback);
    visitNodes(node.value, callback);
  }
}