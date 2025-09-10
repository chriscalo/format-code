# YAML Formatter Test Results

## Summary

Tested two alternative YAML formatters that preserve comments (unlike js-yaml):

### 1. YAWN-YAML Results

**Tests Passed:** 3/6 (50%)

✅ **Preserves comments** - Successfully maintains all comment types
✅ **Handles invalid YAML with error** - Properly reports malformed YAML
✅ **Maintains consistent 2-space indentation** - Proper nesting preserved

❌ **Formats input.yaml to match expected.yaml** - Does not clean up spacing/formatting well
❌ **Preserves key order** - Leaves trailing whitespace
❌ **Cleans up messy formatting** - Does not normalize spacing

**Issues:**
- Does not clean up spacing effectively
- Preserves original whitespace too literally
- Cannot properly reformat messy YAML while preserving comments

### 2. eemeli/yaml Results  

**Tests Passed:** 4/6 (67%)

✅ **Preserves comments** - Successfully maintains all comment types
✅ **Preserves key order** - Original key order maintained
✅ **Handles invalid YAML with error** - Properly reports malformed YAML
✅ **Maintains consistent 2-space indentation** - Proper nesting preserved

❌ **Formats input.yaml to match expected.yaml** - Issues with path formatting (adds quotes)
❌ **Cleans up messy formatting** - Does not fully normalize quotes/spacing

**Issues:**
- Adds quotes to paths like `./src:/app/src` → `"./src:/app/src"`
- Doesn't fully clean up messy spacing/quotes as expected

## Verdict

**Winner: eemeli/yaml** 🏆

While neither library perfectly matches our expected formatting, **eemeli/yaml** performs better overall:

1. **Better test pass rate** - 67% vs 50%
2. **Cleaner output** - Does basic formatting while preserving comments
3. **More predictable behavior** - Consistent quote handling
4. **Active maintenance** - Modern ESM-compatible library

### Recommendation

Use **eemeli/yaml** as the YAML formatter for the project. While it has minor formatting quirks (like adding quotes to certain paths), it successfully:
- Preserves all comment types (document, line, inline)
- Maintains key order
- Provides consistent indentation
- Handles errors gracefully

The quote handling issue can be addressed with custom post-processing if needed, or accepted as a reasonable trade-off for comment preservation.

### Original js-yaml Issue

For reference, the original js-yaml library tested in `/workspace/01-tool-research/yaml/` **cannot preserve comments at all**, which is a fundamental limitation that makes it unsuitable despite otherwise good formatting capabilities.