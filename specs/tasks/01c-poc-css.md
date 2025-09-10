# POC: CSS/SCSS Formatter (Stylelint)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working CSS/SCSS formatter.

## IMPORTANT: Check Existing Work First
1. **First check** if `workspace/01c-poc-css/` or `workspace/01-tool-research/css/` exists
2. **If tests exist**: Run them and analyze results
   - If all tests pass → Mark task as done, document success in this file
   - If tests fail → Debug and fix them, document the fixes
3. **If no tests exist**: Create the POC from scratch following requirements below
4. **Always document** your findings and outcomes at the bottom of this file

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

## Success Criteria
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] All tests pass (or document known limitations)
- [ ] Style guide compliance demonstrated
- [ ] Real formatting example working
- [ ] SCSS files also handled correctly

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)

## Task Execution Log
<!-- Document your findings below this line -->
### Status: [Update with PENDING/WORKING/DONE]
### Findings:
<!-- Add your analysis, test results, and any fixes made here -->