# Context Preservation System

Implement indentation detection, normalization, and reapplication for embedded content.

**PROOF REQUIRED**: See [POC Requirements](../poc-requirements.md) - all algorithms must be validated with running code and tests.

## Tool Usage Guidelines (IMPORTANT for YOLO mode)
**Prefer native tools over bash commands** to minimize approval prompts:
- Use `Write` tool to create test files and utilities
- Use `Read` tool to check implementation results
- Use `Edit` or `MultiEdit` tools for code modifications
- Use npm scripts from package.json when available
- Only use Bash for running tests and npm commands

## Workspace
Create `workspace/04-context-preservation/` for:
- `utils/context-preservation.js` implementation
- Test cases and sample files with various indentation scenarios
- Performance benchmarking scripts

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

## Minimum Success Criteria  

**Task is complete when:**
1. ✅ Context extraction algorithm implemented and tested
2. ✅ At least 3 test cases pass (basic nesting, edge case, one complex case)
3. ✅ Integration with orchestrator demonstrated

## Full Success Criteria
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