---
status: pending
started: null
completed: null
---

# Context Preservation System

Implement indentation detection, normalization, and reapplication for embedded content.

## Context
- Line length: 80 characters
- Indentation: 2 spaces
- Effective width calculation: `max(40, maxWidth - indentOffset)`
- Blank line whitespace must match surrounding context indentation

## Core Algorithm Requirements

### Indentation Detection
- [ ] Implement `computeIndentOffset(source, nodePosition)` in `utils/context-preservation.js`
- [ ] Detect both spaces and tabs correctly
- [ ] Handle mixed indentation gracefully (document behavior)
- [ ] Calculate exact column offset for embedded content start

### Content Normalization  
- [ ] Implement `normalizeToColumnZero(text, indentOffset)`
- [ ] Strip uniform indentation prefix from all lines
- [ ] Preserve relative indentation within the embedded content
- [ ] Handle edge cases: empty lines, mixed indentation

### Width Calculation
- [ ] Implement `computeEffectiveWidth(maxWidth, indentOffset)`
- [ ] Enforce minimum width of 40 characters
- [ ] Pass effective width to formatters that support it
- [ ] Document which formatters use width constraints

### Reindentation
- [ ] Implement `reindentUniform(text, indentOffset, unit = "  ")`
- [ ] Apply uniform indentation prefix to each non-empty line
- [ ] Preserve blank lines with correct whitespace for context
- [ ] Handle trailing whitespace according to rules (none except whitespace-only lines)

## Test Cases

### Basic Indentation
```html
  <script>
  const x = 1;
  </script>
```
- [ ] Detect 2-space offset
- [ ] Normalize JavaScript to column 0
- [ ] Format JavaScript independently  
- [ ] Reapply 2-space prefix to each line

### Deep Nesting
```html
      <div>
        <script>
        function test() {
          return 42;
        }
        </script>
      </div>
```
- [ ] Detect 8-space offset for script content
- [ ] Compute effective width: max(40, 80-8) = 72
- [ ] Verify formatted content stays within effective width

### Mixed Content Types
- [ ] Test with tabs vs spaces detection
- [ ] Test with empty lines in embedded content
- [ ] Test with pre-existing malformed indentation
- [ ] Test with very deep nesting (>40 spaces)

### Blank Line Handling
```html
  <script>

  const x = 1;

  const y = 2;

  </script>
```
- [ ] Blank lines get exactly 2 spaces (matching context)
- [ ] No trailing whitespace on content lines
- [ ] Consistent whitespace handling throughout

## Error Conditions
- [ ] Handle parse failures gracefully (preserve original content)
- [ ] Document behavior when effective width < 40
- [ ] Handle extremely deep nesting scenarios
- [ ] Test with malformed or unparseable embedded content

## Performance Considerations  
- [ ] Investigate streaming vs buffering for large embedded blocks
- [ ] Measure performance impact of context detection
- [ ] Document memory usage for deeply nested content
- [ ] Consider caching indentation detection results

## Success Criteria
- Byte-for-byte identical results when formatting same content at same indent level
- Effective width calculation always respects minimum of 40 characters
- Blank line whitespace exactly matches surrounding context
- No data loss or corruption during normalization/reindentation
- Handles edge cases without crashing

## Documentation Requirements
- Document the precise algorithm for each function
- Record performance characteristics and limitations
- Note any formatter-specific width handling differences  
- Document error handling strategy for malformed content