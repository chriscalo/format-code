# stdin/stdout Interface Validation

Test whether each formatter can meet the stdio goals identified in the research phase.

## Context
- Line length: 80 characters
- Indentation: 2 spaces
- This validates the interface requirements before building the orchestrator

## Validation Tests

### HTML: rehype-format
- [ ] Test `echo '<div><span>test</span></div>' | npx rehype --use rehype-format`
- [ ] Verify clean stdin/stdout with no file I/O required
- [ ] Document any limitations or configuration needs

### JavaScript: ESLint
- [ ] Test `echo 'const x={a:1,b:2}' | npx eslint --stdin --fix-dry-run`
- [ ] Verify ESLint can format via stdin (not just lint)
- [ ] Test Node API alternative if CLI doesn't work
- [ ] Document configuration requirements for formatting rules

### CSS/SCSS: Stylelint  
- [ ] Test `echo 'body{margin:0;padding:0}' | npx stylelint --stdin --fix`
- [ ] Test SCSS syntax support via stdin
- [ ] Verify --fix mode works through stdio
- [ ] Document plugin requirements for formatting rules

### Markdown: remark-stringify
- [ ] Test `echo '# test\n\ncode here' | npx remark`
- [ ] Verify remark can process and format via stdin/stdout
- [ ] Test that code block content is preserved (not formatted by remark)
- [ ] Document configuration for consistent output

### YAML: yamlfmt
- [ ] Test `echo 'key: value\nother:   data' | yamlfmt`
- [ ] Verify stdin/stdout support works correctly
- [ ] Test configuration file detection and usage
- [ ] Document installation and configuration requirements

### JSON/JSONC: ESLint + jsonc-eslint-parser
- [ ] Test `echo '{"a":1,"b":2}' | npx eslint --stdin --parser @typescript-eslint/parser`
- [ ] Verify JSONC (with comments) support
- [ ] Test key order preservation capabilities
- [ ] Document ESLint rule configuration for JSON formatting

### Python: ruff/black
- [ ] Test `echo 'def f():return 1' | black -`
- [ ] Test `echo 'def f():return 1' | ruff format -`
- [ ] Compare output consistency between tools
- [ ] Document which tool provides better configuration options

## Success Criteria
- Each tool must accept stdin and produce stdout
- No temporary file creation required
- Clean error handling for malformed input
- Consistent output formatting according to our style preferences

## Documentation Requirements
Document for each tool:
- Exact command syntax that works
- Configuration file requirements
- Any stdio limitations discovered
- Alternative approaches if primary method fails
- Installation commands and version pinning