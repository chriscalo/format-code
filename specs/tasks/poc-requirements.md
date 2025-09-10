# POC Common Requirements

This document contains shared requirements for all POC tasks (01a through 01g).

## TOOL USAGE RULES (GOAL: ZERO APPROVAL PROMPTS)

**THE GOAL IS ZERO USER APPROVALS - IF YOU'RE GETTING PROMPTS, YOU'RE DOING IT WRONG**

### Never Use These Bash Commands
These commands require approval and MUST be avoided:
- `cat`, `head`, `tail` → Use `Read` tool
- `echo > file`, `cat > file` → Use `Write` tool  
- `sed`, `awk` → Use `Edit/MultiEdit` tools
- `ls`, `find` → Use `Glob` tool
- `grep`, `rg`, `ack` → Use `Grep` tool
- Any other arbitrary bash commands

### Always Use Claude Code Tools
| Instead of | Use |
|------------|-----|
| `cat file.txt` | `Read` tool with file_path |
| `echo "content" > file.txt` | `Write` tool |
| `sed -i 's/old/new/' file.txt` | `Edit` tool with old_string/new_string |
| `ls *.js` | `Glob` tool with pattern="*.js" |
| `grep "pattern" file.txt` | `Grep` tool with pattern |
| `find . -name "*.md"` | `Glob` tool with pattern="**/*.md" |

### The Only Bash Commands You Should Use
These are pre-approved and won't trigger prompts:
- `npm install [packages]` - Installing dependencies
- `npm test` - Running tests
- `npm run [script-name]` - Running npm scripts
- `node [file.js]` - Running Node.js files directly

### NPM Scripts Philosophy  
**STOP CREATING NEW SCRIPTS - REUSE WHAT EXISTS!**

- **Check package.json FIRST**: See what scripts already exist before adding anything
- **Standard scripts only**: Use `test` and `format` - these are sufficient
- **Modify existing scripts**: Update the command in existing scripts instead of creating new ones
- **Red flags that you're doing it wrong**:
  - Creating `test2`, `test-final`, `verify`, `check`, `test-now` - STOP!
  - Creating `format2`, `format-and-save`, `final-test` - STOP!
  - Package.json has 10+ scripts - consolidate instead of adding more
  - Adding a script for a one-time operation - just use `node file.js` directly
- **Example of script proliferation (BAD)**:
  ```json
  "scripts": {
    "test": "node --test format-html.test.js",
    "format": "node format-and-save.js",
    "compare": "node compare-output.js",
    "test-formatter": "node test-formatter.js",
    "check": "node check-tests.js",
    "full-test": "node --test full-test.js",
    "final-test": "node final-test.js",
    "test-check": "node run-test-check.js",
    "verify": "node verify.js",
    "test-now": "node test-now.js",
    "check-tests": "node --test format-html.test.js"
  }
  ```
  This is 11 scripts for what should be 2!
- **Example of proper scripts (GOOD)**:
  ```json
  "scripts": {
    "test": "node --test format-html.test.js",
    "format": "node format-html.js"
  }
  ```

### Pre-Approved Commands
These commands work without approval:
- `npm install [packages]`
- `npm test` 
- `npm run [any-script]`
- `node [file.js]`

## CRITICAL: PASSING TESTS ARE MANDATORY

**THE ONLY ACCEPTABLE OUTCOME IS ALL TESTS PASSING**

### Execution Flow
1. **First check** if workspace POC folder exists (e.g., `workspace/01a-poc-html/` or `workspace/01-tool-research/html/`)
2. **If tests exist**: Run them using `npm test`
   - ✅ If ALL tests pass → Mark task as done, document success
   - ❌ If ANY test fails → YOU MUST fix them until ALL pass
3. **If no tests exist**: Create the POC from scratch following the task specifications
4. **DO NOT** mark task as done with failing tests
5. **DO NOT** document "known limitations" as an excuse for failures
6. **ALWAYS** document your fixes and final success at the bottom of the task file

### Code Organization Rules
**ONE FILE PER PURPOSE - STOP CREATING DUPLICATES**

- **One formatter per language**: `format-[lang].js` (e.g., `format-html.js`)
  - NOT: `format-html2.js`, `formatter.js`, `format-and-save.js`
  - If the formatter needs fixing, EDIT the existing file
  
- **One test file per language**: `format-[lang].test.js`
  - NOT: `test-formatter.js`, `final-test.js`, `full-test.js`, `check-tests.js`
  - If tests fail, FIX the existing test file
  
- **Modify don't duplicate**: 
  - Tests failing? Fix `format-[lang].test.js`
  - Formatter broken? Fix `format-[lang].js`
  - Need to debug? Use `node format-[lang].js` directly, don't create `debug.js`
  
- **Files that should NOT exist**:
  - `compare-output.js` - integrate into test file
  - `verify.js` - that's what the test file is for
  - `test-formatter.js` - use the actual test file
  - `format-and-save.js` - the formatter should just output to stdout
  - Any file with `2`, `final`, `new`, `check` in the name

## POC Folder Structure

Each POC should follow this structure:
```
workspace/[task-id]/[lang]/
├── format-[lang].js       # The formatter implementation
├── format-[lang].test.js  # Test suite using node:test
├── input.[ext]            # Sample input file
├── expected.[ext]         # Expected output file
├── package.json           # With "test" and "format" scripts only
└── README.md             # Brief usage documentation
```

## Test Requirements

All tests must validate:
1. **Stdin/stdout operation**: Formatter reads from stdin, writes to stdout
2. **Configuration options**: Proper formatting according to style rules
3. **Edge cases**: Handle malformed input gracefully
4. **Idempotency**: Running formatter twice produces same output

## Documentation Requirements

At the bottom of each POC task file, document:
- ✅ Test results (must show all passing)
- Any implementation notes or decisions made
- Confirmation that POC is complete and working

## Remember

- **Zero approvals** is the goal
- **Reuse existing code** and scripts
- **All tests must pass** - no exceptions
- **Keep it simple** - one formatter, one test file, minimal scripts