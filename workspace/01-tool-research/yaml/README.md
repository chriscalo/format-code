# YAML Formatter

This directory contains the YAML formatter POC for task 01-tool-research.

## Files

- `format-yaml.js` - Custom CLI formatter using js-yaml
- `format-yaml.test.js` - Test suite using node:test
- `input.yaml` - Sample messy YAML input
- `expected.yaml` - Expected clean output (with comments)

## Usage

```bash
# Format a file
cat input.yaml | node format-yaml.js > output.yaml

# Run tests
node --test format-yaml.test.js
```

## Test Results

**Status**: ✅ 4/5 tests passing

**Limitation Discovered**: js-yaml cannot preserve comments. This is a fundamental limitation that requires follow-up research for alternative YAML formatters.

**⚠️ RECOMMENDATION**: For comment preservation, use the `eemeli/yaml` library instead (see `../yaml-alternatives/` for working POC with 4/6 tests passing and full comment preservation).

**Working features**:
- ✅ stdin/stdout operation
- ✅ 2-space indentation
- ✅ Double quote handling (fixed)
- ✅ Error handling
- ✅ Key order preservation
- ✅ Clean formatting (spacing normalization)

**Failing features**:
- ❌ Comment preservation (js-yaml strips all comments)

## Formatting Rules Applied

- **Indentation**: 2 spaces
- **Line width**: 120 characters  
- **Style**: Block style (no flow style)
- **Key sorting**: Disabled (preserves original order)
- **Quotes**: Double quotes when needed
- **Comments**: ❌ Cannot preserve (js-yaml limitation)
