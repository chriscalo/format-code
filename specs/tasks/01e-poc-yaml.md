# POC: YAML Formatter (eemeli/yaml)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to build and test a working YAML formatter that preserves comments.

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

## Success Criteria
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] Comments are preserved (critical requirement)
- [ ] 4/6 tests passing (67% - known limitation)
- [ ] Document quote normalization issues

## Known Issues
- Adds quotes to certain paths (e.g., `./src` → `"./src"`)
- Minor quote normalization issues
- These are acceptable trade-offs for comment preservation

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)