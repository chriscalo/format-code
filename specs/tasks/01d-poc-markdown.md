# POC: Markdown Formatter (remark/remark-stringify)

## Task Context
This task is part of the formatter POC validation suite. Your goal is to build and test a working Markdown formatter.

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

## Success Criteria
- [ ] CLI wrapper accepts stdin and outputs to stdout
- [ ] All tests pass (or document known limitations)
- [ ] Style guide compliance demonstrated
- [ ] Real formatting example working
- [ ] Code blocks preserved correctly

## References
- [Style Guide](../../STYLE_GUIDE.md)
- [Technical Requirements](../technical-requirements.md)