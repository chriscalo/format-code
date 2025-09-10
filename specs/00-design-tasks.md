# Design Validation Tasks

## Overview
This directory contains autonomous validation tasks for the Code Formatting Orchestrator design. Each task is split into a separate file for focused context management.

**CRITICAL: Document everything as you go.** The point is not just to validate that things work, but to create a comprehensive record of findings and implementation decisions.

## Task Sequence
Execute tasks in order - each builds on previous results:

1. **[Tool Research](tasks/01-tool-research.md)** - Research tools before installation
2. **[stdio Validation](tasks/02-stdio-validation.md)** - Test stdin/stdout interfaces  
3. **[Basic Orchestrator](tasks/03-basic-orchestrator.md)** - Build core framework
4. **[Context Preservation](tasks/04-context-preservation.md)** - Implement indentation system
5. **[HTML Embedding](tasks/05-html-embedding.md)** - Script/style block formatting
6. **[Markdown Embedding](tasks/06-markdown-embedding.md)** - Code block formatting  
7. **[Parity Validation](tasks/07-parity-validation.md)** - Ensure identical formatting
8. **[Integration Testing](tasks/08-integration-testing.md)** - Real-world scenarios

## Project Context

### Target Languages and Tools
- **HTML**: rehype + rehype-format  
- **JavaScript**: ESLint + js-beautify
- **CSS/SCSS**: Stylelint
- **Markdown**: remark + remark-stringify
- **YAML**: yamlfmt
- **JSON/JSONC**: ESLint + jsonc-eslint-parser  
- **Python**: ruff + black

### Shared Context

All tasks share these common requirements and preferences:

**Style Guide (referenced in all tasks):**
- Indentation: 2 spaces, line length: 80 characters
- JavaScript: semicolons always, double quotes, multiline trailing commas
- CSS: double quotes, property ordering by type  
- HTML: always quote attributes, XHTML self-closing tags
- Python: double quotes
- YAML: minimal quoting
- JSON: preserve key order
- Blank line whitespace: match surrounding context indentation

**Technical Requirements:**
- stdin/stdout interface preferred for all formatters
- Embedding parity: byte-for-byte identical formatting (embedded vs standalone)
- Context preservation: effective width = max(40, maxWidth - indentOffset)
- Parse failure handling: system must work with malformed input
- Performance: investigate streaming vs buffering approaches

See individual task files for detailed implementation steps and test cases.