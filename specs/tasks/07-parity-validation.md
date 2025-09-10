# Embedding Parity Validation

Implement validation system to ensure embedded content formats identically to standalone files.

**PROOF REQUIRED**: See [POC Requirements](../poc-requirements.md) - all validation logic must be verified with running code and tests.

## Workspace
Create `workspace/07-parity-validation/` for:
- `utils/embedding-parity.js` implementation
- Parity test suites and comparison files
- Error reporting and diff visualization tools

## Context
- Line length: 80 characters
- Indentation: 2 spaces
- Parity requirement: byte-for-byte identical formatting (no exceptions)
- Must work correctly even when parsers fail

## Implementation Tasks

### Parity Validator
- [ ] Create `utils/embedding-parity.js` with core validation logic
- [ ] Implement `assertParity({ text, lang, pipelineFormat, standaloneFormat })`
- [ ] Extract embedded content and normalize to column 0
- [ ] Format same content through standalone formatter
- [ ] Compare results byte-for-byte (after stripping reapplied indentation)

### Integration Points
- [ ] Add parity validation calls to rehype-format-embedded plugin
- [ ] Add parity validation calls to remark-format-code-blocks plugin
- [ ] Create `--parity` / `--no-parity` CLI flags (default on in dev)
- [ ] Implement structured error reporting with minimal diffs

### Error Reporting
- [ ] Create `ParityError` class extending base error
- [ ] Include language, context info, and character-level diff
- [ ] Show before/after snippets for debugging
- [ ] Log parity failures with actionable information

## Test Cases

### Basic Parity Tests
```html
<!-- Embedded in HTML -->
<script>
  const message = 'Hello World';
  console.log(message);
</script>
```
vs standalone JavaScript:
```javascript
const message = 'Hello World';
console.log(message);
```
- [ ] Extract script content, normalize to column 0
- [ ] Format both through JavaScript formatter
- [ ] Assert byte-for-byte equality

### Markdown Code Block Parity
````markdown
```javascript
function test() {
  return { formatted: true };
}
```
````
vs standalone:
```javascript
function test() {
  return { formatted: true };
}
```
- [ ] Extract fenced content, normalize indentation
- [ ] Format both versions independently  
- [ ] Verify identical output

### Complex Context Scenarios
```html
  <div>
    <script>
      function nested() {
        const deep = {
          level: 'two',
          effective: 'width'
        };
        return deep;
      }
    </script>
  </div>
```
- [ ] Account for 6-space indentation context
- [ ] Compute effective width: max(40, 80-6) = 74
- [ ] Ensure standalone format with width=74 matches embedded result

### Error Conditions
- [ ] Test when embedded formatter fails but standalone succeeds
- [ ] Test when standalone formatter fails but embedded succeeds
- [ ] Test when both formatters fail (should preserve original)
- [ ] Test with malformed code that causes parse errors

### Width Constraint Testing
- [ ] Test with very deep nesting (>40 space indentation)
- [ ] Verify minimum width of 40 characters is enforced
- [ ] Test formatters that ignore width constraints
- [ ] Document behavior when effective width is very small

## Developer Mode Features
- [ ] Verbose logging showing comparison process
- [ ] Diff output highlighting exact character differences  
- [ ] Performance metrics for parity validation overhead
- [ ] Option to save failing cases as test fixtures

## Validation Coverage
- [ ] JavaScript embedded in HTML script tags
- [ ] CSS embedded in HTML style tags
- [ ] JavaScript in Markdown fenced blocks
- [ ] CSS in Markdown fenced blocks
- [ ] HTML in Markdown raw blocks (with potential further embedding)
- [ ] YAML in Markdown fenced blocks
- [ ] JSON in Markdown fenced blocks
- [ ] Python in Markdown fenced blocks

## Performance Considerations
- [ ] Measure overhead of double-formatting for validation
- [ ] Consider sampling strategy for large codebases
- [ ] Investigate caching formatted results
- [ ] Document when to disable parity checking in production

## Success Criteria
- Zero tolerance for parity violations - any difference is a bug
- Clear error messages that help debug formatter differences  
- Minimal performance impact when parity checking is enabled
- Reliable operation even when formatters crash or fail
- Complete coverage of all embedding scenarios

## Documentation Requirements
- Document the exact parity validation algorithm
- Record any edge cases where parity is difficult to achieve
- Note performance characteristics and recommendations
- Document how to debug and fix parity violations
- Explain the relationship between effective width and parity