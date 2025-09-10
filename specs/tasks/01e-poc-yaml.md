# POC: YAML Formatter (eemeli/yaml)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working YAML formatter that preserves comments.

## CRITICAL: PASSING TESTS ARE MANDATORY
**THE ONLY ACCEPTABLE OUTCOME IS PASSING TESTS**

1. **First check** if `workspace/01e-poc-yaml/`, `workspace/01-tool-research/yaml/`, or `workspace/01-tool-research/yaml-alternatives/` exists
2. **If tests exist**: Run them
   - ✅ If tests meet or exceed 67% pass rate (4/6 tests) → Mark task as done
   - ❌ If tests fail below 67% → YOU MUST fix them or find better solution
3. **If no tests exist**: Create the POC from scratch
4. **MINIMUM REQUIREMENT**: 67% pass rate (4/6 tests) as documented
5. **DO NOT** mark task done if below 67% pass rate
6. **ALWAYS** document your fixes and final success at the bottom of this file

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