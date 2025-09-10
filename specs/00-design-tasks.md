# Design Validation Tasks

## Overview
This document identifies the parts of the Code Formatting Orchestrator design that are most likely to cause problems and outlines focused explorations and proof of concepts to verify they'll work as intended.

---

## Progressive Proof of Concepts

Start with the most basic pieces and build up confidence that the design approach will work.

### 1. **Tool Research and Feasibility**
Which tools actually do what we need before we bother installing them?
- [ ] **HTML**: Research rehype/rehype-format capabilities and plugin ecosystem
- [ ] **JavaScript**: Research ESLint + js-beautify stdin/stdout support and extensibility  
- [ ] **CSS/SCSS**: Research Stylelint plugin development and formatting capabilities
- [ ] **Markdown**: Research remark/remark-stringify plugin ecosystem
- [ ] **YAML**: Research yamlfmt extensibility and configuration options
- [ ] **JSON/JSONC**: Research ESLint jsonc support and custom rule development
- [ ] **Python**: Research ruff/black plugin development and formatting control
- [ ] Document which tools support: stdin/stdout, custom plugins, fine-grained configuration
- [ ] Make go/no-go decisions on tool selection before installation

### 2. **Basic Tool Execution**  
Can each formatter meet our stdin/stdout interface requirements?
- [ ] Install only the tools that passed feasibility research
- [ ] Test stdin/stdout interface for each tool:
  - [ ] HTML: rehype-format accepts content via stdin, outputs to stdout
  - [ ] JavaScript: ESLint + js-beautify work via stdin/stdout  
  - [ ] CSS/SCSS: Stylelint accepts stdin, outputs formatted CSS to stdout
  - [ ] Markdown: remark-stringify processes via stdin/stdout
  - [ ] YAML: yamlfmt works with stdin/stdout interface
  - [ ] JSON/JSONC: ESLint jsonc processes via stdin/stdout
  - [ ] Python: ruff/black accept stdin and output to stdout
- [ ] Verify clean exit codes (0 for success, non-zero for errors)
- [ ] Test error handling: malformed input produces helpful error messages

### 3. **Formatting Rules via Plugins**
Can we get the desired formatting behavior?
- [ ] Create target style guide document defining specific rules for every language
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

<!-- REVIEW PROGRESS CURSOR -->

### 6. **Advanced HTML Features**
Can we handle inherited indentation and combined line lengths in HTML?
- [ ] Calculate inherited indentation from HTML context
- [ ] Calculate effective line width (maxWidth - indentOffset) for embedded content
- [ ] Format embedded JS/CSS with adjusted width constraints
- [ ] Reapply uniform indentation to formatted embedded content
- [ ] Test deeply nested HTML with embedded code
- [ ] Verify combined formatting meets style guide rules for all languages

### 7. **Markdown Embedded Languages (remark)**
Can we format code blocks in Markdown?
- [ ] Parse Markdown with remark to find fenced code blocks
- [ ] Format JS, CSS, YAML, JSON, HTML code blocks
- [ ] Preserve fence syntax and info strings

### 8. **Advanced Markdown Features** 
Can we handle line lengths and contextual indentation in Markdown?
- [ ] Test formatting code blocks nested in lists/quotes
- [ ] Handle indentation context preservation
- [ ] Test complex embedding scenarios

