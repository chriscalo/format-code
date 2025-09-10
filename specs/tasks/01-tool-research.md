# Tool Research and Feasibility

Which tools actually do what we need before we bother installing them?

## Research Methodology

1. Check official documentation for configuration options and plugin support
2. Look for stdin/stdout examples in docs or GitHub issues
3. Verify macOS compatibility and installation methods
4. Check maintenance status (recent commits, active issues)
5. Look for plugin ecosystems and extensibility examples

## For each tool, verify:

### HTML: rehype/rehype-format
- [ ] Can rehype plugins intercept `<script>`/`<style>` blocks?  
- [ ] Does rehype-format support configuration options?
- [ ] Active plugin ecosystem for custom formatting rules?

### JavaScript: ESLint + js-beautify
- [ ] ESLint supports stdin/stdout formatting?
- [ ] js-beautify has width/wrapping configuration?
- [ ] Can write custom ESLint rules easily?

### CSS/SCSS: Stylelint
- [ ] Stylelint --fix works via stdin/stdout?
- [ ] Plugin ecosystem for custom formatting rules?
- [ ] Supports SCSS syntax and configuration?

### Markdown: remark/remark-stringify
- [ ] Can remark plugins process code blocks by language?
- [ ] remark-stringify has formatting configuration options?
- [ ] Active plugin ecosystem?

### YAML: yamlfmt
- [ ] yamlfmt supports stdin/stdout?
- [ ] Configuration file options for formatting preferences?
- [ ] Can be extended or configured for specific styles?

### JSON/JSONC: ESLint + jsonc-eslint-parser
- [ ] ESLint + jsonc-eslint-parser works via stdin/stdout?
- [ ] Can write custom rules for JSON formatting?
- [ ] Supports JSONC (comments) properly?

### Python: ruff/black
- [ ] ruff/black both support stdin/stdout?
- [ ] Can ruff be extended with custom rules?
- [ ] Configuration options for style preferences?

## Success Criteria & Documentation

- Each tool must pass ALL deal-breaker criteria (macOS, stdin/stdout OR API, configurable, extensible)
- **Document findings for each tool:**
  - Installation method and any issues encountered
  - Specific configuration options available
  - Plugin ecosystem status (active, maintained, extensive?)
  - stdin/stdout support details (command-line flags, limitations)
  - Any deal-breaker limitations discovered
  - Alternative tools considered if primary choice fails
- **Create tool selection report** with go/no-go decisions and rationale
- **Document gaps** that will require custom plugin development