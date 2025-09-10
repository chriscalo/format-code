# Design Validation Tasks

## Overview
This document provides a complete, autonomous validation plan for the Code Formatting Orchestrator design. Each proof of concept includes all necessary context, requirements, and success criteria for independent execution.

## Project Context

### Target Languages and Tools
- **HTML**: rehype + rehype-format  
- **JavaScript**: ESLint + js-beautify
- **CSS/SCSS**: Stylelint
- **Markdown**: remark + remark-stringify
- **YAML**: yamlfmt
- **JSON/JSONC**: ESLint + jsonc-eslint-parser  
- **Python**: ruff + black

### Core Requirements (from specs/02-requirements.md)
**Tool Selection Criteria - Must Have:**
- **Configurability**: Deep control over indentation, line wrapping, quotes, semicolons, trailing commas, blank line handling, attribute wrapping
- **Plugin support**: Community ecosystem + ability to extend with custom rules
- **Integration**: Prefer stdin/stdout model
- **Platform compatibility**: Must run on macOS  
- **Sustainability**: Open source, actively maintained, good documentation
- **Unopinionated**: Avoid overly rigid tools (e.g., Prettier-style rigidity)

**Deal-breakers:**
- Cannot run on macOS → automatic rejection
- No stdin/stdout support AND no API alternative → rejection  
- Overly rigid with no configurability → rejection
- No plugin ecosystem AND gaps in required formatting rules → rejection

### Architecture Requirements
- **Embedding parity**: Embedded code must format identically to standalone
- **Context preservation**: Inherit indentation, calculate effective width = maxWidth - indentOffset  
- **Multi-language coordination**: HTML hosts JS/CSS, Markdown hosts all languages
- **Boundary discipline**: Host tools format boundaries, inner tools format content

---

## Progressive Proof of Concepts

Start with the most basic pieces and build up confidence that the design approach will work.

### 1. **Tool Research and Feasibility**
Which tools actually do what we need before we bother installing them?

**Research Methodology:**
1. Check official documentation for configuration options and plugin support
2. Look for stdin/stdout examples in docs or GitHub issues
3. Verify macOS compatibility and installation methods
4. Check maintenance status (recent commits, active issues)
5. Look for plugin ecosystems and extensibility examples

**For each tool, verify:**
- [ ] **HTML**: Research rehype/rehype-format capabilities and plugin ecosystem
  - Can rehype plugins intercept `<script>`/`<style>` blocks?  
  - Does rehype-format support configuration options?
  - Active plugin ecosystem for custom formatting rules?
- [ ] **JavaScript**: Research ESLint + js-beautify stdin/stdout support and extensibility  
  - ESLint supports stdin/stdout formatting?
  - js-beautify has width/wrapping configuration?
  - Can write custom ESLint rules easily?
- [ ] **CSS/SCSS**: Research Stylelint plugin development and formatting capabilities
  - Stylelint --fix works via stdin/stdout?
  - Plugin ecosystem for custom formatting rules?
  - Supports SCSS syntax and configuration?
- [ ] **Markdown**: Research remark/remark-stringify plugin ecosystem
  - Can remark plugins process code blocks by language?
  - remark-stringify has formatting configuration options?
  - Active plugin ecosystem?
- [ ] **YAML**: Research yamlfmt extensibility and configuration options
  - yamlfmt supports stdin/stdout?
  - Configuration file options for formatting preferences?
  - Can be extended or configured for specific styles?
- [ ] **JSON/JSONC**: Research ESLint jsonc support and custom rule development
  - ESLint + jsonc-eslint-parser works via stdin/stdout?
  - Can write custom rules for JSON formatting?
  - Supports JSONC (comments) properly?
- [ ] **Python**: Research ruff/black plugin development and formatting control
  - ruff/black both support stdin/stdout?
  - Can ruff be extended with custom rules?
  - Configuration options for style preferences?

**Success Criteria:**
- Each tool must pass ALL deal-breaker criteria (macOS, stdin/stdout OR API, configurable, extensible)
- Document specific gaps where custom plugins will be needed
- Make go/no-go decision: proceed only with tools that meet core requirements

### 2. **Basic Tool Execution**  
Can each formatter meet our stdin/stdout interface requirements?

**Installation Commands:**
- HTML: `npm install rehype rehype-format`
- JavaScript: `npm install eslint js-beautify` 
- CSS/SCSS: `npm install stylelint`
- Markdown: `npm install remark remark-stringify`
- YAML: `brew install yamlfmt` or `go install github.com/google/yamlfmt/cmd/yamlfmt@latest`
- JSON/JSONC: `npm install eslint jsonc-eslint-parser eslint-plugin-jsonc`
- Python: `pip install ruff black`

**Test Cases:**
Use these minimal examples for stdin/stdout testing:

```html
<!-- HTML test -->
<html><body><div>test</div></body></html>
```

```javascript
// JavaScript test
const x=1;console.log(x)
```

```css
/* CSS test */
.test{color:red;margin:0}
```

```markdown
# Markdown test
This is **bold** text.
```

```yaml
# YAML test  
name: value
items: [1,2,3]
```

```json
{"name":"test","value":123}
```

```python
# Python test
def test():
    return"hello"
```

