#!/usr/bin/env node

const stylelint = require('stylelint');

async function formatCSS() {
  try {
    // Read from stdin
    let input = '';
    process.stdin.setEncoding('utf-8');
    
    for await (const chunk of process.stdin) {
      input += chunk;
    }

    if (!input.trim()) {
      process.exit(0);
    }

    // Configure stylelint with auto-fix enabled
    const result = await stylelint.lint({
      code: input,
      codeFilename: 'input.css', // Provide a filename for proper syntax detection
      fix: true,
      config: {
        extends: ['stylelint-config-standard-scss'],
        plugins: ['stylelint-order'],
        rules: {
          // Enforce double quotes for strings
          'string-quotes': 'double',
          // Enforce property ordering
          'order/properties-order': [
            // Layout
            'display',
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            
            // Box model
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'border',
            'border-top',
            'border-right',
            'border-bottom',
            'border-left',
            
            // Typography
            'font',
            'font-family',
            'font-size',
            'font-weight',
            'line-height',
            'color',
            'text-align',
            'text-decoration',
            
            // Visual
            'background',
            'background-color',
            'background-image',
            'opacity'
          ],
          // Enforce 80-character line width
          'max-line-length': 80,
          // Consistent indentation (2 spaces)
          'indentation': 2,
          // No duplicate properties
          'declaration-block-no-duplicate-properties': true
        }
      }
    });

    if (result.errored) {
      // Output any unfixable errors to stderr
      result.results.forEach(result => {
        result.warnings.forEach(warning => {
          console.error(`${warning.line}:${warning.column} ${warning.text}`);
        });
      });
      process.exit(1);
    }

    // Output the fixed CSS to stdout
    const output = result.output || input;
    process.stdout.write(output);

  } catch (error) {
    console.error('Error formatting CSS:', error.message);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  formatCSS();
}

module.exports = formatCSS;