# POC: CSS/SCSS Formatter (Stylelint)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working CSS/SCSS formatter.

## Common Requirements
**IMPORTANT**: Follow all requirements in [poc-requirements.md](./poc-requirements.md)
- Tool usage rules (zero approvals goal)
- NPM scripts philosophy (reuse, don't proliferate)
- Test requirements (all must pass)
- Code organization (one formatter, one test file)

## Task-Specific Requirements
- **Check folders**: `workspace/01c-poc-css/` or `workspace/01-tool-research/css/`
- **Run tests**: Use `npm test` - ALL must pass for task completion

## Tool Selection
**CSS/SCSS**: Stylelint
- Native `--stdin` support
- Extensive plugin ecosystem
- SCSS support via stylelint-scss plugin

## Installation
`npm install stylelint stylelint-config-standard-scss`

## POC Requirements

Create `workspace/01c-poc-css/` with:

### 1. `format-css.js` - CLI wrapper
- Use Stylelint programmatically with --fix
- Accept stdin input
- Output to stdout
- Handle errors gracefully

### 2. `format-css.test.js` - Test suite
Validate:
- Double quotes for strings
- Property ordering (by type/importance)
- 80-character line width
- Consistent indentation
- SCSS syntax support

### 3. `input.css` - Messy sample
Include:
- Single quotes
- Disordered properties
- Bad indentation
- Long lines
- Mixed quote styles

### 4. `expected.css` - Clean output
Following style guide:
- Double quotes
- Properties ordered by type
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
- [ ] SCSS files also handled correctly

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