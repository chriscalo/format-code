# Design Validation Tasks

## Overview
This document provides a complete, autonomous validation plan for the Code Formatting Orchestrator design. Each proof of concept includes all necessary context, requirements, and success criteria for independent execution.

**CRITICAL: Document everything as you go.** The point is not just to validate that things work, but to create a comprehensive record of:
- What works and what doesn't
- Specific limitations discovered  
- Workarounds and alternative approaches
- Configuration details that work
- Plugin requirements identified
- Performance characteristics
- Edge cases and failure modes

This documentation becomes the foundation for implementation decisions and future maintenance.

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

**Success Criteria & Documentation:**
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

**Success Criteria & Documentation:**
- [ ] Each tool exits with code 0 and produces formatted output
- [ ] Output is different from input (proving formatting occurred)
- [ ] Malformed input produces non-zero exit code with helpful error message
- [ ] No tool crashes or hangs on test inputs
- **Document for each tool:**
  - Exact command-line syntax that works
  - Any installation issues or special requirements
  - Specific error messages for malformed input
  - Performance observations (speed, memory usage)
  - Any unexpected behavior or limitations
- **Create interface compatibility report** documenting which tools work as expected

### 3. **Formatting Rules via Plugins**
Can we get the desired formatting behavior?

**Target Style Guide:**

**Universal Rules (All Languages):**
- Indentation: 2 spaces (never tabs)
- Maximum line length: 80 characters  
- Line endings: Unix (\n)
- Blank line whitespace: must match surrounding context indentation

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
- [ ] Create configuration files for each tool to match style guide:
  - [ ] HTML: Create `.rehyperc.js` with 2-space indentation, 80-char line length
  - [ ] JavaScript: Create `.eslintrc.js` with semicolon: "error", quotes: "double", etc.
  - [ ] CSS/SCSS: Create `.stylelintrc.js` with property ordering and spacing rules
  - [ ] Markdown: Create remark config with consistent formatting options
  - [ ] YAML: Create `.yamlfmt` config with minimal quoting and 2-space indentation
  - [ ] JSON/JSONC: Create ESLint config extending jsonc rules for formatting
  - [ ] Python: Create `pyproject.toml` with ruff/black settings for quotes and line length

**Test Cases:**
Use these examples to verify each tool matches the style guide:

```javascript
// JavaScript test (should fix semicolons, quotes, trailing commas)
const obj={name:'test',items:[1,2,3,]};console.log(obj)
```

```css
/* CSS test (should fix property ordering, spacing, quotes) */
.test { color: red; position: absolute; margin: 0; font-family: 'Arial'; }
```

```html
<!-- HTML test (should fix attribute quotes, self-closing tags) -->
<div class=test id='item'><br><img src=test.jpg></div>
```

**Success Criteria & Documentation:**
- [ ] Each tool produces output matching style guide exactly
- **Create comprehensive style guide coverage report:**
  - [ ] Document which specific rules each tool can achieve
  - [ ] Document which rules cannot be achieved with existing plugins
  - [ ] Record exact configuration syntax that works
  - [ ] Note any conflicts between tools or unexpected interactions
  - [ ] Document performance impact of each configuration
- [ ] **Create coverage matrix** showing supported vs missing rules per tool
- [ ] **Document all configuration files** with comments explaining each setting
- [ ] **Identify and prioritize gaps** requiring custom plugin development

### 4. **Custom Plugins for Missing Rules**
Can we write plugins for rules that don't exist?

**Plugin Development Research:**
For each tool, determine plugin capabilities and create minimal examples:

**JavaScript (ESLint):**
- [ ] Create custom ESLint rule for any missing formatting requirements
- Example: Create rule to enforce specific spacing around operators
- Reference: https://eslint.org/docs/developer-guide/working-with-rules

**CSS/SCSS (Stylelint):**
- [ ] Create custom Stylelint plugin for property ordering by type
- Example: Plugin to enforce positioning → box-model → typography → visual order
- Reference: https://stylelint.io/developer-guide/plugins

**HTML (rehype):**
- [ ] Create rehype plugin for attribute ordering by type
- Example: Plugin to reorder attributes as structural → styling → behavior
- Reference: https://github.com/rehypejs/rehype/blob/main/doc/plugins.md

