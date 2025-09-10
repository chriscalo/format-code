# POC: JavaScript Formatter (ESLint + js-beautify)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working JavaScript formatter.

## Common Requirements
**IMPORTANT**: Follow all requirements in [poc-requirements.md](./poc-requirements.md)
- Tool usage rules (zero approvals goal)
- NPM scripts philosophy (reuse, don't proliferate)
- Test requirements (all must pass)
- Code organization (one formatter, one test file)

## Task-Specific Requirements
- **Check folders**: `workspace/01b-poc-javascript/` or `workspace/01-tool-research/js/`
- **Run tests**: Use `npm test` - ALL must pass for task completion

## Tool Selection
**JavaScript**: ESLint + js-beautify
- ESLint supports stdin/stdout with `--stdin` flag
- js-beautify via eslint-plugin-js-beautify-html
- Custom rules possible despite ESLint deprecating formatting rules in 2023

## Installation
`npm install eslint eslint-plugin-js-beautify-html`

## POC Requirements

Create `workspace/01b-poc-javascript/` with:

### 1. `format-js.js` - CLI wrapper
- Use ESLint programmatically with formatting rules
- Accept stdin input
- Output to stdout
- Handle errors gracefully

### 2. `format-js.test.js` - Test suite
Validate:
- Semicolons required
- Double quotes for strings
- Trailing commas in objects/arrays
- 80-character line width
- Consistent indentation

### 3. `input.js` - Messy sample
Include:
- Single quotes
- Missing semicolons
- No trailing commas
- Bad indentation
- Long lines

### 4. `expected.js` - Clean output
Following style guide:
- Double quotes
- Semicolons on all statements
- Trailing commas
- Proper indentation
- Lines wrapped at 80 chars

### 5. `README.md` - Documentation
Document:
- How to run the formatter
- Test results
- ESLint formatting deprecation workaround
- Configuration used

## Success Criteria (ALL REQUIRED)
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] **ALL tests pass - NO EXCEPTIONS**
- [ ] Style guide compliance fully demonstrated
- [ ] Real formatting example working correctly

## Notes
ESLint deprecated formatting rules in 2023 to focus on code quality. The eslint-plugin-js-beautify-html provides a bridge to js-beautify for formatting. Document this limitation and any workarounds.

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