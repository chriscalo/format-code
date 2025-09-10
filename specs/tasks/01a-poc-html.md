# POC: HTML Formatter (rehype/rehype-format)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to build and test a working HTML formatter.

## Tool Selection
**HTML**: rehype/rehype-format
- Can intercept `<script>`/`<style>` blocks via plugins
- Supports configuration options (blanks, indent)
- Active plugin ecosystem, unified AST transformation

## Installation
`npm install rehype rehype-format rehype-parse rehype-stringify unified`

## POC Requirements

Create `workspace/01a-poc-html/` with:

### 1. `format-html.js` - CLI wrapper
- Use rehype programmatically
- Accept stdin input
- Output to stdout
- Handle errors gracefully

### 2. `format-html.test.js` - Test suite
Validate:
- XHTML self-closing tags (`<br />`, `<img />`)
- Attribute quoting (all attributes must be quoted)
- 80-character line width
- Consistent indentation

### 3. `input.html` - Messy sample
Include:
- Unquoted attributes
- Non-self-closing void elements
- Inconsistent spacing
- Long lines

### 4. `expected.html` - Clean output
Following style guide:
- All attributes quoted
- Self-closing tags for void elements
- Proper indentation
- Lines wrapped at 80 chars

### 5. `README.md` - Documentation
Document:
- How to run the formatter
- Test results
- Any limitations discovered
- Configuration used

## Success Criteria
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] All tests pass (or document known limitations)
- [ ] Style guide compliance demonstrated
- [ ] Real formatting example working

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)