# POC: JavaScript Formatter (ESLint + js-beautify)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working JavaScript formatter.

## CRITICAL: PASSING TESTS ARE MANDATORY
**THE ONLY ACCEPTABLE OUTCOME IS ALL TESTS PASSING**

1. **First check** if `workspace/01b-poc-javascript/` or `workspace/01-tool-research/js/` exists
2. **If tests exist**: Run them
   - ✅ If ALL tests pass → Mark task as done, document success
   - ❌ If ANY test fails → YOU MUST fix them until ALL pass
3. **If no tests exist**: Create the POC from scratch
4. **DO NOT** mark task as done with failing tests
5. **DO NOT** document "known limitations" as an excuse for failures
6. **ALWAYS** document your fixes and final success at the bottom of this file

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