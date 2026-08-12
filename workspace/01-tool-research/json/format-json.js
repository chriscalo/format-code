#!/usr/bin/env node

// Read from stdin
let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    // Handle empty input
    if (input.trim() === '') {
      process.stdout.write('');
      return;
    }
    
    // Parse the JSON to validate it
    const parsed = JSON.parse(input);
    
    // Format with 2-space indentation
    const formatted = JSON.stringify(parsed, null, 2);
    
    // Ensure trailing newline
    const output = formatted.endsWith('\n') ? formatted : formatted + '\n';
    
    process.stdout.write(output);
  } catch (error) {
    console.error('Error formatting JSON:', error.message);
    process.exit(1);
  }
});