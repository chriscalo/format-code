# POC: Python Formatter (ruff)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to validate or build a working Python formatter.

## CRITICAL: PASSING TESTS ARE MANDATORY
**THE ONLY ACCEPTABLE OUTCOME IS ALL TESTS PASSING**

1. **First check** if `workspace/01g-poc-python/` or `workspace/01-tool-research/py/` exists
2. **If tests exist**: Run them
   - ✅ If ALL tests pass → Mark task as done, document success
   - ❌ If ANY test fails → YOU MUST fix them until ALL pass
3. **If no tests exist**: Create the POC from scratch
4. **DO NOT** mark task as done with failing tests
5. **DO NOT** document "known limitations" as an excuse for failures
6. **ALWAYS** document your fixes and final success at the bottom of this file

## Tool Selection
**Python**: ruff (recommended)
- 30x faster than Black (Rust-based)
- 800+ built-in rules
- Comprehensive configuration

**Alternative**: black (if extensibility becomes critical)

## Installation
Python tool (not npm): `pip install ruff`

## POC Requirements

Create `workspace/01g-poc-python/` with:

### 1. `format-py.js` - Node.js CLI wrapper
- Spawn ruff subprocess with --stdin-filename
- Accept stdin input
- Output to stdout
- Handle errors gracefully

### 2. `format-py.test.js` - Test suite
Validate:
- Double quotes for strings
- Line length 80 characters
- Proper indentation (4 spaces)
- PEP 8 compliance
- Import sorting

### 3. `input.py` - Messy sample
Include:
- Single quotes
- Long lines
- Bad indentation
- Unsorted imports
- Style violations

### 4. `expected.py` - Clean output
Following style guide:
- Double quotes
- 80-char line limit
- PEP 8 compliant
- Sorted imports

### 5. `README.md` - Documentation
Document:
- How to run the formatter
- Test results
- Ruff vs Black comparison
- Configuration used (pyproject.toml)

## Configuration
Create `pyproject.toml`:
```toml
[tool.ruff]
line-length = 80
quote-style = "double"
indent-style = "space"

[tool.ruff.format]
quote-style = "double"
```

## Success Criteria (ALL REQUIRED)
- [ ] Node.js wrapper spawns Python subprocess correctly
- [ ] **ALL tests pass - NO EXCEPTIONS**
- [ ] Style guide compliance fully demonstrated
- [ ] Real formatting example working correctly

## Notes
- No plugin system (limitation)
- But 800+ built-in rules cover most needs
- Extremely fast performance

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