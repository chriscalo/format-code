#!/usr/bin/env node

import yaml from "js-yaml";

// Configuration options for style guide compliance
const yamlOptions = {
  indent: 2,
  lineWidth: 80,
  noRefs: true,
  sortKeys: false, // Preserve original key order
  flowLevel: -1, // Always use block style
  skipInvalid: false,
  quotingType: "'" // Minimal quoting per style guide
};

// Read from stdin
let input = "";
process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  try {
    // Parse YAML
    const data = yaml.load(input);
    
    // Format with js-yaml
    let formatted = yaml.dump(data, yamlOptions);
    
    // Note: js-yaml cannot preserve comments - this is a known limitation
    
    process.stdout.write(formatted);
  } catch (error) {
    console.error("Error formatting YAML:", error.message);
    process.exit(1);
  }
});