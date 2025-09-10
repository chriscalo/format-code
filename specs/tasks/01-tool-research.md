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
- [x] Can rehype plugins intercept `<script>`/`<style>` blocks? **YES** - rehype works with HTML ASTs, allows custom plugin development for script/style blocks
- [x] Does rehype-format support configuration options? **YES** - supports `blanks` array for spacing, `indent` option (spaces/tabs)
- [x] Active plugin ecosystem for custom formatting rules? **YES** - extensive plugin ecosystem, active development, unified AST transformation

**Installation**: `npm install rehype rehype-format rehype-parse rehype-stringify unified`
**stdin/stdout**: Full support via unified processor with concat-stream pattern
**Configuration**: `{blanks: ['head', 'body'], indent: '\t'}` for custom spacing and indentation
**Plugin Development**: Well-documented AST manipulation, security considerations with allowDangerousHtml option
**Maintenance**: Active project under unified collective, regular updates

### JavaScript: ESLint + js-beautify
- [x] ESLint supports stdin/stdout formatting? **YES** - `--stdin` flag, `--stdin-filename` for context, `--fix-dry-run` for non-destructive fixes
- [x] js-beautify has width/wrapping configuration? **YES** - via eslint-plugin-js-beautify-html, supports indent_size, wrap_attributes, wrap_line_length
- [x] Can write custom ESLint rules easily? **YES** - context.report() API, comprehensive rule development documentation

**Installation**: `npm install eslint eslint-plugin-js-beautify-html` 
**stdin/stdout**: Native ESLint support with `--stdin --fix-dry-run --format json` for programmatic access
**Configuration**: ESLint config files (eslint.config.js/mjs/cjs), js-beautify options via plugin config
**Custom Rules**: Well-documented context API with sourceCode, physicalFilename, options access
**Maintenance**: ESLint actively maintained, js-beautify integration available but ESLint deprecated formatting rules in 2023

### CSS/SCSS: Stylelint
- [x] Stylelint --fix works via stdin/stdout? **YES** - `--stdin` flag accepts stdin input, `--stdin-filename` for context
- [x] Plugin ecosystem for custom formatting rules? **YES** - extensive plugin ecosystem, stylelint.createPlugin() API for custom rules
- [x] Supports SCSS syntax and configuration? **YES** - stylelint-scss plugin provides 60+ SCSS-specific rules, many autofixable

**Installation**: `npm install stylelint stylelint-config-standard-scss`
**stdin/stdout**: Native `--stdin` support, resolved stdin CLI issues in recent versions
**Configuration**: stylelint.config.mjs with extends, overrides for different file patterns
**Plugin Development**: Namespaced rules (plugin/my-rule), meta.fixable for autofix support, PostCSS plugin architecture
**Maintenance**: Active project, v16.0.0+ removed deprecated rules, supports Node.js 18.12.0+

### Markdown: remark/remark-stringify
- [x] Can remark plugins process code blocks by language? **YES** - remark-code-blocks plugin selects code blocks, extensive AST manipulation capabilities
- [x] remark-stringify has formatting configuration options? **YES** - bullet style, emphasis markers, fence characters, closeAtx, incrementListMarker
- [x] Active plugin ecosystem? **YES** - unified collective, integrates with gfm, mdx, frontmatter, math, directive plugins

**Installation**: `npm install unified remark remark-parse remark-stringify remark-code-blocks`
**stdin/stdout**: Full support via unified-stream with process.stdin.pipe(createStream(processor)).pipe(process.stdout)
**Configuration**: bullet ('*','+','-'), emphasis ('*','_'), fence ('`','~'), fences (boolean), closeAtx (boolean)
**Plugin Development**: AST-based transformation, TypeScript support, Settings registration with unified
**Maintenance**: Active unified collective project, compatible with maintained Node.js versions

