# POC: HTML Formatter (rehype/rehype-format)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working HTML formatter.

## Common Requirements
**IMPORTANT**: Follow all requirements in [poc-requirements.md](./poc-requirements.md)
- Tool usage rules (zero approvals goal)
- NPM scripts philosophy (reuse, don't proliferate)
- Test requirements (all must pass)
- Code organization (one formatter, one test file)

## Task-Specific Requirements
- **Check folders**: `workspace/01a-poc-html/` or `workspace/01-tool-research/html/`
- **Run tests**: Use `npm test` - ALL must pass for task completion

## Tool Selection
**HTML**: rehype/rehype-format
- Can intercept `<script>`/`<style>` blocks via plugins
- Supports configuration options (blanks, indent)
- Active plugin ecosystem, unified AST transformation

## Installation
`npm install rehype rehype-format rehype-parse rehype-stringify unified`

## POC Requirements

Create `workspace/01a-poc-html/` with:

### 1. `format-html.js` - CLI wrapper
- Use rehype programmatically
- Accept stdin input
- Output to stdout
- Handle errors gracefully

### 2. `format-html.test.js` - Test suite
Validate:
- XHTML self-closing tags (`<br />`, `<img />`)
- Attribute quoting (all attributes must be quoted)
- 80-character line width
- Consistent indentation

### 3. `input.html` - Messy sample
Include:
- Unquoted attributes
- Non-self-closing void elements
- Inconsistent spacing
- Long lines

### 4. `expected.html` - Clean output
Following style guide:
- All attributes quoted
- Self-closing tags for void elements
- Proper indentation
- Lines wrapped at 80 chars

### 5. `README.md` - Documentation
Document:
- How to run the formatter
- Test results
- Any limitations discovered
- Configuration used

## Success Criteria (ALL REQUIRED)
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] **ALL tests pass - NO EXCEPTIONS**
- [ ] Style guide compliance fully demonstrated
- [ ] Real formatting example working correctly

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)

## Task Execution Log
<!-- Document your findings below this line -->
### Status: [Update with PENDING/WORKING/DONE]
### Test Results: [Update with PASS/FAIL count]
### Findings:
<!-- Document ALL test results. If any failed, document how you fixed them.
DO NOT leave this task until ALL tests pass. -->