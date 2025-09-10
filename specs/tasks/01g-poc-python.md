# POC: Python Formatter (ruff)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to build and test a working Python formatter.

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

## Success Criteria
- [ ] Node.js wrapper spawns Python subprocess correctly
- [ ] All tests pass (or document known limitations)
- [ ] Style guide compliance demonstrated
- [ ] Real formatting example working

## Notes
- No plugin system (limitation)
- But 800+ built-in rules cover most needs
- Extremely fast performance

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)