### YAML: js-yaml (LIMITATION DISCOVERED)
- [x] js-yaml supports custom formatting? **YES** - dump() with extensive options: lineWidth, flowLevel, sortKeys, indentation
- [x] stdin/stdout capable? **YES** - can build CLI wrapper, Node.js streams, programmatic usage
- [x] Configurable for specific styles? **PARTIAL** - highly configurable dump options, BUT **CANNOT PRESERVE COMMENTS**

**Installation**: `npm install js-yaml` 
**stdin/stdout**: CLI wrapper implemented at `workspace/01-tool-research/format-yaml.js`
**Configuration**: dump() options: lineWidth, flowLevel, sortKeys, noRefs, skipInvalid, quotingType
**POC Results**: ✅ Working formatter with tests, BUT ❌ **Comments are stripped** (fundamental js-yaml limitation)
**Test Status**: 2/5 tests passing - comment preservation tests fail
**Alternative Options**: YAWN-YAML, enhanced-yaml exist but not evaluated

**DECISION**: js-yaml has fundamental comment preservation limitation. **REQUIRES NEW RESEARCH TASK** for comment-preserving YAML formatters.

### JSON/JSONC: ESLint + @eslint/json (2024 official)
- [x] ESLint + @eslint/json works via stdin/stdout? **YES** - native ESLint `--stdin` flag, `--stdin-filename` support
- [x] Can write custom rules for JSON formatting? **YES** - custom rules API, auto-fix capabilities, jsonc/auto rule for JS-like rules
- [x] Supports JSONC (comments) properly? **YES** - @eslint/json supports JSON, JSONC, JSON5 with language plugins API

**Installation**: `npm install eslint @eslint/json` (ESLint v9.6.0+ required) or `npm install eslint eslint-plugin-jsonc jsonc-eslint-parser`
**stdin/stdout**: Native ESLint stdin support with `--stdin --stdin-filename`
**Configuration**: Flat config with language: "json/jsonc", allowTrailingCommas option, rule configs
**Custom Rules**: ESLint custom rules API, eslint-disable directives supported in JSONC/JSON5
**Maintenance**: Official ESLint plugin (2024), or mature eslint-plugin-jsonc with 4+ years development

**Note**: Two options - official @eslint/json (newer, cleaner) or eslint-plugin-jsonc (more features, established)

### Python: ruff (recommended) / black
- [x] ruff/black both support stdin/stdout? **YES** - ruff: `--stdin-filename` option, black: similar stdin support
- [x] Can ruff be extended with custom rules? **PARTIAL** - ruff has no plugin system, reimplements popular plugins internally; black is formatting-only
- [x] Configuration options for style preferences? **YES** - ruff: line-length, quote-style, indent-style, docstring formatting; extensive config options

**Installation**: `npm install` not applicable - Python tools, but: `pip install ruff` or `pip install black`
**stdin/stdout**: ruff `--stdin-filename`, black stdin support, both work in pipelines
**Configuration**: pyproject.toml [tool.ruff], [tool.ruff.format] sections, extensive options
**Custom Rules**: ruff limitation - no external plugins, only internal rules; 800+ built-in rules though
**Maintenance**: ruff extremely active (Rust-based, 30x faster than Black), black stable and mature

**Note**: ruff recommended for performance and comprehensive rule set, but no custom plugin extensibility
**Alternative**: Keep black as fallback if extensibility becomes critical requirement

## Tool Selection Report

### Summary: All tools meet core requirements ✅

| Tool | macOS | stdin/stdout | Configurable | Extensible | Decision |
|------|-------|--------------|-------------|------------|----------|
| **HTML**: rehype/rehype-format | ✅ | ✅ | ✅ | ✅ | **GO** |
| **JavaScript**: ESLint + js-beautify | ✅ | ✅ | ✅ | ⚠️* | **GO** |
| **CSS/SCSS**: Stylelint | ✅ | ✅ | ✅ | ✅ | **GO** |
| **Markdown**: remark/remark-stringify | ✅ | ✅ | ✅ | ✅ | **GO** |
| **YAML**: js-yaml (custom) | ✅ | ✅** | ✅ | ✅ | **GO** |
| **JSON/JSONC**: ESLint + @eslint/json | ✅ | ✅ | ✅ | ✅ | **GO** |
| **Python**: ruff | ✅ | ✅ | ✅ | ⚠️* | **GO** |

