# Design Validation Tasks

## Overview
This directory contains autonomous design validation tasks for the Code Formatting Orchestrator design. Each task is split into a separate file for focused context management.

**CRITICAL: Document everything as you go.** Add your findings directly to the task file you're working on. Save any authored source code (config files, plugins, test scripts) as code blocks in the task file for reuse later. The point is not just to validate that things work, but to create a comprehensive record of findings and implementation decisions.

## Architecture: Orchestrator + Task Agents

### For Orchestrator Agents
**Your context**: This file (specs/tasks/00-design-tasks.md) - that's it!

**Your role**: Like a project manager - monitor progress and make course corrections, NOT execute tasks.

**Work loop**:
1. Check task status in YAML below
2. For `ready` tasks: `spawnAgent('general-purpose', 'Execute task [ID]. Your context: specs/tasks/[ID].md')`
3. When agents report completion: Update status and promote waiting tasks
4. **Course corrections**: If agents ask questions or need guidance, provide minimal focused answers
5. **Stay high-level**: Don't get pulled into task details - that's the agent's job

**Key principle**: You coordinate, agents execute. You should never need to read task details unless making a course correction.

### For Task Execution Agents
**Your context**: You'll be given a single task file (e.g., `specs/tasks/02-stdio-validation.md`)

**Your role**: 
1. Read your task file and follow any links it contains
2. Execute all requirements autonomously 
3. Work in `workspace/[your-task-id]/` 
4. Document findings in your task file as you go
5. Update task status: `ready` → `working` → `done` in specs/tasks/00-design-tasks.md
6. **Only contact orchestrator if truly stuck** - most questions should be answerable from your task file links

**Communication protocol**: 
- ✅ **Report completion**: "Task [ID] complete, status updated to done"
- ✅ **Report blocking issues**: "Task [ID] blocked: [brief issue], need guidance on [specific question]"  
- ❌ **Don't dump context**: Don't send detailed findings, logs, or implementation details to orchestrator
- ❌ **Don't ask permission**: Make decisions based on your task file and links

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
