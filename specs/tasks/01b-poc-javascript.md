# POC: JavaScript Formatter (ESLint + js-beautify)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working JavaScript formatter.

## IMPORTANT: Check Existing Work First
1. **First check** if `workspace/01b-poc-javascript/` or `workspace/01-tool-research/js/` exists
2. **If tests exist**: Run them and analyze results
   - If all tests pass → Mark task as done, document success in this file
   - If tests fail → Debug and fix them, document the fixes
3. **If no tests exist**: Create the POC from scratch following requirements below
4. **Always document** your findings and outcomes at the bottom of this file

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

## Success Criteria
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] All tests pass (or document known limitations)
- [ ] Style guide compliance demonstrated
- [ ] Real formatting example working

## Notes
ESLint deprecated formatting rules in 2023 to focus on code quality. The eslint-plugin-js-beautify-html provides a bridge to js-beautify for formatting. Document this limitation and any workarounds.

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)

## Task Execution Log
<!-- Document your findings below this line -->
### Status: [Update with PENDING/WORKING/DONE]
### Findings:
<!-- Add your analysis, test results, and any fixes made here -->