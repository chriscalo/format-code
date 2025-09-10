# Proof of Concept Requirements

**ALL TASKS MUST PRODUCE RUNNING CODE WITH TESTS**

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

## Success Criteria

Tasks are only complete when:
1. ✅ All code runs without errors
2. ✅ Tests pass (or documented failures with clear reasons)
3. ✅ Output follows [STYLE_GUIDE.md](../STYLE_GUIDE.md) exactly
4. ✅ Workspace properly organized
5. ✅ Findings documented in task file
6. ✅ Any limitations or gaps clearly identified

**No theoretical validation - show working code or it doesn't count.**
