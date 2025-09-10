# POC: Markdown Formatter (remark/remark-stringify)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working Markdown formatter.

## Common Requirements
**IMPORTANT**: Follow all requirements in [poc-requirements.md](./poc-requirements.md)
- Tool usage rules (zero approvals goal)
- NPM scripts philosophy (reuse, don't proliferate)
- Test requirements (all must pass)
- Code organization (one formatter, one test file)

## Task-Specific Requirements
- **Check folders**: `workspace/01d-poc-markdown/` or `workspace/01-tool-research/md/`
- **Run tests**: Use `npm test` - ALL must pass for task completion

## Tool Selection
**Markdown**: remark/remark-stringify
- Part of unified collective
- Can process code blocks by language
- Extensive configuration options

## Installation
`npm install unified remark remark-parse remark-stringify remark-code-blocks`

## POC Requirements

Create `workspace/01d-poc-markdown/` with:

### 1. `format-md.js` - CLI wrapper
- Use remark programmatically with unified processor
- Accept stdin input
- Output to stdout
- Handle errors gracefully

### 2. `format-md.test.js` - Test suite
Validate:
- Consistent bullet style (`-` for lists)
- Fence characters (triple backticks)
- Emphasis markers (`*` for bold/italic)
- 80-character line width
- Proper line breaks

### 3. `input.md` - Messy sample
Include:
- Mixed bullet styles (`*`, `+`, `-`)
- Inconsistent fencing (tildes vs backticks)
- Bad line wrapping
- Mixed emphasis markers

### 4. `expected.md` - Clean output
Following style guide:
- Consistent bullet style
- Triple backticks for code blocks
- Proper line breaks at 80 chars
- Consistent emphasis markers

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
- [ ] Code blocks preserved correctly

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