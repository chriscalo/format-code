# POC: YAML Formatter (eemeli/yaml)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working YAML formatter that preserves comments.

## Common Requirements
**IMPORTANT**: Follow all requirements in [poc-requirements.md](./poc-requirements.md)
- Tool usage rules (zero approvals goal)
- NPM scripts philosophy (reuse, don't proliferate)
- Test requirements (all must pass)
- Code organization (one formatter, one test file)

## Task-Specific Requirements
- **Check folders**: `workspace/01e-poc-yaml/`, `workspace/01-tool-research/yaml/`, or `workspace/01-tool-research/yaml-alternatives/`
- **Run tests**: Use `npm test`
- **Special acceptance criteria**: 67% pass rate (4/6 tests) acceptable for YAML due to comment preservation challenges
- **Document results** at the bottom of this file

## Tool Selection
**YAML**: eemeli/yaml (winner after testing 3 libraries)
- Preserves all comment types via parseDocument API
- Good formatting capabilities
- Active maintenance

**Rejected Alternatives**:
- js-yaml: Cannot preserve comments (deal-breaker)
- YAWN-YAML: Poor formatting capabilities

## Installation
`npm install yaml` (note: package name is 'yaml', not 'eemeli-yaml')

## POC Requirements

Create `workspace/01e-poc-yaml/` with:

### 1. `format-yaml.js` - CLI wrapper
- Use eemeli/yaml parseDocument API
- Accept stdin input
- Output to stdout
- Preserve all comments
- Handle errors gracefully

### 2. `format-yaml.test.js` - Test suite
Validate:
- Comment preservation (document, line, inline)
- Key order preservation
- Consistent 2-space indentation
- 80-character line width
- Invalid YAML error handling

### 3. `input.yaml` - Messy sample
Include:
- Various comment types
- Inconsistent indentation
- Long lines
- Mixed quoting styles
- Comments to preserve

### 4. `expected.yaml` - Clean output
Following style guide:
- All comments preserved
- Original key order maintained
- 2-space indentation
- Lines wrapped at 80 chars

### 5. `README.md` - Documentation
Document:
- How to run the formatter
- Test results (expect 67% pass rate as documented)
- Known issues (quote normalization)
- Configuration used

## Configuration Options
```javascript
{
  indent: 2,           // Consistent indentation
  lineWidth: 80,       // Line wrapping
  quotingType: '"',    // Quote style
  keepSourceTokens: true // Comment preservation
}
```

## Success Criteria (ALL REQUIRED)
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] Comments are preserved (critical requirement)
- [ ] **MINIMUM 4/6 tests passing (67% threshold)**
- [ ] Document quote normalization issues (acceptable trade-off)

## Known Issues
- Adds quotes to certain paths (e.g., `./src` → `"./src"`)
- Minor quote normalization issues
- These are acceptable trade-offs for comment preservation

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)

## Task Execution Log
<!-- Document your findings below this line -->
### Status: [Update with PENDING/WORKING/DONE]
### Test Results: [Update with X/6 tests passing]
### Findings:
<!-- Document ALL test results. If below 67% (4/6), document how you fixed or found alternative.
Acceptable: 4/6 passing with quote normalization issues documented. -->