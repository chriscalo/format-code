# Basic Orchestrator Framework

Build the core orchestrator that can format individual files without embedding complexity.

**PROOF REQUIRED**: See [POC Requirements](../poc-requirements.md) - all implementation must produce running code with tests.

## Tool Usage Guidelines (IMPORTANT for YOLO mode)
**Prefer native tools over bash commands** to minimize approval prompts:
- Use `Write` tool to create files instead of `echo > file` or `cat > file`
- Use `Read` tool to check file contents instead of `cat`
- Use `Edit` or `MultiEdit` tools for file modifications instead of `sed` or `awk`
- Use `Glob` tool to find files instead of `find` or `ls` with patterns
- Use npm scripts from package.json when available
- Only use Bash for running formatters, npm commands, and tests

**Links you need:**
- [Project context with validated tools](../project-context.md) - Tool selections from task 01
- [Previous task results](../../workspace/01-tool-research/) - Tool research findings  
- [Previous task results](../../workspace/02-stdio-validation/) - stdio interface validation

**Your workspace:** `workspace/03-basic-orchestrator/`

## Workspace
Create `workspace/03-basic-orchestrator/` for:
- `scripts/format/` directory structure
- All formatter adapters and utilities
- Configuration files for each tool
- Test files and npm scripts

## Context
- Line length: 80 characters
- Indentation: 2 spaces
- File patterns: `**/*.{html,js,css,scss,md,yml,yaml,json,jsonc,py}`
- This establishes the foundation before tackling embedded content

## Implementation Tasks

### Project Structure
- [ ] Create `scripts/format/index.js` as CLI entry point (ESM)
- [ ] Create `scripts/format/config/orchestrator.config.js` with file patterns
- [ ] Create `scripts/format/formatters/` directory for tool adapters
- [ ] Create `scripts/format/utils/` directory for shared utilities

### Core Infrastructure
- [ ] Implement file discovery with glob patterns
- [ ] Create `utils/files.js` with globbing and ignore rules
- [ ] Create `utils/io.js` for safe read/write operations
- [ ] Create `utils/errors.js` for typed error handling (FormatterError)

### Formatter Adapters
- [ ] Create `formatters/spawn.js` for subprocess management
- [ ] Create `formatters/html.js` using rehype-format
- [ ] Create `formatters/javascript.js` using ESLint
- [ ] Create `formatters/css.js` using Stylelint  
- [ ] Create `formatters/markdown.js` using remark-stringify
- [ ] Create `formatters/yaml.js` using yamlfmt
- [ ] Create `formatters/json.js` using ESLint + jsonc-eslint-parser
- [ ] Create `formatters/python.js` using ruff or black

### CLI Interface
- [ ] Implement `--only <lang>` flag for single language formatting
- [ ] Implement `--max-width <n>` flag (default 80)
- [ ] Add basic error handling and progress reporting
- [ ] Create npm script: `"format": "node scripts/format/index.js"`

### Configuration Files
- [ ] Create `.eslintrc.js` with formatting rules (semicolons, double quotes, trailing commas)
- [ ] Create `.stylelintrc.js` with CSS formatting and property ordering
- [ ] Create `.yamlfmt` config with minimal quoting preference
- [ ] Document Python formatter configuration (ruff.toml or pyproject.toml)

## Testing
- [ ] Test each formatter adapter in isolation
- [ ] Test file discovery with various glob patterns
- [ ] Test CLI flags and error handling
- [ ] Verify deterministic output (same input → same output)

## Minimum Success Criteria

**Task is complete when:**
1. ✅ orchestrator.js exists and can format all 7 file types via CLI
2. ✅ All integration tests pass (at least 1 test per language)
3. ✅ README with usage examples exists

## Full Success Criteria
- Can format any single-language file correctly
- All formatters use consistent style preferences
- Clean error messages for malformed files
- Deterministic and idempotent results
- No file corruption or data loss

## Fallback Strategies

**Time-box**: 4 hours for core implementation

**If formatter integration fails:**
1. Start with just 3 languages (HTML, JS, Python) to prove concept
2. Use simplified configuration (hardcoded options) initially
3. Skip advanced features, focus on basic formatting first

**If stdin/stdout handling is complex:**
1. Use temporary files as intermediary (write → format → read)
2. Implement file-based approach first, add stdin/stdout later
3. Document the limitation for future improvement

**If tests are failing:**
1. Simplify test cases to most basic formatting
2. Test each formatter in isolation before integration
3. Add debug logging to understand data flow

## Documentation Requirements
- Document exact configuration for each tool
- Record any tool-specific limitations discovered
- Note version requirements and installation commands
- Document the adapter interface pattern for future extensions