**Markdown (remark):**
- [ ] Create remark plugin for consistent formatting
- Example: Plugin to enforce consistent bullet characters in lists
- Reference: https://github.com/remarkjs/remark/blob/main/doc/plugins.md

**YAML (yamlfmt):**
- [ ] Research if yamlfmt supports plugins or if alternatives needed
- If no plugin support: document limitations and alternative approaches
- May require post-processing or different tool entirely

**JSON/JSONC (ESLint + jsonc):**
- [ ] Create ESLint rule for JSON-specific formatting if needed
- Extend existing jsonc plugin ecosystem

**Python (ruff/black):**
- [ ] Research ruff's extensibility for custom rules
- Black is intentionally non-configurable, so focus on ruff extensions
- Reference: https://github.com/charliermarsh/ruff#plugin-system

**Implementation Tasks:**
- [ ] For each gap identified in POC #3, write minimal plugin
- [ ] Test plugin integration with existing configurations
- [ ] Verify plugins work in isolation and combined with other rules
- [ ] Create plugin development template for future extensions

**Success Criteria & Documentation:**
- [ ] All style guide requirements achievable through tools + custom plugins
- **Document plugin development findings:**
  - [ ] Record plugin development complexity for each tool
  - [ ] Document specific APIs and development patterns discovered
  - [ ] Note any limitations in plugin capabilities
  - [ ] Record integration challenges with existing configurations
  - [ ] Document build/deployment process for each plugin type
  - [ ] Note performance impact of custom plugins
- [ ] **Create plugin development guide** with examples and templates
- [ ] **Document maintenance requirements** for each custom plugin
- [ ] **Create final coverage report** showing 100% style guide compliance

### 5. **HTML Embedded Languages (rehype)**
Can we format JS and CSS inside HTML?

**Test Case:**
Create this HTML file for testing:
```html
<!DOCTYPE html>
<html>
<head>
  <style>
.test{color:red;position:absolute;margin:0}
  </style>
</head>
<body>
  <script>
const obj={name:'test',items:[1,2,3,]};console.log(obj);
  </script>
</body>
</html>
```

