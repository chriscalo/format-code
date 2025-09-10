# POC: JSON/JSONC Formatter (ESLint + @eslint/json)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working JSON/JSONC formatter.

## IMPORTANT: Check Existing Work First
1. **First check** if `workspace/01f-poc-json/` or `workspace/01-tool-research/json/` exists
2. **If tests exist**: Run them and analyze results
   - If all tests pass → Mark task as done, document success in this file
   - If tests fail → Debug and fix them, document the fixes
3. **If no tests exist**: Create the POC from scratch following requirements below
4. **Always document** your findings and outcomes at the bottom of this file

## Tool Selection
**JSON/JSONC**: ESLint + @eslint/json (2024 official)
- Native ESLint stdin support
- Supports JSON, JSONC, JSON5
- Official ESLint plugin

**Alternative**: eslint-plugin-jsonc (more mature, more features)

## Installation
`npm install eslint @eslint/json` (requires ESLint v9.6.0+)

Or alternative:
`npm install eslint eslint-plugin-jsonc jsonc-eslint-parser`

## POC Requirements

Create `workspace/01f-poc-json/` with:

### 1. `format-json.js` - CLI wrapper
- Use ESLint + @eslint/json programmatically
- Accept stdin input
- Output to stdout
- Handle JSONC comments
- Handle errors gracefully

### 2. `format-json.test.js` - Test suite
Validate:
- Key order preservation
- JSONC comment preservation
- Consistent spacing
- Proper indentation
- Trailing comma handling

### 3. `input.json` - Messy sample
Include:
- Inconsistent spacing
- Unordered keys (verify preservation)
- Bad indentation
- For JSONC: include comments

### 4. `expected.json` - Clean output
Following style guide:
- Original key order preserved
- Consistent formatting
- Proper indentation
- Comments preserved (JSONC)

### 5. `README.md` - Documentation
Document:
- How to run the formatter
- Test results
- Choice between official vs jsonc plugin
- Configuration used

## Success Criteria
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] All tests pass (or document known limitations)
- [ ] Key order preserved (important!)
- [ ] JSONC comments handled correctly
- [ ] Real formatting example working

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)

## Task Execution Log
<!-- Document your findings below this line -->
### Status: [Update with PENDING/WORKING/DONE]
### Findings:
<!-- Add your analysis, test results, and any fixes made here -->