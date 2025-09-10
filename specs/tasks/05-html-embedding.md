# HTML Embedding Support

Implement rehype plugin to format `<script>` and `<style>` blocks within HTML.

## Context
- Line length: 80 characters  
- Indentation: 2 spaces
- HTML style: always quote attributes, XHTML self-closing tags, attribute ordering by type
- Uses rehype pipeline: parse → embedded delegation → rehype-format host normalize

## Implementation Tasks

### Rehype Plugin Development
- [ ] Create `plugins/rehype-format-embedded.js`
- [ ] Parse HTML with rehype to find `<script>` and `<style>` blocks
- [ ] Extract raw text content from script/style elements
- [ ] Detect language from type attribute (text/css, text/javascript, etc.)
- [ ] Integrate with context preservation utilities

### Content Processing
- [ ] Implement visitor pattern for script/style nodes
- [ ] Extract content while preserving original indentation context
- [ ] Route to appropriate formatter (JavaScript or CSS)
- [ ] Handle formatter errors gracefully (preserve original on failure)
- [ ] Reintegrate formatted content back into AST

### Host Normalization
- [ ] Apply rehype-format for HTML structure (whitespace, attributes)
- [ ] Preserve formatted embedded content exactly
- [ ] Ensure boundary normalization doesn't affect inner content
- [ ] Handle attribute ordering and quote normalization

## Test Cases

### Basic Script Block
```html
<html>
  <head>
    <script>
    const message='Hello World';console.log(message);
    </script>
  </head>
</html>
```
- [ ] Format JavaScript to use double quotes and proper spacing
- [ ] Maintain 4-space indentation for script content
- [ ] Preserve HTML structure and formatting

### Basic Style Block  
```html
<html>
  <head>
    <style>
    body{margin:0;padding:10px;background-color:#fff}
    </style>
  </head>
</html>
```
- [ ] Format CSS with proper spacing and property ordering
- [ ] Maintain 4-space indentation for style content
- [ ] Use double quotes for CSS values

### Multiple Blocks
```html
<html>
  <head>
    <script>const x = 1;</script>
    <style>body { margin: 0; }</style>
    <script>
      function test() {
        return 'formatted';
      }
    </script>
  </head>
</html>
```
- [ ] Handle multiple script/style blocks correctly
- [ ] Each block formatted independently with correct context
- [ ] Host HTML formatting doesn't interfere with embedded content

### Edge Cases
- [ ] Empty script/style blocks (preserve structure)
- [ ] Malformed JavaScript/CSS (preserve original, log error)
- [ ] Script blocks with unusual type attributes
- [ ] Inline event handlers (document behavior - likely leave unchanged)
- [ ] Style blocks with media queries and deep nesting

### Type Attribute Handling
- [ ] `<script type="text/javascript">` → JavaScript formatter
- [ ] `<script type="module">` → JavaScript formatter  
- [ ] `<style type="text/css">` → CSS formatter
- [ ] `<script type="application/json">` → JSON formatter
- [ ] Unknown types → preserve original content

## Integration Testing
- [ ] Test with various HTML structures (nested elements, comments)
- [ ] Verify HTML host formatting (attribute quotes, self-closing tags)
- [ ] Test with deeply indented script/style blocks
- [ ] Ensure effective width calculation works correctly
- [ ] Test round-trip stability (format twice → identical results)

## Error Handling
- [ ] Document behavior when embedded content has syntax errors
- [ ] Test recovery from formatter crashes or timeouts
- [ ] Preserve original HTML structure even if embedding fails
- [ ] Log errors appropriately without breaking the process

## Success Criteria
- Embedded JavaScript/CSS formats identically to standalone files
- Host HTML structure remains clean and consistent
- No corruption or data loss during processing
- Graceful handling of malformed embedded content
- Deterministic output across multiple runs

## Documentation Requirements
- Document the rehype plugin architecture and hooks used
- Record any limitations with specific HTML patterns
- Note performance characteristics for large HTML files
- Document error recovery strategies and logging approach