**Execution Tests:**
- [ ] Install only the tools that passed feasibility research
- [ ] Test stdin/stdout interface for each tool using test cases above:
  - [ ] HTML: `echo '<html><body><div>test</div></body></html>' | npx rehype-format`
  - [ ] JavaScript: `echo 'const x=1;console.log(x)' | npx eslint --stdin --fix`  
  - [ ] CSS/SCSS: `echo '.test{color:red;margin:0}' | npx stylelint --stdin --fix`
  - [ ] Markdown: `echo '# Test\nThis is **bold**.' | npx remark`
  - [ ] YAML: `echo -e 'name: value\nitems: [1,2,3]' | yamlfmt`
  - [ ] JSON/JSONC: `echo '{"name":"test","value":123}' | npx eslint --stdin --fix`
  - [ ] Python: `echo 'def test():    return"hello"' | black -` and `echo 'def test():    return"hello"' | ruff format -`

**Success Criteria:**
- [ ] Each tool exits with code 0 and produces formatted output
- [ ] Output is different from input (proving formatting occurred)
- [ ] Malformed input produces non-zero exit code with helpful error message
- [ ] No tool crashes or hangs on test inputs

### 3. **Formatting Rules via Plugins**
Can we get the desired formatting behavior?

**Target Style Guide:**

**Universal Rules (All Languages):**
- Indentation: 2 spaces (never tabs)
- Maximum line length: 80 characters  
- Line endings: Unix (\n)

**JavaScript:**
- Semicolons: always required
- Quotes: double quotes ("hello"), backticks for strings containing double quotes
- Trailing commas: multiline only
- Object/array formatting: consistent spacing

**CSS/SCSS:**
- Quotes: double quotes ("value")
- Property ordering: by type (positioning → box model → typography → visual)
- Spacing: consistent around colons and braces
- Selectors: one per line for multiple selectors

**HTML:**
- Attribute quotes: always quote values when present, bare attributes OK (hidden, disabled)
- Self-closing tags: XHTML style (`<br />`, `<img />`)
- Attribute ordering: by type (structural → styling → behavior)
- Indentation: nested elements properly indented

**Python:**
- String quotes: double quotes ("hello")
- Line continuation: proper indentation for wrapped lines
- Import ordering: standard library → third party → local

**YAML:**
- Quotes: minimal (only when required for special characters/spaces)
- Lists: consistent formatting (inline vs block based on length)
- Key ordering: preserve original order

**JSON/JSONC:**
- Key ordering: preserve original order (no alphabetical sorting)
- Quotes: always double quotes for keys and string values
- Arrays/objects: proper line breaks for readability

**Markdown:**
- List formatting: consistent bullet characters
- Code blocks: preserve language specification
- Link formatting: consistent style choice

**Implementation Tasks:**
- [ ] Configure each tool to match the style guide:
  - [ ] HTML: rehype-format options per style guide
  - [ ] JavaScript: ESLint rules per style guide
  - [ ] CSS/SCSS: Stylelint rules per style guide
  - [ ] Markdown: remark-stringify options per style guide
  - [ ] YAML: yamlfmt configuration per style guide
  - [ ] JSON/JSONC: ESLint + jsonc rules per style guide
  - [ ] Python: ruff/black configuration per style guide
- [ ] Test each tool against style guide and document coverage:
  - [ ] Record which style guide rules each tool can achieve
  - [ ] Document gaps where existing plugins fall short
  - [ ] Create coverage matrix showing what's supported vs missing

### 4. **Custom Plugins for Missing Rules**
Can we write plugins for rules that don't exist?
- [ ] Research plugin extensibility for each tool:
  - [ ] HTML: rehype plugin development capabilities
  - [ ] JavaScript: ESLint custom rule development
  - [ ] CSS/SCSS: Stylelint custom rule development
  - [ ] Markdown: remark plugin development capabilities
  - [ ] YAML: yamlfmt extensibility options (or alternative approaches)
  - [ ] JSON/JSONC: ESLint jsonc custom rule development
  - [ ] Python: ruff/black plugin development or alternative tools
- [ ] Write minimal custom plugins for coverage gaps identified in POC #3
- [ ] Test custom plugins integrate properly with existing toolchains
- [ ] Document plugin development process for future rule additions

### 5. **HTML Embedded Languages (rehype)**
Can we format JS and CSS inside HTML?
- [ ] Configure rehype to find `<script>` and `<style>` blocks and call our formatters
- [ ] Extract content, format with ESLint/Stylelint, reinsert
- [ ] Verify embedded formatting matches standalone formatting

### 6. **Advanced HTML Features**
Can we handle inherited indentation and combined line lengths in HTML?
- [ ] Calculate and apply inherited indentation from HTML context
- [ ] Calculate and apply effective line width (maxWidth - indentOffset) for embedded content
- [ ] Format embedded JS/CSS with adjusted width constraints
- [ ] Reapply uniform indentation to formatted embedded content
- [ ] Test deeply nested HTML with embedded code
- [ ] Verify combined formatting meets style guide rules for all languages

### 7. **Markdown Embedded Languages (remark)**
Can we format code blocks in Markdown?
- [ ] Configure remark to find fenced code blocks and call our formatters
- [ ] Format JS, CSS, YAML, JSON, HTML, Python code blocks
- [ ] Preserve fence syntax and info strings

<!-- REVIEW PROGRESS CURSOR -->

### 8. **Advanced Markdown Features** 
Can we handle inherited indentation and combined line lengths in Markdown?
- [ ] Calculate and apply inherited indentation from Markdown context (lists, quotes, etc.)
- [ ] Calculate and apply effective line width (maxWidth - indentOffset) for nested code blocks
- [ ] Format embedded code with adjusted width constraints
- [ ] Reapply uniform indentation to formatted code blocks
- [ ] Test deeply nested Markdown with embedded code blocks
- [ ] Test triple embedding: Markdown → HTML → JS/CSS (complex but critical scenario)
- [ ] Verify combined formatting meets style guide rules for all languages

