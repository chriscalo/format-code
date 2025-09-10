# Design Validation Tasks

## Overview
This directory contains autonomous design validation tasks for the Code Formatting Orchestrator design. Each task is split into a separate file for focused context management.

**CRITICAL: Document everything as you go.** Add your findings directly to the task file you're working on. Save any authored source code (config files, plugins, test scripts) as code blocks in the task file for reuse later. The point is not just to validate that things work, but to create a comprehensive record of findings and implementation decisions.

## For Agents

**AUTONOMOUS EXECUTION REQUIRED**: When an agent is pointed to this file, they should immediately begin autonomous execution by claiming and working on the next available task. Do not ask for permission or clarification.

**IMPORTANT CONSTRAINTS**: Before making any tool recommendations, agents MUST:
1. **Check project preferences** - Review STYLE_GUIDE.md and project-context.md for tool restrictions
2. **Understand actual requirements** - Don't assume language-specific tools are needed if general tools can meet the requirement  
3. **Respect ecosystem preferences** - Prefer npm/JavaScript ecosystem unless requirements cannot be met
4. **Never recommend Prettier** - This tool is explicitly forbidden for this project

**To claim and work on the next available task:**

1. **Find next available task** with status `ready` below
2. **Atomic claim**: Change status from `ready` to `working` in single edit
3. **Create workspace**: Make directory `workspace/[task-id]/` for any files you create
4. **Do the work**: Read the task file and complete all requirements  
5. **Validate completion**: Verify all success criteria met before marking done
6. **Mark complete**: Update status to `done` only after validation

Tasks must be completed in dependency order. Multiple agents can work simultaneously on tasks that don't depend on each other.

---

## All Tasks

```yaml
01-tool-research:
  status: done
  dependencies: []

02-stdio-validation:
  status: ready
  dependencies: [01-tool-research]

03-basic-orchestrator:
  status: waiting
  dependencies: [02-stdio-validation]

04-context-preservation:
  status: waiting
  dependencies: [03-basic-orchestrator]

05-html-embedding:
  status: waiting
  dependencies: [04-context-preservation]

06-markdown-embedding:
  status: waiting
  dependencies: [04-context-preservation]

07-parity-validation:
  status: waiting
  dependencies: [05-html-embedding, 06-markdown-embedding]

08-integration-testing:
  status: waiting
  dependencies: [07-parity-validation]
```

---

## Status Schema

- `ready` - Available to work on (all dependencies `done`)
- `working` - Currently being worked on by an agent
- `done` - Task completed successfully, all success criteria verified
- `waiting` - Cannot start (dependencies not `done`)
- `failed` - Task attempted but did not meet success criteria

## How to Update Status

**Atomic claiming** - Change status in single edit to prevent conflicts:
```yaml
01-tool-research:
  status: working  # Changed from 'ready' to 'working' atomically
```

**Automatic dependency resolution** - When you mark a task `done`, check if any `waiting` tasks can now become `ready`:
```yaml
01-tool-research:
  status: done
  
02-stdio-validation:
  status: ready  # Auto-promoted from 'waiting' since 01 is done
```

**Quality control** - Only mark `done` after verifying all success criteria:
```yaml
01-tool-research:
  status: done  # All research complete, findings documented, tool selection report created
```

**Rollback mechanism** - If work is incomplete or fails validation:
```yaml
01-tool-research:
  status: failed  # Will be reset to 'ready' for retry by another agent
```


## Shared Context

Each task file links to the context it needs:
- **Style Guide**: [STYLE_GUIDE.md](../../STYLE_GUIDE.md)
- **Project Context**: [specs/project-context.md](../project-context.md)  
- **Technical Requirements**: [specs/technical-requirements.md](../technical-requirements.md)
