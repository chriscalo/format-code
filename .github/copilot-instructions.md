# Code Formatting Orchestrator - GitHub Copilot Instructions

**CRITICAL**: Always follow these instructions first and only fallback to additional search and context gathering if the information in the instructions is incomplete or found to be in error.

## Repository Overview

This repository will contain a **multi-tool orchestrator framework** for formatting code that handles languages embedded within other languages (HTML with CSS/JS, Markdown with code blocks, etc.). The project is currently in **design phase** with unfinished specifications and no implementation yet.

**Current State**: Repository with unfinished architectural specifications in `specs/` directory. No build system, dependencies, or source code exists yet.

## Working Effectively

### Understanding the Architecture
- **ALWAYS START HERE**: Read the complete design specifications:
  - `specs/01-overview.md` - High-level goals and design principles
  - `specs/02-requirements.md` - Detailed functional and non-functional requirements  
  - `specs/03-design.md` - Complete architectural design and implementation plan
- **Key Principle**: Multi-tool approach using best-in-class formatters orchestrated through a unified framework
- **Technology Stack**: Node.js with Unified ecosystem (rehype for HTML, remark for Markdown)

### Current Repository State - IMPORTANT
- **NO SOURCE CODE EXISTS** - Implementation must follow the architectural design in `specs/03-design.md`

### Validation Scenarios (Once Implemented)
After making changes to the orchestrator, ALWAYS test these scenarios:
1. **HTML with embedded CSS/JS**: Create test HTML file with `<style>` and `<script>` blocks, verify formatting preserves embedding structure
2. **Markdown with code blocks**: Test fenced code blocks (```js, ```css, ```html) and verify inner content formats identically to standalone files
3. **Embedding parity**: Verify that code formatted inside embeddings is byte-for-byte identical to standalone formatting
4. **Round-trip stability**: Run formatter twice on same file, verify no changes on second run
5. **Indentation preservation**: Test embedded code at various indentation levels, verify proper reindentation other than inherited indentation from surrounding context

### Key Design Principles (Always Follow)
- **Inner tool ignorance**: Embedded formatters run as if on standalone files
- **Embedding parity**: Embedded code must format identically to standalone files
- **Outer context enforcement**: Orchestrator handles indentation and line width constraints
- **Boundary discipline**: Host formatters only normalize boundaries, never rewrite inner content
- **Plugin-driven extensibility**: Use rich plugin ecosystems as much as possible, avoid writing custom formatters

### Important File Locations
- `/specs/` - Complete architectural specifications (READ THESE FIRST)
- `/specs/01-overview.md` - High-level project goals and scope
- `/specs/02-requirements.md` - Functional requirements and constraints
- `/specs/03-design.md` - Detailed implementation architecture

### Common Mistakes to Avoid
- **DO NOT** try to build or test - no implementation exists yet
- **DO NOT** create monolithic formatter - this is explicitly a multi-tool solution
- **DO NOT** ignore the design specifications - they contain complete architectural guidance
- **DO NOT** use Prettier - design specifically avoids overly rigid formatters
- **DO NOT** implement without reading `specs/03-design.md` first

### Platform Compatibility
- Primary target: macOS (specified in requirements)
- Must also work on Linux
- Node.js required for runtime

## Repository Navigation

### Quick Start for Understanding
1. Read `specs/01-overview.md` for project goals
2. Read `specs/02-requirements.md` for detailed requirements
3. Read `specs/03-design.md` for implementation architecture
4. Note that NO CODE EXISTS YET - this is design phase

### Project Status
- **Design**: ❌ In progress - specifications are being developed
- **Implementation**: ❌ Not started - needs to be built according to 03-design.md
- **Testing**: ❌ No tests exist yet
- **CI/CD**: ❌ No workflows exist yet

### When Making Changes
- Always reference the design specifications first
- Validate any new implementation against the architectural patterns in `specs/03-design.md`
- Ensure compliance with embedding parity and boundary discipline principles
- Test with the validation scenarios outlined above once implementation exists

**Remember**: This is a design-phase repository. Focus on understanding the specifications and implementing according to the detailed architectural plan in `specs/03-design.md`.
