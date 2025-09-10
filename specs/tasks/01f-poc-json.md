# POC: JSON/JSONC Formatter (ESLint + @eslint/json)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working JSON/JSONC formatter.

## Common Requirements
**IMPORTANT**: Follow all requirements in [poc-requirements.md](./poc-requirements.md)
- Tool usage rules (zero approvals goal)
- NPM scripts philosophy (reuse, don't proliferate)
- Test requirements (all must pass)
- Code organization (one formatter, one test file)

## Task-Specific Requirements
- **Check folders**: `workspace/01f-poc-json/` or `workspace/01-tool-research/json/`
- **Run tests**: Use `npm test` - ALL must pass for task completion

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

## Success Criteria (ALL REQUIRED)
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] **ALL tests pass - NO EXCEPTIONS**
- [ ] Key order preserved (critical requirement!)
- [ ] JSONC comments handled correctly
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