#!/usr/bin/env node
import yawnYaml from 'yawn-yaml';
const YAWN = yawnYaml.default;

// Read from stdin
let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    // Create YAWN instance
    const yawn = new YAWN(input);
    
    // Get the parsed JSON
    const parsed = yawn.json;
    
    // Apply formatting rules to the JSON object
    const formatted = formatObject(parsed);
    
    // Set the formatted JSON back
    yawn.json = formatted;
    
    // Output the formatted YAML (should preserve comments)
    process.stdout.write(yawn.yaml);
  } catch (error) {
    console.error('Error formatting YAML:', error.message);
    process.exit(1);
  }
});

function formatObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(formatObject);
  } else if (obj && typeof obj === 'object') {
    const formatted = {};
    for (const [key, value] of Object.entries(obj)) {
      formatted[key] = formatObject(value);
    }
    return formatted;
  } else if (typeof obj === 'string') {
    // Apply string formatting rules based on style guide
    // Remove unnecessary quotes for simple strings
    if (obj.match(/^[a-zA-Z0-9_.-]+:[a-zA-Z0-9_.-]+$/) || 
        obj.match(/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/) ||
        obj.match(/^[a-zA-Z0-9_-]+$/) && !obj.match(/^\d/)) {
      return obj;
    }
    // Keep quotes for complex strings
    return obj;
  } else if (typeof obj === 'boolean') {
    return obj;
  }
  return obj;
}