**Implementation Steps:**
- [ ] Create rehype plugin to detect `<script>` and `<style>` elements
- [ ] Extract content from these elements, preserving original indentation context
- [ ] Pass extracted JavaScript to ESLint for formatting (using config from POC #3)
- [ ] Pass extracted CSS to Stylelint for formatting (using config from POC #3)
- [ ] Reinsert formatted content back into HTML structure
- [ ] Process with rehype-format for overall HTML formatting

**Verification Tests:**
- [ ] Extract JS from `<script>` and format standalone with same ESLint config
- [ ] Extract CSS from `<style>` and format standalone with same Stylelint config  
- [ ] Compare embedded formatting output with standalone formatting output
- [ ] Results must be identical (proving embedding parity)

**Success Criteria & Documentation:**
- [ ] rehype successfully identifies all `<script>` and `<style>` blocks
- [ ] Content extraction and reinsertion preserves HTML structure
- [ ] Embedded JavaScript matches standalone ESLint formatting exactly
- [ ] Embedded CSS matches standalone Stylelint formatting exactly
- [ ] Overall HTML formatting remains valid and properly structured
- **Document embedding coordination findings:**
  - [ ] Record exact rehype plugin implementation that works
  - [ ] Document any content extraction edge cases discovered
  - [ ] Note any HTML structure preservation issues
  - [ ] Record performance characteristics of embedding process
  - [ ] Document any parity violations and their causes
  - [ ] Note any limitations in rehype's element traversal
- [ ] **Create embedding parity test results** with before/after examples
- [ ] **Document any workarounds** needed for content preservation


### 6. **Advanced HTML Features**
Can we handle inherited indentation and combined line lengths in HTML?
- [ ] Calculate and apply inherited indentation from HTML context
- [ ] Calculate and apply effective line width (maxWidth - indentOffset) for embedded content
- [ ] Format embedded JS/CSS with adjusted width constraints
- [ ] Reapply uniform indentation to formatted embedded content
- [ ] Test deeply nested HTML with embedded code
- [ ] Verify combined formatting meets style guide rules for all languages
- **Document advanced coordination findings:**
  - [ ] Record indentation calculation algorithms that work
  - [ ] Document effective width calculation edge cases  
  - [ ] Note any issues with deeply nested scenarios
  - [ ] Record performance impact of width constraint calculations
  - [ ] Document any style guide violations in complex scenarios
- [ ] **Create advanced embedding test results** with complex nesting examples

### 7. **Markdown Embedded Languages (remark)**
Can we format code blocks in Markdown?

**Test Case:**
Create this Markdown file for testing:
````markdown
# Test Document

JavaScript example:
```javascript
const obj={name:'test',items:[1,2,3,]};console.log(obj);
```

CSS example:
```css
.test{color:red;position:absolute;margin:0}
```

Python example:
```python
def test():
    return"hello"
```

YAML example:
```yaml
name: value
items: [1,2,3]
```
````

**Implementation Steps:**
- [ ] Create remark plugin to detect fenced code blocks by language
- [ ] Extract content from code blocks, preserving fence syntax and info strings
- [ ] Route each language to appropriate formatter (ESLint, Stylelint, ruff, yamlfmt, etc.)
- [ ] Format extracted content using same configs from POC #3
- [ ] Reinsert formatted content back into code blocks
- [ ] Process with remark-stringify for overall Markdown formatting

**Verification Tests:**
- [ ] Extract each code block and format standalone with same tool configs
- [ ] Compare embedded formatting output with standalone formatting output  
- [ ] Results must be identical for all languages (proving embedding parity)
- [ ] Verify fence syntax and language info strings are preserved

**Success Criteria & Documentation:**
- [ ] remark successfully identifies all fenced code blocks by language
- [ ] Content extraction and reinsertion preserves fence structure and info strings
- [ ] All embedded languages match their standalone formatting exactly
- [ ] Overall Markdown formatting remains valid and properly structured
- **Document markdown embedding findings:**
  - [ ] Record exact remark plugin implementation that works
  - [ ] Document language detection and routing logic
  - [ ] Note any fence preservation edge cases
  - [ ] Record performance with multiple embedded languages
  - [ ] Document any parity violations and their causes
- [ ] **Create markdown embedding test results** with all language examples


### 8. **Advanced Markdown Features** 
Can we handle inherited indentation and combined line lengths in Markdown?

**Test Cases:**
Create these complex Markdown scenarios:

````markdown
# Complex Nesting Test

1. Nested list with code:
   ```javascript
   const deeply={nested:{code:'here'}};console.log(deeply);
   ```

   - Sublist with more code:
     ```css
     .deeply-nested{position:absolute;color:red;margin:0}
     ```

> Blockquote with code:
> ```python
> def quoted_function():
>     return"formatted properly"
> ```

2. **Triple embedding** (critical test):
   ```html
   <div>
     <style>
   .test{color:red;position:absolute;margin:0}
     </style>
     <script>
   const obj={name:'test',items:[1,2,3,]};console.log(obj);
     </script>
   </div>
   ```
````

**Implementation Steps:**
- [ ] Calculate inherited indentation from Markdown context (lists, quotes, nested structures)
- [ ] Calculate effective line width accounting for Markdown indentation
- [ ] Format embedded code blocks with adjusted width constraints
- [ ] Handle triple embedding: Markdown → HTML → JS/CSS coordination
- [ ] Reapply uniform indentation maintaining Markdown structure
- [ ] Test with deeply nested scenarios (lists in quotes with code blocks)

**Verification Tests:**
- [ ] Verify indentation calculations for various nesting levels
- [ ] Test width constraints with very narrow effective widths
- [ ] Validate triple embedding produces correct results at all levels
- [ ] Compare complex scenarios with equivalent standalone formatting

**Success Criteria & Documentation:**
- [ ] All indentation calculations preserve Markdown structure
- [ ] Width constraints work correctly even with deep nesting
- [ ] Triple embedding (Markdown → HTML → JS/CSS) works flawlessly
- [ ] Complex scenarios maintain style guide compliance for all languages
- **Document advanced markdown coordination findings:**
  - [ ] Record indentation calculation algorithms for Markdown contexts
  - [ ] Document effective width handling with extreme constraints
  - [ ] Note any triple embedding challenges and solutions
  - [ ] Record performance impact of complex nesting scenarios
  - [ ] Document any edge cases where formatting breaks down
- [ ] **Create complex markdown test results** proving orchestrator concept works
- [ ] **Final validation report:** Complete multi-language coordination success
