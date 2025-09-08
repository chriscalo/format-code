# Code Formatting Orchestrator - GitHub Copilot Instructions

**CRITICAL**: Always follow these instructions first and only fallback to additional search and context gathering if the information in the instructions is incomplete or found to be in error.

## Repository Overview

This repository contains a **multi-tool orchestrator framework** for formatting code that handles languages embedded within other languages (HTML with CSS/JS, Markdown with code blocks, etc.). The project is currently in **design phase** with comprehensive specifications but no implementation yet.

**Current State**: Design-only repository with detailed architectural specifications in `specs/` directory. No build system, dependencies, or source code exists yet.

## Working Effectively

### Understanding the Architecture
- **ALWAYS START HERE**: Read the complete design specifications:
  - `specs/overview.md` - High-level goals and design principles
  - `specs/requirements.md` - Detailed functional and non-functional requirements  
  - `specs/design.md` - Complete architectural design and implementation plan
- **Key Principle**: Multi-tool approach using best-in-class formatters orchestrated through a unified framework
- **Technology Stack**: Node.js with Unified ecosystem (rehype for HTML, remark for Markdown)

### Current Repository State - IMPORTANT
- **NO BUILD COMMANDS EXIST YET** - This is a design-phase repository
- **NO PACKAGE.JSON EXISTS** - Project structure needs to be bootstrapped
- **NO SOURCE CODE EXISTS** - Implementation must follow the architectural design in `specs/design.md`

### Bootstrapping the Project (When Implementation Begins)
Based on the design specifications, the project will require:

1. **Initialize Node.js project**:
   ```bash
   npm init -y
   # Set "type": "module" in package.json for ESM support
   ```

2. **Expected Dependencies** (from design.md):
   ```bash
   # Core orchestrator dependencies
   npm install rehype rehype-parse rehype-format remark remark-parse remark-stringify
   
   # Language-specific formatters
   npm install eslint stylelint yamlfmt
   npm install jsonc-eslint-parser eslint-plugin-jsonc
   
   # Optional formatting tools
   npm install js-beautify pretty-diff
   ```

3. **Expected Project Structure** (from design.md):
   ```
   scripts/format/
     index.js                         # CLI entry point
     config/
       orchestrator.config.js         # Main orchestrator config
       rehype.config.js               # HTML formatting config
       remark.config.js               # Markdown formatting config
     plugins/
       rehype-format-embedded.js      # HTML embedding handler
       remark-format-code-blocks.js   # Markdown code block handler
       unified-process-coordinator.js # Process coordination
     formatters/
       javascript.js                  # ESLint integration
       css.js                         # Stylelint integration
       yaml.js                        # yamlfmt integration
       json.js                        # JSON formatting
       html-inner.js                  # HTML in Markdown
     utils/
       files.js                       # File operations
       context-preservation.js        # Indentation handling
       embedding-parity.js            # Validation utilities
     tests/
       fixtures/                      # Test cases
   ```

4. **Expected NPM Scripts** (from design.md):
   ```json
   {
     "scripts": {
       "format": "node scripts/format/index.js",
       "format:html": "node scripts/format/index.js --only html",
       "format:md": "node scripts/format/index.js --only md", 
       "format:js": "node scripts/format/index.js --only js",
       "format:css": "node scripts/format/index.js --only css",
       "format:yaml": "node scripts/format/index.js --only yaml",
       "format:json": "node scripts/format/index.js --only json"
     }
   }
   ```

### Build and Test Commands (Future State)
**IMPORTANT**: These commands DO NOT WORK YET as no implementation exists.

Once implementation begins based on the design:
- **NEVER CANCEL**: Build and test commands may take 10-30 minutes. Set timeouts to 60+ minutes.
- `npm install` - Install dependencies (estimated: 5-10 minutes)
- `npm test` - Run test suite using Node.js native test runner (estimated: 5-15 minutes) 
- `npm run format` - Run the orchestrator on entire repository (estimated: 2-5 minutes)
- Individual language formatting: `npm run format:js`, `npm run format:html`, etc.

### Validation Scenarios (Once Implemented)
After making changes to the orchestrator, ALWAYS test these scenarios:
1. **HTML with embedded CSS/JS**: Create test HTML file with `<style>` and `<script>` blocks, verify formatting preserves embedding structure
2. **Markdown with code blocks**: Test fenced code blocks (```js, ```css, ```html) and verify inner content formats identically to standalone files
3. **Embedding parity**: Verify that code formatted inside embeddings is byte-for-byte identical to standalone formatting
4. **Round-trip stability**: Run formatter twice on same file, verify no changes on second run
5. **Indentation preservation**: Test embedded code at various indentation levels, verify proper reindentation

### Key Design Principles (Always Follow)
- **Inner tool ignorance**: Embedded formatters run as if on standalone files
- **Embedding parity**: Embedded code must format identically to standalone files
- **Outer context enforcement**: Orchestrator handles indentation and line width constraints
- **Boundary discipline**: Host formatters only normalize boundaries, never rewrite inner content
- **Plugin-driven extensibility**: Use rich plugin ecosystems, avoid writing custom formatters

### Important File Locations
- `/specs/` - Complete architectural specifications (READ THESE FIRST)
- `/specs/design.md` - Detailed implementation architecture
- `/specs/requirements.md` - Functional requirements and constraints
- `/specs/overview.md` - High-level project goals and scope

### Configuration Approach
- **Hierarchical config**: Main orchestrator config with per-tool native configs
- **Tool-specific configs**: `.eslintrc.*`, `.stylelintrc.*`, `.yamlfmt`, `.jsbeautifyrc`
- **Version pinning**: All formatter tools must be pinned for reproducible results

### Common Mistakes to Avoid
- **DO NOT** try to build or test - no implementation exists yet
- **DO NOT** create monolithic formatter - this is explicitly a multi-tool solution
- **DO NOT** ignore the design specifications - they contain complete architectural guidance
- **DO NOT** use Prettier - design specifically avoids overly rigid formatters
- **DO NOT** implement without reading `specs/design.md` first

### Platform Compatibility
- Primary target: macOS (specified in requirements)
- Must also work on Linux and Windows
- Node.js required for runtime

### Testing Strategy (Future Implementation)
- Golden fixtures for each language and embedding scenario
- Embedding parity validation (embedded vs standalone byte equality)
- Round-trip stability tests (idempotent formatting)
- Cross-platform testing on macOS and Linux
- Use Node.js native `node:test` runner

## Repository Navigation

### Quick Start for Understanding
1. Read `specs/overview.md` for project goals
2. Read `specs/requirements.md` for detailed requirements
3. Read `specs/design.md` for implementation architecture
4. Note that NO CODE EXISTS YET - this is design phase

### Project Status
- **Design**: ✅ Complete - comprehensive specifications exist
- **Implementation**: ❌ Not started - needs to be built according to design.md
- **Testing**: ❌ No tests exist yet
- **CI/CD**: ❌ No workflows exist yet

### When Making Changes
- Always reference the design specifications first
- Validate any new implementation against the architectural patterns in `specs/design.md`
- Ensure compliance with embedding parity and boundary discipline principles
- Test with the validation scenarios outlined above once implementation exists

**Remember**: This is a design-phase repository. Focus on understanding the specifications and implementing according to the detailed architectural plan in `specs/design.md`.