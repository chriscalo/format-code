# Integration Testing & Real-World Validation

Test the complete orchestrator with complex real-world scenarios and edge cases.

**PROOF REQUIRED**: See [POC Requirements](../poc-requirements.md) - all tests must be executable code that validates functionality.

## Workspace
Create `workspace/08-integration-testing/` for:
- `tests/` directory with Node.js test runner setup
- `fixtures/` with golden input/expected output pairs
- Performance benchmarking and cross-platform test scripts

## Context
- Line length: 80 characters
- Indentation: 2 spaces
- Must handle all embedding combinations and edge cases
- Focus on scenarios likely to break in production

## Test Implementation

### Test Framework Setup
- [ ] Create `tests/` directory with Node.js test runner
- [ ] Create `tests/fixtures/` with golden input/expected output pairs
- [ ] Implement test utilities for file comparison and error checking
- [ ] Set up deterministic test environment (pinned tool versions)

### Golden Fixtures
- [ ] Create comprehensive HTML files with script/style blocks at varying indents
- [ ] Create Markdown files with nested code blocks (lists, quotes, deep nesting)
- [ ] Create standalone counterparts for each embedded snippet
- [ ] Include edge cases: empty blocks, malformed content, unusual nesting

### Round-Trip Stability Tests
- [ ] Format each fixture file twice
- [ ] Assert second formatting produces zero diff from first
- [ ] Test with all language combinations
- [ ] Include complex triple-embedding scenarios

### Boundary Policy Tests
- [ ] Test host formatters can add/remove blank lines as configured
- [ ] Verify hosts never modify inner content
- [ ] Test boundary handling with various indentation levels
- [ ] Ensure whitespace on blank lines matches context

## Real-World Scenarios

### Complex HTML Documents
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Complex Example</title>
    <style>
      body { font-family: sans-serif; }
      .container { 
        max-width: 800px; 
        margin: 0 auto; 
      }
      @media (max-width: 768px) {
        .container { padding: 1rem; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <script>
        const config = {
          api: 'https://example.com/api',
          timeout: 5000,
          retries: 3
        };
        
        function initializeApp() {
          console.log('Starting application...');
          return config;
        }
      </script>
    </div>
  </body>
</html>
```
- [ ] Verify CSS formatting with media queries and nesting
- [ ] Verify JavaScript formatting with object literals and functions  
- [ ] Test HTML attribute formatting and structure preservation
- [ ] Ensure all indentation contexts are handled correctly

### Complex Markdown Documents
````markdown
# Project Documentation

## Code Examples

### JavaScript Configuration

Here's how to configure the application:

```javascript
const config = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
  },
  database: {
    url: process.env.DATABASE_URL,
    options: { ssl: true, poolSize: 10 }
  }
};

export default config;
```

### Styling Examples

1. Basic CSS setup:
   ```css
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }
   
   body {
     font-family: system-ui, sans-serif;
     line-height: 1.5;
   }
   ```

2. Advanced layouts:
   ```scss
   .grid-container {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: 1rem;
     
     .grid-item {
       padding: 1rem;
       background: white;
       border-radius: 8px;
       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
     }
   }
   ```

### HTML Integration

Sometimes you need to include raw HTML:

<div class="example-container">
  <script type="application/json">
  {
    "name": "example",
    "version": "1.0.0",
    "dependencies": {
      "lodash": "^4.17.21",
      "axios": "^0.24.0"
    }
  }
  </script>
  
  <style>
    .example-container {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  </style>
</div>

> **Note**: The above demonstrates triple embedding:
> 1. Markdown contains raw HTML
> 2. HTML contains script/style blocks  
> 3. Script contains JSON, style contains CSS
````
- [ ] Test all language combinations within single document
- [ ] Verify nested list and quote block indentation handling
- [ ] Test the triple-embedding scenario thoroughly
- [ ] Ensure markdown structure preservation throughout

### Performance Testing
- [ ] Test with large HTML files (>10MB) containing many embedded blocks
- [ ] Test with large Markdown documents (>100 code blocks)
- [ ] Measure formatting time and memory usage
- [ ] Test with deeply nested content (>10 levels of indentation)
- [ ] Identify performance bottlenecks and document limitations

### Error Recovery Testing
- [ ] Test with syntactically invalid JavaScript in script blocks
- [ ] Test with malformed CSS in style blocks
- [ ] Test with unparseable HTML structures
- [ ] Test with corrupted or binary file content
- [ ] Verify graceful degradation and error reporting

### Cross-Platform Testing
- [ ] Test on macOS (primary target)
- [ ] Test on Linux (CI compatibility)
- [ ] Verify consistent results across platforms
- [ ] Test with different Node.js versions
- [ ] Document any platform-specific issues discovered

## Advanced Edge Cases

### Unusual Indentation Patterns
- [ ] Mixed tabs and spaces within same file
- [ ] Very deep nesting (>100 characters indentation)  
- [ ] Malformed indentation that formatters might "fix"
- [ ] Empty lines with inconsistent whitespace

### Formatter Interaction Edge Cases
- [ ] Content that one formatter handles differently based on context
- [ ] Formatters that add/remove blank lines inconsistently
- [ ] Width constraints that cause different wrapping decisions
- [ ] Character encoding issues (UTF-8, special characters)

### Configuration Interaction Testing
- [ ] Test with multiple .eslintrc files in nested directories
- [ ] Test with conflicting stylelint configurations
- [ ] Test with missing configuration files (default behavior)
- [ ] Test configuration inheritance and override behavior

## Success Criteria
- All golden fixtures produce expected output consistently
- Round-trip stability across all test cases
- No data loss or corruption in any scenario
- Graceful error handling for all malformed input
- Performance acceptable for real-world usage patterns
- Cross-platform consistency

## Documentation Requirements
- Document all discovered edge cases and their handling
- Record performance characteristics for different file sizes
- Note any platform-specific considerations
- Document the test fixture format and maintenance process  
- Create troubleshooting guide based on integration testing findings