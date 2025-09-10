# YAML Alternatives Research

This directory contains research and POCs for YAML formatters that preserve comments, addressing the limitation found with js-yaml.

## Findings Summary

### js-yaml Limitation
- ❌ Cannot preserve comments (fundamental library limitation)
- ❌ Strips all comments during parse/dump cycle

### YAWN-YAML
- ✅ Preserves comments and original styling
- ❌ Limited formatting capabilities (preserves original spacing/indentation)
- ✅ Good for value editing while preserving structure
- ❌ Not suitable for comprehensive reformatting

### eemeli/yaml ⭐ **RECOMMENDED**
- ✅ **Perfect comment preservation** (both line and inline comments)
- ✅ **Comprehensive formatting control** via document options
- ✅ **Full stdin/stdout support**
- ✅ **Active maintenance** (latest update: 1 month ago)
- ✅ **All tests passing** (6/6)

## POC Results

### eemeli/yaml Implementation
**Files:**
- `format-yaml-eemeli.js` - CLI formatter using eemeli/yaml
- `format-yaml-eemeli.test.js` - Comprehensive test suite
- `input.yaml` - Test input with comments and formatting issues
- `expected.yaml` - Expected clean output
- `output-eemeli.yaml` - Actual formatted output

**Test Results:** ✅ 6/6 tests passing
- ✅ Comment preservation (document, line, and inline)
- ✅ Indentation normalization
- ✅ Value spacing normalization  
- ✅ stdin/stdout operation
- ✅ Error handling
- ✅ Output format validation

**Formatting Applied:**
- 2-space indentation
- 80-character line width
- Normalized spacing around values
- Proper comment preservation
- Maintains double quotes when needed
- Final newline added

## Recommendation

**Use `eemeli/yaml` (npm package: `yaml`) as the YAML formatter solution.**

**Rationale:**
1. **Complete comment preservation** - solves the js-yaml limitation
2. **Professional formatting control** - comprehensive options for style guide compliance
3. **Robust implementation** - handles edge cases and errors gracefully
4. **Active development** - regular updates and maintenance
5. **Proven functionality** - all POC tests passing

**Installation:** `npm install yaml`

**Command line usage:**
```bash
cat input.yaml | node format-yaml-eemeli.js > output.yaml
```

This solution fully addresses the YAML comment preservation requirement identified in the original research.