# Proof of Concept Requirements

**ALL TASKS MUST PRODUCE RUNNING CODE WITH TESTS**

## CRITICAL: Tool Usage for Task Agents

**GOAL: ZERO APPROVAL PROMPTS FROM USER**

Task agents MUST follow these tool usage rules to avoid approval prompts:

### ❌ NEVER Use These Bash Commands
- `cat`, `head`, `tail` → Use **Read** tool instead
- `echo > file`, `cat > file` → Use **Write** tool instead  
- `sed`, `awk`, text manipulation → Use **Edit/MultiEdit** tools instead
- `find`, `ls` with patterns → Use **Glob** tool instead
- `grep`, `rg`, `ack` → Use **Grep** tool instead
- Any other arbitrary bash commands → Find the appropriate tool

### ✅ ONLY Pre-Approved Commands
These commands can be used without approval:
- `npm install [package]` - Installing dependencies
- `npm test` - Running tests
- `npm run [script-name]` - Running existing package.json scripts
- `node [file.js]` - Running JavaScript files directly

### Package.json Script Management
- **CHECK FIRST**: Always read package.json before running scripts
- **REUSE**: Use existing scripts like `test`, `format` 
- **MODIFY**: Edit existing scripts instead of creating new ones
- **NO DUPLICATES**: Never create `test2`, `test-final`, etc.
- **CONSOLIDATE**: If package.json has 10+ scripts, clean up instead of adding more

## Requirements

- ✅ **Working implementation**: Every tool/approach must have functioning code
- ✅ **Tests required**: Use `node:test` to validate functionality 
- ✅ **Style guide compliance**: MUST follow [STYLE_GUIDE.md](../STYLE_GUIDE.md) exactly
- ✅ **Organized workspace**: Follow naming conventions in workspace/[task-id]/
- ✅ **Document everything**: Code + tests are the proof, task file documents findings

## Structure Conventions

**Workspace folder**: `workspace/[task-id]/[lang]/`
- **Formatter**: `format-[lang].js` 
- **Test file**: `format-[lang].test.js` 
- **Input/Output**: `input.[ext]`, `expected.[ext]` 
- **README**: Document usage, test results, limitations per language

**Use short names**: `js` not `javascript`, `yaml` not `yml`, `html` not `markup`

## Test Requirements

**THE ONLY ACCEPTABLE TEST**: Tests MUST assert that the formatter's output exactly matches `expected.[ext]`
- ✅ Read `input.[ext]` → Format it → Write to `output.[ext]` → Read back → Assert matches `expected.[ext]`  
- ❌ No partial validation, no "close enough", no manual inspection
- ❌ No other test types unless explicitly documenting failures

```javascript
// This is the ONLY acceptable test pattern:
const input = fs.readFileSync(inputFile, 'utf-8');
const expected = fs.readFileSync(expectedFile, 'utf-8');

// Run formatter and write output to file
const output = await runFormatter(input);
fs.writeFileSync(outputFile, output);

// Read the output file back and compare
const actualOutput = fs.readFileSync(outputFile, 'utf-8');
assert.strictEqual(actualOutput, expected, 'Output must match expected.[ext] exactly');
```

## Success Criteria

Tasks are only complete when:
1. ✅ All code runs without errors
2. ✅ Tests pass (or documented failures with clear reasons)
3. ✅ Output follows [STYLE_GUIDE.md](../STYLE_GUIDE.md) exactly
4. ✅ Workspace properly organized
5. ✅ Findings documented in task file
6. ✅ Any limitations or gaps clearly identified

**No theoretical validation - show working code or it doesn't count.**