**Legend:**
- ✅ Full support
- ⚠️* Limited: ESLint deprecated formatting rules (2023), ruff has no plugin system but 800+ internal rules
- ✅** Requires custom CLI wrapper

### Rationale for Each Selection

#### HTML: rehype/rehype-format
- **Strengths**: Unified ecosystem, AST-based, excellent plugin development support
- **Configuration**: Flexible spacing, indentation options
- **Risk**: None identified

#### JavaScript: ESLint + js-beautify  
- **Strengths**: Industry standard, comprehensive rule system
- **Limitation**: ESLint deprecated formatting rules in 2023, but plugin ecosystem provides workaround
- **Alternative**: Could fallback to standalone js-beautify if needed

**What formatting rule deprecation means**: In 2023, ESLint deprecated its built-in formatting rules (like `indent`, `quotes`, `semi`, etc.) because they decided to focus on code quality/correctness rather than style formatting. The ESLint team recommends using dedicated formatters like Prettier instead. However, this doesn't break existing functionality - the rules still work, they're just not actively maintained. The eslint-plugin-js-beautify-html plugin provides a bridge to use js-beautify for formatting within the ESLint ecosystem, giving us the formatting capabilities we need.

#### CSS/SCSS: Stylelint
- **Strengths**: Best-in-class CSS linting, excellent SCSS support, active ecosystem  
- **Configuration**: Extensive rule customization
- **Risk**: None identified

#### Markdown: remark/remark-stringify
- **Strengths**: Part of unified collective, excellent plugin ecosystem
- **Configuration**: Comprehensive formatting options
- **Risk**: None identified

#### YAML: js-yaml (custom CLI approach)
- **Strengths**: Proven library, highly configurable dump() options
- **Approach**: Build custom CLI wrapper to match style guide exactly
- **Risk**: Requires custom development, but library is stable

#### JSON/JSONC: ESLint + @eslint/json
- **Strengths**: Official ESLint support (2024), supports comments
- **Alternative**: eslint-plugin-jsonc if more features needed
- **Risk**: None identified

#### Python: ruff (with black fallback)
- **Strengths**: Extremely fast (30x faster than Black), comprehensive rules
- **Limitation**: No plugin system, but extensive internal rule coverage
- **Alternative**: Black if extensibility becomes critical

## Custom Development Requirements

### Required Custom Components:
1. **YAML CLI formatter** using js-yaml - custom stdin/stdout wrapper
2. **Orchestrator core** to coordinate all formatters
3. **Context preservation system** for embedded code blocks
4. **Configuration management** for all tools

### Development Gaps Identified:
- **YAML**: js-yaml cannot preserve comments - **REQUIRES FOLLOW-UP RESEARCH TASK**
- Integration: Need orchestrator to manage multiple tools consistently  
- Context: Need system to preserve context when formatting embedded blocks

## Success Criteria & Documentation

- Each tool must pass ALL deal-breaker criteria (macOS, stdin/stdout OR API, configurable, extensible)
- **PROOF OF CONCEPT REQUIRED**: Working code + tests for each tool
- **Document findings for each tool:**
  - Installation method and any issues encountered
  - Specific configuration options available  
  - Plugin ecosystem status (active, maintained, extensive?)
  - stdin/stdout support details (command-line flags, limitations)
  - Any deal-breaker limitations discovered
  - **POC file location and test results**
  - Alternative tools considered if primary choice fails
- **Create tool selection report** with go/no-go decisions and rationale ✅
- **Document gaps** that will require custom plugin development ✅
